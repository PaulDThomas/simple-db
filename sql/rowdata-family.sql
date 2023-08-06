DROP FUNCTION IF EXISTS rowdata_family
;

CREATE
OR REPLACE FUNCTION rowdata_family (initial_id UUID, child_depth INT DEFAULT 1, parent_depth INT DEFAULT 0) RETURNS TABLE (
  id UUID,
  parent UUID,
  groupname VARCHAR(64),
  simple_table_row JSONB,
  level_change INT
  -- link ARRAY[UUID]
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

SELECT
  *
FROM
  -- return_row_data ('d061e161-2f47-411f-99b5-f518e2cb8329',0,0) -- G1
  rowdata_family ('7caafe7e-5e52-4170-9147-679ac40956c7') -- G5
  -- return_row_data ('77f16113-b8b1-4cca-a957-c1ad6286bdc5') -- G9
