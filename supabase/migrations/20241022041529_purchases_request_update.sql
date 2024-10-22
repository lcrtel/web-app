drop policy "Enable delete for users based on user_id" on "public"."purchase_requests";

drop policy "Enable insert for authenticated users only" on "public"."purchase_requests";

drop policy "Enable read access for users based on user_id" on "public"."purchase_requests";

revoke delete on table "public"."purchase_requests" from "anon";

revoke insert on table "public"."purchase_requests" from "anon";

revoke references on table "public"."purchase_requests" from "anon";

revoke select on table "public"."purchase_requests" from "anon";

revoke trigger on table "public"."purchase_requests" from "anon";

revoke truncate on table "public"."purchase_requests" from "anon";

revoke update on table "public"."purchase_requests" from "anon";

revoke delete on table "public"."purchase_requests" from "authenticated";

revoke insert on table "public"."purchase_requests" from "authenticated";

revoke references on table "public"."purchase_requests" from "authenticated";

revoke select on table "public"."purchase_requests" from "authenticated";

revoke trigger on table "public"."purchase_requests" from "authenticated";

revoke truncate on table "public"."purchase_requests" from "authenticated";

revoke update on table "public"."purchase_requests" from "authenticated";

revoke delete on table "public"."purchase_requests" from "service_role";

revoke insert on table "public"."purchase_requests" from "service_role";

revoke references on table "public"."purchase_requests" from "service_role";

revoke select on table "public"."purchase_requests" from "service_role";

revoke trigger on table "public"."purchase_requests" from "service_role";

revoke truncate on table "public"."purchase_requests" from "service_role";

revoke update on table "public"."purchase_requests" from "service_role";

alter table "public"."purchase_requests" drop constraint "purchase_requests_route_id_fkey";

alter table "public"."purchase_requests" drop constraint "purchase_requests_user_id_fkey";

alter table "public"."purchase_requests" drop constraint "purchase_requests_pkey";

drop index if exists "public"."purchase_requests_pkey";

drop table "public"."purchase_requests";

create table "public"."purchases" (
    "created_at" timestamp with time zone not null default now(),
    "route_id" uuid not null,
    "status" text not null default 'pending'::text,
    "id" uuid not null default gen_random_uuid(),
    "payment_type" text not null,
    "communication_status" text not null default 'not_contacted'::text,
    "whatsapp_no" text,
    "ip" text,
    "vos_status" text default 'pending'::text,
    "buying_rate" text,
    "user_id" uuid not null default auth.uid()
);


alter table "public"."purchases" enable row level security;

CREATE UNIQUE INDEX purchase_requests_pkey ON public.purchases USING btree (id);

alter table "public"."purchases" add constraint "purchase_requests_pkey" PRIMARY KEY using index "purchase_requests_pkey";

alter table "public"."purchases" add constraint "purchase_requests_route_id_fkey" FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE not valid;

alter table "public"."purchases" validate constraint "purchase_requests_route_id_fkey";

alter table "public"."purchases" add constraint "purchase_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."purchases" validate constraint "purchase_requests_user_id_fkey";

grant delete on table "public"."purchases" to "anon";

grant insert on table "public"."purchases" to "anon";

grant references on table "public"."purchases" to "anon";

grant select on table "public"."purchases" to "anon";

grant trigger on table "public"."purchases" to "anon";

grant truncate on table "public"."purchases" to "anon";

grant update on table "public"."purchases" to "anon";

grant delete on table "public"."purchases" to "authenticated";

grant insert on table "public"."purchases" to "authenticated";

grant references on table "public"."purchases" to "authenticated";

grant select on table "public"."purchases" to "authenticated";

grant trigger on table "public"."purchases" to "authenticated";

grant truncate on table "public"."purchases" to "authenticated";

grant update on table "public"."purchases" to "authenticated";

grant delete on table "public"."purchases" to "service_role";

grant insert on table "public"."purchases" to "service_role";

grant references on table "public"."purchases" to "service_role";

grant select on table "public"."purchases" to "service_role";

grant trigger on table "public"."purchases" to "service_role";

grant truncate on table "public"."purchases" to "service_role";

grant update on table "public"."purchases" to "service_role";

create policy "Enable delete for users based on user_id"
on "public"."purchases"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."purchases"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for users based on user_id"
on "public"."purchases"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = user_id));



