alter table "public"."executives" add column "manager_id" bigint;

alter table "public"."executives" add constraint "executives_manager_id_fkey" FOREIGN KEY (manager_id) REFERENCES managers(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."executives" validate constraint "executives_manager_id_fkey";


