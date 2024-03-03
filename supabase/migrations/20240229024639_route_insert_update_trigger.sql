create
or replace function route_insert_update_trigger () returns trigger as $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        INSERT INTO routes_history(route_id, asr, acd, capacity, destination, destination_code,rate, selling_rate,route_type,ports,pdd)
        VALUES(NEW.id, NEW.asr, NEW.acd, NEW.capacity, NEW.destination, NEW.destination_code, NEW.rate, NEW.selling_rate, NEW.route_type, NEW.ports, NEW.pdd);
    END IF;
    RETURN NEW;
END;
$$ language plpgsql;

create trigger route_insert_update
after insert
or
update on routes for each row
execute function route_insert_update_trigger ();