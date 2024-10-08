create policy "Enable all access to authenticated users"
on "public"."rate_hikes"
as permissive
for all
to authenticated
using (true);


create policy "Enable read access for all users"
on "public"."rate_hikes"
as permissive
for select
to public
using (true);



