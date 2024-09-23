alter table "public"."routes" add column "remarks" text;

alter table "public"."routes_history" add column "remarks" text;

alter table "public"."targets" add column "remarks" text;

alter table "public"."targets_history" add column "remarks" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.route_insert_update_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO routes_history(route_id, asr, acd, destination, destination_code,rate, selling_rate,route_type,ports,pdd,remarks)
        VALUES(NEW.id, NEW.asr, NEW.acd, NEW.destination, NEW.destination_code, NEW.rate, NEW.selling_rate, NEW.route_type, NEW.ports, NEW.pdd, NEW.remarks);
    END IF;
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.target_insert_update_trigger()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO targets_history(target_id, asr, acd, destination, destination_code,rate, buying_rate,route_type,ports,pdd,remarks)
        VALUES(NEW.id, NEW.asr, NEW.acd, NEW.destination, NEW.destination_code, NEW.rate, NEW.buying_rate, NEW.route_type, NEW.ports, NEW.pdd, NEW.remarks);
    END IF;
    RETURN NEW;
END;$function$
;


