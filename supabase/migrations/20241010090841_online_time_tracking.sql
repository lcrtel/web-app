create table "public"."user_durations" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid default auth.uid(),
    "duration" numeric
);


alter table "public"."user_durations" enable row level security;

CREATE UNIQUE INDEX user_durations_pkey ON public.user_durations USING btree (id);

alter table "public"."user_durations" add constraint "user_durations_pkey" PRIMARY KEY using index "user_durations_pkey";

alter table "public"."user_durations" add constraint "user_durations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_durations" validate constraint "user_durations_user_id_fkey";

grant delete on table "public"."user_durations" to "anon";

grant insert on table "public"."user_durations" to "anon";

grant references on table "public"."user_durations" to "anon";

grant select on table "public"."user_durations" to "anon";

grant trigger on table "public"."user_durations" to "anon";

grant truncate on table "public"."user_durations" to "anon";

grant update on table "public"."user_durations" to "anon";

grant delete on table "public"."user_durations" to "authenticated";

grant insert on table "public"."user_durations" to "authenticated";

grant references on table "public"."user_durations" to "authenticated";

grant select on table "public"."user_durations" to "authenticated";

grant trigger on table "public"."user_durations" to "authenticated";

grant truncate on table "public"."user_durations" to "authenticated";

grant update on table "public"."user_durations" to "authenticated";

grant delete on table "public"."user_durations" to "service_role";

grant insert on table "public"."user_durations" to "service_role";

grant references on table "public"."user_durations" to "service_role";

grant select on table "public"."user_durations" to "service_role";

grant trigger on table "public"."user_durations" to "service_role";

grant truncate on table "public"."user_durations" to "service_role";

grant update on table "public"."user_durations" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."user_durations"
as permissive
for insert
to authenticated
with check (true);



