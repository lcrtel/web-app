revoke delete on table "public"."wallet" from "anon";

revoke insert on table "public"."wallet" from "anon";

revoke references on table "public"."wallet" from "anon";

revoke select on table "public"."wallet" from "anon";

revoke trigger on table "public"."wallet" from "anon";

revoke truncate on table "public"."wallet" from "anon";

revoke update on table "public"."wallet" from "anon";

revoke delete on table "public"."wallet" from "authenticated";

revoke insert on table "public"."wallet" from "authenticated";

revoke references on table "public"."wallet" from "authenticated";

revoke select on table "public"."wallet" from "authenticated";

revoke trigger on table "public"."wallet" from "authenticated";

revoke truncate on table "public"."wallet" from "authenticated";

revoke update on table "public"."wallet" from "authenticated";

revoke delete on table "public"."wallet" from "service_role";

revoke insert on table "public"."wallet" from "service_role";

revoke references on table "public"."wallet" from "service_role";

revoke select on table "public"."wallet" from "service_role";

revoke trigger on table "public"."wallet" from "service_role";

revoke truncate on table "public"."wallet" from "service_role";

revoke update on table "public"."wallet" from "service_role";

alter table "public"."wallet" drop constraint "wallet_user_id_fkey";

alter table "public"."wallet" drop constraint "wallet_wallet_id_key";

alter table "public"."wallet" drop constraint "wallet_pkey";

drop index if exists "public"."wallet_pkey";

drop index if exists "public"."wallet_wallet_id_key";

drop table "public"."wallet";


