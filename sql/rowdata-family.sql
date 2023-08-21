-- FUNCTION: public.rowdata_family(uuid, integer, integer)
DROP FUNCTION IF EXISTS public.rowdata_family (UUID, INTEGER, INTEGER)
;

CREATE
OR REPLACE FUNCTION public.rowdata_family (initial_id UUID, child_depth INTEGER DEFAULT 1, parent_depth INTEGER DEFAULT 0) RETURNS TABLE (
  id UUID,
  parent UUID,
  groupname CHARACTER VARYING,
  simple_table_row jsonb,
  level_change INTEGER
) LANGUAGE 'sql' COST 100 VOLATILE PARALLEL UNSAFE ROWS 1000 AS $BODY$

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
  
$BODY$
;

ALTER FUNCTION public.rowdata_family (UUID, INTEGER, INTEGER) OWNER TO postgres
;
