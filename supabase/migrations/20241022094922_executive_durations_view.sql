create or replace view "public"."executive_durations" as  SELECT e.id AS executive_id,
    p.id AS profile_id,
    p.name,
    p.company_name,
    p.email,
    p.phone,
    p.skype_id,
    d.slug AS department_slug,
    COALESCE(sum(ud.duration), (0)::numeric) AS total_duration
   FROM (((executives e
     JOIN profiles p ON ((e.user_id = p.id)))
     JOIN departments d ON ((e.department = d.slug)))
     LEFT JOIN user_durations ud ON ((ud.user_id = p.id)))
  GROUP BY e.id, p.id, d.slug;



