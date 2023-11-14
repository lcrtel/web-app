
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "audit";

ALTER SCHEMA "audit" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "audit"."disable_tracking"("regclass") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
declare
    statement_row text = format(
        'drop trigger if exists audit_i_u_d on %I;',
        $1
    );
begin
    execute statement_row;
end;
$_$;

ALTER FUNCTION "audit"."disable_tracking"("regclass") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "audit"."enable_tracking"("regclass") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $_$
declare
    statement_row text = format('
        create trigger audit_i_u_d
            before insert or update or delete
            on %I
            for each row
            execute procedure audit.insert_update_delete_trigger();',
        $1
    );

    pkey_cols text[] = audit.primary_key_columns($1);
begin
    if pkey_cols = array[]::text[] then
        raise exception 'Table % can not be audited because it has no primary key', $1;
    end if;

    if not exists(select 1 from pg_trigger where tgrelid = $1 and tgname = 'audit_i_u_d') then
        execute statement_row;
    end if;
end;
$_$;

ALTER FUNCTION "audit"."enable_tracking"("regclass") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "audit"."insert_update_delete_trigger"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
    pkey_cols text[] = audit.primary_key_columns(TG_RELID);
    record_jsonb jsonb = to_jsonb(new);
    record_id uuid = audit.to_record_id(TG_RELID, pkey_cols, record_jsonb);
    old_record_jsonb jsonb = to_jsonb(old);
    old_record_id uuid = audit.to_record_id(TG_RELID, pkey_cols, old_record_jsonb);
begin

    insert into audit.record_version(
        record_id,
        old_record_id,
        op,
        table_oid,
        table_schema,
        table_name,
        record,
        old_record
    )
    select
        record_id,
        old_record_id,
        TG_OP,
        TG_RELID,
        TG_TABLE_SCHEMA,
        TG_TABLE_NAME,
        record_jsonb,
        old_record_jsonb;

    return coalesce(new, old);
end;
$$;

ALTER FUNCTION "audit"."insert_update_delete_trigger"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "audit"."primary_key_columns"("entity_oid" "oid") RETURNS "text"[]
    LANGUAGE "sql" STABLE SECURITY DEFINER
    AS $_$
    -- Looks up the names of a table's primary key columns
    select
        coalesce(
            array_agg(pa.attname::text order by pa.attnum),
            array[]::text[]
        ) column_names
    from
        pg_index pi
        join pg_attribute pa
            on pi.indrelid = pa.attrelid
            and pa.attnum = any(pi.indkey)
    where
        indrelid = $1
        and indisprimary
$_$;

ALTER FUNCTION "audit"."primary_key_columns"("entity_oid" "oid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "audit"."to_record_id"("entity_oid" "oid", "pkey_cols" "text"[], "rec" "jsonb") RETURNS "uuid"
    LANGUAGE "sql" STABLE
    AS $_$
    select
        case
            when rec is null then null
						-- if no primary key exists, use a random uuid
            when pkey_cols = array[]::text[] then gen_random_uuid()
            else (
                select
                    uuid_generate_v5(
                        'fd62bc3d-8d6e-43c2-919c-802ba3762271',
                        (
													jsonb_build_array(to_jsonb($1))
													|| jsonb_agg($3 ->> key_)
												)::text
                    )
                from
                    unnest($2) x(key_)
            )
        end
$_$;

ALTER FUNCTION "audit"."to_record_id"("entity_oid" "oid", "pkey_cols" "text"[], "rec" "jsonb") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
  insert into public.profiles (id, name, company_name, email, phone, skype_id, role)
  values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'company_name', new.raw_user_meta_data->>'email', new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'skype_id', new.raw_user_meta_data->>'role')
  on conflict (id)
  do update set
    name = excluded.name,
    company_name = excluded.company_name,
    email = excluded.email,
    phone = excluded.phone,
    skype_id = excluded.skype_id,
    role = excluded.role;
  return new;
end;$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "audit"."record_version" (
    "id" bigint NOT NULL,
    "record_id" "uuid",
    "old_record_id" "uuid",
    "op" character varying(8) NOT NULL,
    "ts" timestamp with time zone DEFAULT "now"() NOT NULL,
    "table_oid" "oid" NOT NULL,
    "table_schema" "name" NOT NULL,
    "table_name" "name" NOT NULL,
    "record" "jsonb",
    "old_record" "jsonb"
);

ALTER TABLE "audit"."record_version" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "audit"."record_version_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "audit"."record_version_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "audit"."record_version_id_seq" OWNED BY "audit"."record_version"."id";

CREATE TABLE IF NOT EXISTS "public"."agents" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "clients" numeric,
    "vendors" numeric,
    "routes" numeric,
    "targets" numeric
);

ALTER TABLE "public"."agents" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."bank_accounts" (
    "id" bigint NOT NULL,
    "bank_name" "text",
    "name" "text",
    "account_no" "text",
    "account_type" "text",
    "ifsc_code" "text",
    "branch" "text"
);

ALTER TABLE "public"."bank_accounts" OWNER TO "postgres";

ALTER TABLE "public"."bank_accounts" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."bank_accounts_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."invoices" (
    "invoice_id" smallint NOT NULL,
    "date_issued" timestamp with time zone DEFAULT "now"(),
    "total_amount" real DEFAULT '0'::real,
    "status" character varying DEFAULT 'pending'::character varying,
    "paid_at" timestamp with time zone,
    "description" "text",
    "date_due" timestamp with time zone,
    "bill_to" "jsonb",
    "agent" "text",
    "invoice_to" "uuid",
    "note" "text",
    "balance" numeric DEFAULT '0'::numeric,
    "connection_id" "uuid",
    "quantity" numeric DEFAULT '0'::numeric
);

ALTER TABLE "public"."invoices" OWNER TO "postgres";

ALTER TABLE "public"."invoices" ALTER COLUMN "invoice_id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."invoices_invoice_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."notifications " (
    "notification_id" bigint NOT NULL,
    "date_sent" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "message" "text",
    "status" character varying DEFAULT 'unread'::character varying NOT NULL
);

ALTER TABLE "public"."notifications " OWNER TO "postgres";

ALTER TABLE "public"."notifications " ALTER COLUMN "notification_id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."notifications _notification_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."payments" (
    "payment_id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "invoice_id" smallint NOT NULL,
    "amount" "text" NOT NULL,
    "payment_status" character varying DEFAULT 'paid'::character varying NOT NULL,
    "paid_at" timestamp with time zone NOT NULL,
    "user_id" "uuid",
    "connection_id" "uuid",
    "payment_method" "text"
);

ALTER TABLE "public"."payments" OWNER TO "postgres";

ALTER TABLE "public"."payments" ALTER COLUMN "payment_id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."payments_payment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" "text",
    "company_name" "text",
    "email" "text",
    "phone" "text",
    "skype_id" "text",
    "role" "text",
    "finance_department" "json",
    "noc_dipartment" "json",
    "sales_dipartment" "json",
    "payment_method" "jsonb"
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."purchase_requests" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "buyer_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "route_id" "uuid" NOT NULL,
    "message" "text",
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "buying_rate" "text",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "payment_type" "text" NOT NULL,
    "connection_id" "uuid",
    "communication_status" "text" NOT NULL
);

ALTER TABLE "public"."purchase_requests" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."gateways" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "buyer_id" "uuid" NOT NULL,
    "route_id" "uuid" NOT NULL,
    "status" "text" NOT NULL,
    "expiration_date" "date",
    "payment_type" "text",
    "rate" "text"
);

ALTER TABLE "public"."gateways" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."routes" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "vendor_id" "uuid" DEFAULT "auth"."uid"(),
    "destination" character varying(100) NOT NULL,
    "rate" "text" NOT NULL,
    "route_type" character varying(50) NOT NULL,
    "prefix" character varying(20) NOT NULL,
    "asr" character varying NOT NULL,
    "acd" character varying NOT NULL,
    "ports" character varying NOT NULL,
    "capacity" character varying NOT NULL,
    "verification" "text" DEFAULT 'pending'::"text" NOT NULL,
    "verification_by" "uuid",
    "verified_at" timestamp without time zone,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    "updated_at" timestamp with time zone,
    "destination_code" character varying NOT NULL,
    "pdd" character varying NOT NULL,
    "selling_rate" "text" DEFAULT '0'::"text" NOT NULL
);

ALTER TABLE "public"."routes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."selected_routes" (
    "route_id" "uuid" NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."selected_routes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."targets" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "client_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "destination" character varying(100) NOT NULL,
    "rate" numeric NOT NULL,
    "route_type" character varying(50) NOT NULL,
    "prefix" character varying(20) NOT NULL,
    "asr" character varying NOT NULL,
    "acd" character varying NOT NULL,
    "ports" character varying NOT NULL,
    "capacity" character varying NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text"),
    "updated_at" timestamp with time zone,
    "destination_code" character varying NOT NULL,
    "pdd" character varying NOT NULL,
    "buying_rate" numeric DEFAULT '0'::numeric NOT NULL
);

ALTER TABLE "public"."targets" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."watchlist" (
    "id" bigint NOT NULL,
    "route_id" "uuid" NOT NULL,
    "user_id" "uuid" DEFAULT "auth"."uid"()
);

ALTER TABLE "public"."watchlist" OWNER TO "postgres";

ALTER TABLE "public"."watchlist" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."watchlist_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "audit"."record_version" ALTER COLUMN "id" SET DEFAULT "nextval"('"audit"."record_version_id_seq"'::"regclass");

ALTER TABLE ONLY "audit"."record_version"
    ADD CONSTRAINT "record_version_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."agents"
    ADD CONSTRAINT "agents_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."bank_accounts"
    ADD CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."targets"
    ADD CONSTRAINT "buying_targets_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_pkey" PRIMARY KEY ("invoice_id");

ALTER TABLE ONLY "public"."notifications "
    ADD CONSTRAINT "notifications _pkey" PRIMARY KEY ("notification_id");

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("payment_id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."purchase_requests"
    ADD CONSTRAINT "purchase_requests_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."gateways"
    ADD CONSTRAINT "route_conncetions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."routes"
    ADD CONSTRAINT "route_offers_posts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."selected_routes"
    ADD CONSTRAINT "selected_routes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."watchlist"
    ADD CONSTRAINT "watchlist_pkey" PRIMARY KEY ("id");

CREATE INDEX "record_version_old_record_id" ON "audit"."record_version" USING "btree" ("record_id") WHERE ("old_record_id" IS NOT NULL);

CREATE INDEX "record_version_record_id" ON "audit"."record_version" USING "btree" ("record_id") WHERE ("record_id" IS NOT NULL);

CREATE OR REPLACE TRIGGER "audit_i_u_d" BEFORE INSERT OR DELETE OR UPDATE ON "public"."routes" FOR EACH ROW EXECUTE FUNCTION "audit"."insert_update_delete_trigger"();

CREATE OR REPLACE TRIGGER "audit_i_u_d" BEFORE INSERT OR DELETE OR UPDATE ON "public"."targets" FOR EACH ROW EXECUTE FUNCTION "audit"."insert_update_delete_trigger"();

ALTER TABLE ONLY "public"."agents"
    ADD CONSTRAINT "agents_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "public"."gateways"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."invoices"
    ADD CONSTRAINT "invoices_invoice_to_fkey" FOREIGN KEY ("invoice_to") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."notifications "
    ADD CONSTRAINT "notifications _user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "public"."gateways"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("invoice_id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."purchase_requests"
    ADD CONSTRAINT "purchase_requests_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."purchase_requests"
    ADD CONSTRAINT "purchase_requests_connection_id_fkey" FOREIGN KEY ("connection_id") REFERENCES "public"."gateways"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."purchase_requests"
    ADD CONSTRAINT "purchase_requests_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."gateways"
    ADD CONSTRAINT "route_connections_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."gateways"
    ADD CONSTRAINT "route_connections_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."routes"
    ADD CONSTRAINT "routes_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;

ALTER TABLE ONLY "public"."selected_routes"
    ADD CONSTRAINT "selected_routes_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."selected_routes"
    ADD CONSTRAINT "selected_routes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."targets"
    ADD CONSTRAINT "targets_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."watchlist"
    ADD CONSTRAINT "watchlist_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "public"."routes"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."watchlist"
    ADD CONSTRAINT "watchlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Allow all operations to authenticated users" ON "public"."selected_routes" TO "authenticated" USING (("user_id" = "auth"."uid"())) WITH CHECK (("user_id" = "auth"."uid"()));

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."agents" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "all operation for authenticated users" ON "public"."payments" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

CREATE POLICY "allow all operations to authenticated users " ON "public"."purchase_requests" TO "authenticated" USING (true) WITH CHECK (true);

CREATE POLICY "allow delete for authenticated users" ON "public"."watchlist" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "user_id"));

CREATE POLICY "allow insert for authenticated users" ON "public"."watchlist" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "allow select for authenticated users" ON "public"."watchlist" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "user_id"));

CREATE POLICY "allow sellers to delete their own routes" ON "public"."routes" FOR DELETE TO "authenticated" USING (("auth"."uid"() = "vendor_id"));

CREATE POLICY "allow sellers to edit their routes" ON "public"."routes" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "vendor_id")) WITH CHECK (("auth"."uid"() = "vendor_id"));

CREATE POLICY "allow unathemticated users to select" ON "public"."routes" FOR SELECT TO "authenticated", "anon" USING (true);

CREATE POLICY "allow user to read only" ON "public"."invoices" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "allow user to select" ON "public"."gateways" FOR SELECT TO "authenticated" USING (("buyer_id" = "auth"."uid"()));

CREATE POLICY "allow users to access" ON "public"."targets" USING (true) WITH CHECK (true);

CREATE POLICY "allow users to insert" ON "public"."routes" FOR INSERT TO "authenticated" WITH CHECK (true);

ALTER TABLE "public"."bank_accounts" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."invoices" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."notifications " ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."payments" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."purchase_requests" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."gateways" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."routes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."selected_routes" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."targets" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."watchlist" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."agents" TO "anon";
GRANT ALL ON TABLE "public"."agents" TO "authenticated";
GRANT ALL ON TABLE "public"."agents" TO "service_role";

GRANT ALL ON TABLE "public"."bank_accounts" TO "anon";
GRANT ALL ON TABLE "public"."bank_accounts" TO "authenticated";
GRANT ALL ON TABLE "public"."bank_accounts" TO "service_role";

GRANT ALL ON SEQUENCE "public"."bank_accounts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."bank_accounts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."bank_accounts_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."invoices" TO "anon";
GRANT ALL ON TABLE "public"."invoices" TO "authenticated";
GRANT ALL ON TABLE "public"."invoices" TO "service_role";

GRANT ALL ON SEQUENCE "public"."invoices_invoice_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."invoices_invoice_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."invoices_invoice_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."notifications " TO "anon";
GRANT ALL ON TABLE "public"."notifications " TO "authenticated";
GRANT ALL ON TABLE "public"."notifications " TO "service_role";

GRANT ALL ON SEQUENCE "public"."notifications _notification_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."notifications _notification_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."notifications _notification_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."payments" TO "anon";
GRANT ALL ON TABLE "public"."payments" TO "authenticated";
GRANT ALL ON TABLE "public"."payments" TO "service_role";

GRANT ALL ON SEQUENCE "public"."payments_payment_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payments_payment_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payments_payment_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."purchase_requests" TO "anon";
GRANT ALL ON TABLE "public"."purchase_requests" TO "authenticated";
GRANT ALL ON TABLE "public"."purchase_requests" TO "service_role";

GRANT ALL ON TABLE "public"."gateways" TO "anon";
GRANT ALL ON TABLE "public"."gateways" TO "authenticated";
GRANT ALL ON TABLE "public"."gateways" TO "service_role";

GRANT ALL ON TABLE "public"."routes" TO "anon";
GRANT ALL ON TABLE "public"."routes" TO "authenticated";
GRANT ALL ON TABLE "public"."routes" TO "service_role";

GRANT ALL ON TABLE "public"."selected_routes" TO "anon";
GRANT ALL ON TABLE "public"."selected_routes" TO "authenticated";
GRANT ALL ON TABLE "public"."selected_routes" TO "service_role";

GRANT ALL ON TABLE "public"."targets" TO "anon";
GRANT ALL ON TABLE "public"."targets" TO "authenticated";
GRANT ALL ON TABLE "public"."targets" TO "service_role";

GRANT ALL ON TABLE "public"."watchlist" TO "anon";
GRANT ALL ON TABLE "public"."watchlist" TO "authenticated";
GRANT ALL ON TABLE "public"."watchlist" TO "service_role";

GRANT ALL ON SEQUENCE "public"."watchlist_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."watchlist_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."watchlist_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
