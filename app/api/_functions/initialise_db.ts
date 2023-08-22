import { NextResponse } from "next/server";
import { run_query } from "./run_query";
import { promises } from "dns";

export const initialise_db = async (): Promise<NextResponse> => {
  const messages: unknown[] = [];
  const uuid_add = await run_query(`CREATE EXTENSION "uuid-ossp"`, []);
  messages.push(await uuid_add.json());

  const fields_table = await run_query(
    `CREATE TABLE IF NOT EXISTS
    public.fields (
      id UUID NOT NULL DEFAULT uuid_generate_v4 (),
      groupname CHARACTER VARYING(64) COLLATE pg_catalog."default" NOT NULL,
      grouporder SMALLINT NOT NULL,
      simple_table_row jsonb NOT NULL,
      CONSTRAINT field_pkey PRIMARY KEY (id),
      CONSTRAINT uq UNIQUE (groupname, grouporder)
    ) TABLESPACE pg_default`,
    []
  );
  messages.push(await fields_table.json());

  const rowdata_table = await run_query(
    `CREATE TABLE IF NOT EXISTS
    public.rowdata (
      id UUID NOT NULL DEFAULT uuid_generate_v4 (),
      simple_table_row jsonb NOT NULL,
      parent_id UUID,
      groupname CHARACTER VARYING(64) COLLATE pg_catalog."default" NOT NULL,
      CONSTRAINT rowdata_pkey PRIMARY KEY (id),
      CONSTRAINT parent_exists FOREIGN KEY (parent_id) REFERENCES public.rowdata (id) MATCH SIMPLE ON UPDATE RESTRICT ON DELETE RESTRICT
      ) TABLESPACE pg_default`,
    []
  );
  messages.push(await rowdata_table.json());

  const rowdata_family = await run_query(
    `CREATE
        OR REPLACE FUNCTION rowdata_family (initial_id UUID, child_depth INT DEFAULT 1, parent_depth INT DEFAULT 0) RETURNS TABLE (
          id UUID,
          parent UUID,
          groupname VARCHAR(64),
          simple_table_row JSONB,
          level_change INT
        ) LANGUAGE SQL AS $$
        WITH RECURSIVE
          source (id, parent_id, cur,parent, groupname, simple_table_row, level_change, link) AS (
            SELECT
              id,
              parent_id, 
              id,
              parent_id,
              groupname,
              simple_table_row,
              0,
              ARRAY[id]
            FROM
              rowdata
            WHERE
              id = initial_id
            UNION
            SELECT
              r.id,
              r.parent_id,
              CASE
                WHEN s.cur = r.parent_id THEN r.id
                ELSE NULL
              END,
              CASE
                WHEN s.parent = r.id THEN r.parent_id
                ELSE NULL
              END,
              r.groupname,
              r.simple_table_row,
              CASE
                WHEN s.cur = r.parent_id THEN level_change + 1
                ELSE level_change - 1
              END,
              CASE
                WHEN s.cur = r.parent_id THEN r.id || link
                ELSE link || r.id
              END
            FROM
              source s,
              rowdata r
            WHERE
              (s.cur = r.parent_id AND level_change < child_depth)
              OR (parent = r.id AND level_change*-1 < parent_depth)
          )
        SELECT
          id, parent_id, groupname, simple_table_row, level_change
        FROM
          source;
          $$
        ;
        `,
    []
  );
  messages.push(await rowdata_family.json());

  return NextResponse.json(messages, { status: 200 });
};
