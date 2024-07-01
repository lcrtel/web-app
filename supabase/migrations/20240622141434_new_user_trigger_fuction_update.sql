set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.profiles (id, name, company_name, email, phone, skype_id)
  values (new.id, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'company_name', new.email, new.raw_user_meta_data->>'phone', new.raw_user_meta_data->>'skype_id')
  on conflict (id)
  do update set
    name = excluded.name,
    company_name = excluded.company_name,
    email = excluded.email,
    phone = excluded.phone,
    skype_id = excluded.skype_id;
  return new;
end;$function$
;


