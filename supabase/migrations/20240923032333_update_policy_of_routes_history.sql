drop policy "allow for authenticated" on "public"."routes_history";

create policy "Enable insert for authenticated users only"
on "public"."routes_history"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."routes_history"
as permissive
for select
to public
using (true);



