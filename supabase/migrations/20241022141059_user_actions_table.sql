drop view if exists "public"."executive_durations";

create table "public"."user_actions" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null default auth.uid(),
    "action_type" text not null,
    "action_details" text not null
);


alter table "public"."user_actions" enable row level security;

CREATE UNIQUE INDEX user_actions_pkey ON public.user_actions USING btree (id);

alter table "public"."user_actions" add constraint "user_actions_pkey" PRIMARY KEY using index "user_actions_pkey";

alter table "public"."user_actions" add constraint "user_actions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_actions" validate constraint "user_actions_user_id_fkey";

create or replace view "public"."executive_action_counts" as  SELECT e.id AS executive_id,
    p.id AS profile_id,
    p.name,
    d.slug AS department_slug,
    COALESCE(jsonb_object_agg(ua.action_type, ua.action_count) FILTER (WHERE (ua.action_type IS NOT NULL)), '{}'::jsonb) AS action_counts
   FROM (((executives e
     JOIN profiles p ON ((e.user_id = p.id)))
     JOIN departments d ON ((e.department = d.slug)))
     LEFT JOIN ( SELECT user_actions.user_id,
            user_actions.action_type,
            count(*) AS action_count
           FROM user_actions
          WHERE (user_actions.action_type IS NOT NULL)
          GROUP BY user_actions.user_id, user_actions.action_type) ua ON ((ua.user_id = p.id)))
  GROUP BY e.id, p.id, p.name, d.slug;


create or replace view "public"."manager_action_counts" as  SELECT m.id AS manager_id,
    p.id AS profile_id,
    p.name,
    d.slug AS department_slug,
    COALESCE(jsonb_object_agg(ua.action_type, ua.action_count) FILTER (WHERE (ua.action_type IS NOT NULL)), '{}'::jsonb) AS action_counts
   FROM (((managers m
     JOIN profiles p ON ((m.user_id = p.id)))
     JOIN departments d ON ((m.department = d.slug)))
     LEFT JOIN ( SELECT user_actions.user_id,
            user_actions.action_type,
            count(*) AS action_count
           FROM user_actions
          WHERE (user_actions.action_type IS NOT NULL)
          GROUP BY user_actions.user_id, user_actions.action_type) ua ON ((ua.user_id = p.id)))
  GROUP BY m.id, p.id, p.name, d.slug;


create or replace view "public"."manager_durations" as  SELECT m.id AS manager_id,
    p.id AS profile_id,
    p.name,
    d.slug AS department_slug,
    COALESCE(sum(ud.duration), (0)::numeric) AS total_duration
   FROM (((managers m
     JOIN profiles p ON ((m.user_id = p.id)))
     JOIN departments d ON ((m.department = d.slug)))
     LEFT JOIN user_durations ud ON ((ud.user_id = p.id)))
  GROUP BY m.id, p.id, d.slug;


create or replace view "public"."executive_durations" as  SELECT e.id AS executive_id,
    p.id AS profile_id,
    p.name,
    d.slug AS department_slug,
    COALESCE(sum(ud.duration), (0)::numeric) AS total_duration
   FROM (((executives e
     JOIN profiles p ON ((e.user_id = p.id)))
     JOIN departments d ON ((e.department = d.slug)))
     LEFT JOIN user_durations ud ON ((ud.user_id = p.id)))
  GROUP BY e.id, p.id, d.slug;


grant delete on table "public"."user_actions" to "anon";

grant insert on table "public"."user_actions" to "anon";

grant references on table "public"."user_actions" to "anon";

grant select on table "public"."user_actions" to "anon";

grant trigger on table "public"."user_actions" to "anon";

grant truncate on table "public"."user_actions" to "anon";

grant update on table "public"."user_actions" to "anon";

grant delete on table "public"."user_actions" to "authenticated";

grant insert on table "public"."user_actions" to "authenticated";

grant references on table "public"."user_actions" to "authenticated";

grant select on table "public"."user_actions" to "authenticated";

grant trigger on table "public"."user_actions" to "authenticated";

grant truncate on table "public"."user_actions" to "authenticated";

grant update on table "public"."user_actions" to "authenticated";

grant delete on table "public"."user_actions" to "service_role";

grant insert on table "public"."user_actions" to "service_role";

grant references on table "public"."user_actions" to "service_role";

grant select on table "public"."user_actions" to "service_role";

grant trigger on table "public"."user_actions" to "service_role";

grant truncate on table "public"."user_actions" to "service_role";

grant update on table "public"."user_actions" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."user_actions"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."user_actions"
as permissive
for select
to public
using (true);


