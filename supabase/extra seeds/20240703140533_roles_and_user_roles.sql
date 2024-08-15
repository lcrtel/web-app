INSERT INTO
  public.roles (name, slug)
VALUES
  ('Director', 'director'),
  ('Company Manager', 'company_manager'),
  ('Finance Executive', 'finance_executive'),
  ('Finance Manager', 'finance_manager'),
  ('NOC Executive', 'noc_executive'),
  ('NOC Manager', 'noc_manager'),
  ('Purchase Executive', 'purchase_executive'),
  ('Purchase Manager', 'purchase_manager'),
  ('Sales Executive', 'sales_executive'),
  ('Sales Manager', 'sales_manager'),
  ('User', 'user');


INSERT INTO
  public.user_roles (user_id, ROLE)
SELECT
  id,
  COALESCE(
    CASE
      WHEN ROLE = 'vendor' THEN 'user'
      WHEN ROLE = 'client' THEN 'user'
      WHEN ROLE = 'admin' THEN 'director'
    END,
    'user'
  )
FROM
  public.profiles;