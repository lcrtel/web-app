create table "public"."phone_codes" (
    "code" bigint not null,
    "name" text,
    "value" text
);


alter table "public"."phone_codes" enable row level security;

CREATE UNIQUE INDEX phone_codes_code_key ON public.phone_codes USING btree (code);

CREATE UNIQUE INDEX phone_codes_pkey ON public.phone_codes USING btree (code);

alter table "public"."phone_codes" add constraint "phone_codes_pkey" PRIMARY KEY using index "phone_codes_pkey";

alter table "public"."phone_codes" add constraint "phone_codes_code_key" UNIQUE using index "phone_codes_code_key";

grant delete on table "public"."phone_codes" to "anon";

grant insert on table "public"."phone_codes" to "anon";

grant references on table "public"."phone_codes" to "anon";

grant select on table "public"."phone_codes" to "anon";

grant trigger on table "public"."phone_codes" to "anon";

grant truncate on table "public"."phone_codes" to "anon";

grant update on table "public"."phone_codes" to "anon";

grant delete on table "public"."phone_codes" to "authenticated";

grant insert on table "public"."phone_codes" to "authenticated";

grant references on table "public"."phone_codes" to "authenticated";

grant select on table "public"."phone_codes" to "authenticated";

grant trigger on table "public"."phone_codes" to "authenticated";

grant truncate on table "public"."phone_codes" to "authenticated";

grant update on table "public"."phone_codes" to "authenticated";

grant delete on table "public"."phone_codes" to "service_role";

grant insert on table "public"."phone_codes" to "service_role";

grant references on table "public"."phone_codes" to "service_role";

grant select on table "public"."phone_codes" to "service_role";

grant trigger on table "public"."phone_codes" to "service_role";

grant truncate on table "public"."phone_codes" to "service_role";

grant update on table "public"."phone_codes" to "service_role";

create policy "Enable insert for all users"
on "public"."phone_codes"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."phone_codes"
as permissive
for select
to public
using (true);



