drop policy "allow users to insert" on "public"."routes";

create policy "Allow authenticated users to insert"
on "public"."routes"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."routes"
as permissive
for select
to public
using (true);



