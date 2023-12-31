-- Table: public.fields
DROP TABLE IF EXISTS public.fields
;

CREATE TABLE IF NOT EXISTS
    public.fields (
        id UUID NOT NULL DEFAULT uuid_generate_v4 (),
        groupname CHARACTER VARYING(64) COLLATE pg_catalog."default" NOT NULL,
        grouporder SMALLINT NOT NULL,
        simple_table_row jsonb NOT NULL,
        CONSTRAINT field_pkey PRIMARY KEY (id),
        CONSTRAINT uq UNIQUE (groupname, grouporder)
    ) TABLESPACE pg_default
;

ALTER TABLE IF EXISTS public.fields OWNER TO postgres
;

COMMENT ON TABLE public.fields IS 'Field settings'
;
