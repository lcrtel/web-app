drop function if exists "audit"."disable_tracking"(regclass);

drop function if exists "audit"."enable_tracking"(regclass);

drop function if exists "audit"."insert_update_delete_trigger"();

drop function if exists "audit"."primary_key_columns"(entity_oid oid);

drop function if exists "audit"."to_record_id"(entity_oid oid, pkey_cols text[], rec jsonb);

drop schema if exists "audit";


