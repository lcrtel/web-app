alter table "public"."routes_history" drop constraint "public_routes_history_route_id_fkey";

alter table "public"."routes_history" alter column "effective_date" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."routes_history" add constraint "routes_history_route_id_fkey" FOREIGN KEY (route_id) REFERENCES routes(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."routes_history" validate constraint "routes_history_route_id_fkey";


