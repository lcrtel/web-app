create type "public"."user_types" as enum ('STAFF', 'CLIENT', 'VENDOR');

alter table "public"."profiles" add column "user_type" user_types not null default 'CLIENT'::user_types;


