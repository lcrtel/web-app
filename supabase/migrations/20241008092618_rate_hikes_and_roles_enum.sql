create type "public"."roles_enum" as enum ('director', 'company_manager', 'finance_executive', 'finance_manager', 'noc_executive', 'noc_manager', 'purchase_executive', 'purchase_manager', 'sales_executive', 'sales_manager', 'user');

create table "public"."rate_hikes" (
    "id" bigint generated by default as identity not null,
    "decrease_percentage" bigint not null,
    "increase_percentage" bigint not null,
    "destination_code" bigint not null
);


alter table "public"."rate_hikes" enable row level security;

CREATE UNIQUE INDEX rate_hikes_pkey ON public.rate_hikes USING btree (id);

alter table "public"."rate_hikes" add constraint "rate_hikes_pkey" PRIMARY KEY using index "rate_hikes_pkey";

alter table "public"."rate_hikes" add constraint "rate_hikes_destination_code_fkey" FOREIGN KEY (destination_code) REFERENCES phone_codes(code) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."rate_hikes" validate constraint "rate_hikes_destination_code_fkey";

grant delete on table "public"."rate_hikes" to "anon";

grant insert on table "public"."rate_hikes" to "anon";

grant references on table "public"."rate_hikes" to "anon";

grant select on table "public"."rate_hikes" to "anon";

grant trigger on table "public"."rate_hikes" to "anon";

grant truncate on table "public"."rate_hikes" to "anon";

grant update on table "public"."rate_hikes" to "anon";

grant delete on table "public"."rate_hikes" to "authenticated";

grant insert on table "public"."rate_hikes" to "authenticated";

grant references on table "public"."rate_hikes" to "authenticated";

grant select on table "public"."rate_hikes" to "authenticated";

grant trigger on table "public"."rate_hikes" to "authenticated";

grant truncate on table "public"."rate_hikes" to "authenticated";

grant update on table "public"."rate_hikes" to "authenticated";

grant delete on table "public"."rate_hikes" to "service_role";

grant insert on table "public"."rate_hikes" to "service_role";

grant references on table "public"."rate_hikes" to "service_role";

grant select on table "public"."rate_hikes" to "service_role";

grant trigger on table "public"."rate_hikes" to "service_role";

grant truncate on table "public"."rate_hikes" to "service_role";

grant update on table "public"."rate_hikes" to "service_role";


