drop policy "Public profiles are viewable by everyone." on "public"."profiles";

drop policy "Enable read access for all users" on "public"."user_roles";

create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using ((id = auth.uid()));


create policy "Enable read access for all users"
on "public"."user_roles"
as permissive
for select
to public
using ((user_id = auth.uid()));



