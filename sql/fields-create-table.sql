-- Table: public.fields

-- DROP TABLE IF EXISTS public.fields;

CREATE TABLE IF NOT EXISTS public.fields
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    groupname character varying(64) COLLATE pg_catalog."default" NOT NULL,
    settings jsonb NOT NULL,
    CONSTRAINT field_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.fields
    OWNER to postgres;

COMMENT ON TABLE public.fields
    IS 'Field settings';