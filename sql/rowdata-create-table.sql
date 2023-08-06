-- Table: public.rowData
DROP TABLE IF EXISTS public.rowdata
;

CREATE TABLE IF NOT EXISTS
    public.rowdata (
        id UUID NOT NULL DEFAULT uuid_generate_v4 (),
        groupname CHARACTER VARYING(64) COLLATE pg_catalog.default NOT NULL,
        simple_table_row jsonb NOT NULL,
        parent_id UUID,
        CONSTRAINT rowdata_pkey PRIMARY KEY (id),
        CONSTRAINT parent_exists FOREIGN KEY (parent_id) REFERENCES public.rowdata (id) MATCH SIMPLE ON UPDATE RESTRICT ON DELETE RESTRICT NOT VALID
    ) TABLESPACE pg_default
;

ALTER TABLE IF EXISTS public.rowdata OWNER TO postgres
;

COMMENT ON TABLE public.rowdata IS 'Data items within a row'
;
