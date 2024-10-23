alter table "public"."executives" alter column "user_id" set not null;

alter table "public"."invoices" add column "created_by" uuid;

alter table "public"."payments" add column "added_by" uuid;

alter table "public"."profiles" add column "added_by" uuid;

alter table "public"."purchases" add column "added_by" uuid;

alter table "public"."rate_hikes" add column "added_by" uuid;

alter table "public"."routes" add column "added_by" uuid;

alter table "public"."targets" add column "added_by" uuid;

CREATE UNIQUE INDEX executives_user_id_key ON public.executives USING btree (user_id);

alter table "public"."executives" add constraint "executives_user_id_key" UNIQUE using index "executives_user_id_key";


