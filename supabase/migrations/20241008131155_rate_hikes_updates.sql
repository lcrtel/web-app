alter table "public"."rate_hikes" drop constraint "rate_hikes_destination_code_fkey";

CREATE UNIQUE INDEX rate_hikes_destination_code_key ON public.rate_hikes USING btree (destination_code);

alter table "public"."rate_hikes" add constraint "rate_hikes_destination_code_key" UNIQUE using index "rate_hikes_destination_code_key";

alter table "public"."rate_hikes" add constraint "rate_hikes_destination_code_fkey" FOREIGN KEY (destination_code) REFERENCES phone_codes(code) ON UPDATE CASCADE ON DELETE SET DEFAULT not valid;

alter table "public"."rate_hikes" validate constraint "rate_hikes_destination_code_fkey";


