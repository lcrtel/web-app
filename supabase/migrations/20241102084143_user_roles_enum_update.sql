alter type "public"."roles_enum" rename to "roles_enum__old_version_to_be_dropped";

create type "public"."roles_enum" as enum ('director', 'company_manager', 'finance_executive', 'finance_manager', 'noc_executive', 'noc_manager', 'purchase_executive', 'purchase_manager', 'sales_executive', 'sales_manager', 'user', 'tech_manager', 'tech_executive');

drop type "public"."roles_enum__old_version_to_be_dropped";


