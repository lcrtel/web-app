alter table "public"."user_roles" drop constraint "public_user_roles_role_fkey";

alter table "public"."user_roles" drop column "role";

alter table "public"."user_roles" add column "role_slug" text not null default 'user'::text;

CREATE INDEX idx_user_roles_role_slug ON public.user_roles USING btree (role_slug);

CREATE INDEX idx_user_roles_user_id ON public.user_roles USING btree (user_id);

alter table "public"."user_roles" add constraint "public_user_roles_role_slug_fkey" FOREIGN KEY (role_slug) REFERENCES roles(slug) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_roles" validate constraint "public_user_roles_role_slug_fkey";


