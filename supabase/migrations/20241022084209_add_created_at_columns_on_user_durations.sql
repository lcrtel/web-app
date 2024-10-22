alter table "public"."user_durations" add column "created_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text);


