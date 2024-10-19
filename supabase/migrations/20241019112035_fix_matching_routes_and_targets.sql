set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.match_all_routes_targets()
 RETURNS TABLE(id uuid, destination text, destination_code text, rate text, route_type text, asr text, acd text, ports text, verification text, created_at timestamp with time zone, pdd text, selling_rate text, remarks text)
 LANGUAGE plpgsql
AS $function$BEGIN
  RETURN QUERY
  SELECT
    r.id AS id,
    r.destination AS destination,
    r.destination_code AS destination_code,
    r.rate AS rate,
    r.route_type AS route_type,
    r.asr AS asr, -- Assuming these fields exist in your routes table
    r.acd AS acd, -- Assuming these fields exist in your routes table
    r.ports AS ports, -- Assuming these fields exist in your routes table
    r.verification AS verification,
    r.created_at AS created_at,
    r.pdd AS pdd, -- Assuming this field exists in your routes table
    r.selling_rate AS selling_rate, -- Ensure this is of type NUMERIC
    r.remarks AS remarks -- Assuming this field exists in your routes table
  FROM routes r
  JOIN targets t ON LOWER(r.destination_code) = LOWER(t.destination_code)
                AND r.route_type = t.route_type
  WHERE r.verification = 'verified'
    AND t.client_id = auth.uid() 
    AND r.vendor_id <> auth.uid()
    AND t.buying_rate <= r.selling_rate;
END;$function$
;

CREATE OR REPLACE FUNCTION public.match_all_targets_with_routes()
 RETURNS TABLE(id uuid, destination text, destination_code text, route_type text, asr text, acd text, ports text, created_at timestamp with time zone, pdd text, buying_rate text, remarks text)
 LANGUAGE plpgsql
AS $function$BEGIN
  RETURN QUERY
  SELECT
    t.id AS id,
    t.destination AS destination,
    t.destination_code AS destination_code,
    t.route_type AS route_type,
    t.asr AS asr,  -- Assuming these fields exist in your targets table
    t.acd AS acd,  -- Assuming these fields exist in your targets table
    t.ports AS ports,  -- Assuming these fields exist in your targets table
    t.created_at AS created_at,
    t.pdd AS pdd,  -- Assuming this field exists in your targets table
    t.buying_rate AS buying_rate,  -- Ensure this is of type NUMERIC
    t.remarks AS remarks  -- Assuming this field exists in your targets table
  FROM routes r
  JOIN targets t ON LOWER(r.destination_code) = LOWER(t.destination_code)
                AND r.route_type = t.route_type
  WHERE r.verification = 'verified'
    AND t.client_id <> auth.uid() 
    AND r.vendor_id = auth.uid()
    AND t.buying_rate <= r.selling_rate;
END;$function$
;


