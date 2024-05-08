SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'e12a0b91-9c05-4747-af29-f247125edc07', 'authenticated', 'authenticated', 'wavenettel@gmail.com', '$2a$10$TkFKjR0P9jXw5bcRnqW7lu.hCbJLCfg1TlYf.2xSjxtna0GqOaOtS', '2024-02-04 11:15:33.042285+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "WAVENET", "role": "vendor", "email": "wavenettel@gmail.com", "phone": "+12027736948", "company_name": "WAVENET TEL"}', NULL, '2024-02-04 11:15:33.035987+00', '2024-02-04 11:15:33.042525+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f44035f8-16dc-4ce0-9c41-7dbba15402a1', 'authenticated', 'authenticated', 'sales@nexttechltd.net', '$2a$10$lXOjc1MMQLGjJezeuo1CQe.EhPEpAyuoKG7I.bmzwx371GhSRWogW', '2024-02-04 10:20:42.152778+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "NEXT TECH", "role": "vendor", "email": "sales@nexttechltd.net", "phone": "+15103702526", "company_name": "NEXT TECH"}', NULL, '2024-02-04 10:20:42.14784+00', '2024-02-04 10:20:42.152982+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6adf7496-fdd2-451f-bc9b-ff387ae1ce6c', 'authenticated', 'authenticated', 'sales@enigmaimcorp.in', '$2a$10$9L9GEijgWqQbHZEVkTKk/OSJFFJY/4cVOMdNParM5y5rymuwN4vqq', '2024-02-04 10:23:33.883371+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "ENIGMA", "role": "vendor", "email": "sales@enigmaimcorp.in", "phone": "+17862336377", "company_name": "ENIGMA"}', NULL, '2024-02-04 10:23:33.880599+00', '2024-02-04 10:23:33.88356+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'bde6f9dc-e9be-4f17-a0fd-5f667ca8e527', 'authenticated', 'authenticated', 'elvish@clickonetelecom.com', '$2a$10$IQlA4bwIMs2hJ.d9ETEyt.lvCUsZGBLFfnJagmRhVr7Flucsw9Ua2', '2024-02-04 14:45:17.478668+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "ELVISH", "role": "client", "email": "elvish@clickonetelecom.com", "phone": "+447441440447", "company_name": "CLICK ONE TELECOM"}', NULL, '2024-02-04 14:45:17.472657+00', '2024-02-04 14:45:17.478896+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '07028b03-b0cc-4243-99f0-5d3decb0d971', 'authenticated', 'authenticated', 'noc@fiamanillah.com', '$2a$10$NxVNbyLJBEC85Xo3v4pnm.Z0Dn0gu7yjA0ZIHw1kk1jKWRlF/0iIS', '2024-02-04 10:24:59.226476+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "FIAMANILLAH", "role": "vendor", "email": "noc@fiamanillah.com", "phone": "+447418349162", "company_name": "FIAMANILLAH"}', NULL, '2024-02-04 10:24:59.222294+00', '2024-02-04 10:24:59.226699+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '17f325f0-6311-4842-b3a9-b7311067d59a', 'authenticated', 'authenticated', 'nowshad@globalvoip.ca', '$2a$10$i7jVUj7cDKezgWvcFItKduZJ0hHycjl0tNTrKCuM5r68e2xvCzte6', '2024-02-04 10:26:38.424212+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "NOWSHAD SUBAIR", "role": "vendor", "email": "nowshad@globalvoip.ca", "phone": "+971554405442", "company_name": "GLOBAL VOIP"}', NULL, '2024-02-04 10:26:38.421139+00', '2024-02-04 10:26:38.424401+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '55c51783-5a10-457e-8812-79f4f1dea314', 'authenticated', 'authenticated', 'noor@nicetalk.biz', '$2a$10$LRkEo5mEtzMq4rD/6VRzCORUuHbsRXiIfugvvDCW3PRICh/J7e8km', '2024-02-04 14:47:53.705658+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "NOOR", "role": "vendor", "email": "noor@nicetalk.biz", "phone": "+447441440544", "company_name": "NICE TALK"}', NULL, '2024-02-04 14:47:53.702302+00', '2024-02-04 14:47:53.70585+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd3b482f7-a277-4afd-9c68-a033fa733bc1', 'authenticated', 'authenticated', 'ankit.rath@voiptechsolutions.in', '$2a$10$IFQHj9LAUAgbPab6Vy/0nuzLucMuic.FCRvWrU91/rO0ZFZ3SkK8O', '2024-02-06 11:55:18.640748+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "Ankit", "role": "vendor", "email": "Ankit.rath@voiptechsolutions.in", "phone": "00917358737843", "skype_id": "Ankit.rath", "company_name": "Voip tech"}', NULL, '2024-02-06 11:55:18.629391+00', '2024-02-06 11:55:18.640959+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'dd94fd4f-9a18-496b-941e-df92c3e49a86', 'authenticated', 'authenticated', 'akhurana@excelsiorbird.com', '$2a$10$M6NEpAturyYFdtvg0HwTI.7/7l2tiGcJ3D.QT2Wd6qxZIq2XveF86', '2024-02-07 11:23:16.253626+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "Abhishek", "role": "vendor", "email": "akhurana@excelsiorbird.com", "phone": "+919971430370", "company_name": "Excelsior bird"}', NULL, '2024-02-07 11:23:16.242976+00', '2024-02-07 11:23:16.253862+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '60ea457a-1bc4-41c5-955c-a5eadfe47480', 'authenticated', 'authenticated', 'commercials@haimicloud.net', '$2a$10$Nx/7RpdAZxdi12Y5Rix4teNOBQlsRNsfURRixKvDCE90.OZaP8mU2', '2024-02-07 11:20:50.359464+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-02-11 07:53:46.99514+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Sagar", "role": "vendor", "email": "commercials@haimicloud.net", "phone": "9650127433", "company_name": "Hcc"}', NULL, '2024-02-07 11:20:50.354125+00', '2024-02-11 07:53:46.999403+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c05cd20c-1764-4735-9363-2abfaf26f58d', 'authenticated', 'authenticated', 'noc@d2call.com', '$2a$10$4Fr28bDSRchgglBnIWI.vefb4b.BOE4KOhg07rkjaJutcHs2Lrwy2', '2024-02-03 07:57:42.01974+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-02-07 07:53:01.130743+00', '{"provider": "email", "providers": ["email"]}', '{"name": "SHAHAL", "role": "vendor", "email": "noc@d2call.com", "phone": "+13024262298", "skype_id": "d2call.noc", "company_name": "D2CALL"}', NULL, '2024-02-03 07:57:42.015983+00', '2024-02-24 13:45:38.189201+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '77423768-f3cf-44c9-b83c-f72da1cb9a0b', 'authenticated', 'authenticated', 'amanhisham345@gmail.com', '$2a$10$cxKecwT4sKeCvGW8JS75eOJjM3N9JdCgXxtjhr4q4zXoCFApggiim', '2024-02-21 05:42:16.569739+00', NULL, '', '2024-02-21 05:41:55.241109+00', 'pkce_7dcd9aa89f2702c03b5f9e08b26887c670df3b0ec7a51df7cb7bffcd', '2024-03-08 22:15:08.015855+00', '', '', NULL, '2024-02-21 05:42:18.775443+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Aman", "role": "client", "email": "amanhisham345@gmail.com", "phone": "9778258846", "agent_id": "", "skype_id": "J", "company_name": "Lcr", "noc_department": {}, "sales_department": {}, "finance_department": {}}', NULL, '2024-02-21 05:41:55.225139+00', '2024-03-08 22:15:11.399512+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '63f8e39e-edee-4884-b7af-c772cea5fcbf', 'authenticated', 'authenticated', 'lcrtelweb@gmail.com', '$2a$10$NIF1mnCr5Z0zywFwiQLziOYo2PAJIW5ib.uIQ454gNXXVIv5URMv2', '2023-11-06 09:12:56.600872+00', NULL, '', '2023-11-06 09:11:55.615147+00', '', '2023-11-06 10:11:06.315338+00', '', '', NULL, '2024-04-17 10:29:24.213992+00', '{"provider": "email", "providers": ["email"]}', '{"name": "LCRTel", "role": "admin", "email": "lcrtelweb@gmail.com", "phone": "9539941964", "agent_id": "", "skype_id": "", "company_name": "LCRTel", "noc_department": {"name": "Mymoon", "email": "nihalshafi09@gmail.com"}, "noc_dipartment": {"name": "NICETALK NOC", "email": "noc@nicetalk.com"}, "sales_dipartment": {"name": "NICETALK Sales", "email": "sales@nicetalk.com"}, "finance_department": {"name": "aman", "email": "finance@aa.com", "phone": "9539941964", "skype_id": "asdfadsfds"}}', NULL, '2023-11-06 09:11:55.610867+00', '2024-04-17 22:17:46.544026+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '18730a17-293e-45ea-a7e3-08863f9d2623', 'authenticated', 'authenticated', 'mai1bustan.aj@gmail.com', '$2a$10$mwuFwEFDOnUEVoohni.yweDwN5Cz2XsDwGv.mCBAcZXrGfmKda1PK', '2024-02-21 04:13:08.504324+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-02-21 04:14:13.528664+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Mohammed N", "role": "agent", "email": "mai1bustan.aj@gmail.com", "phone": "00971567469166"}', NULL, '2024-02-21 04:13:08.491884+00', '2024-02-21 07:32:08.602899+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'd4c6c86d-7ffc-49aa-841f-8202ff9478a1', 'authenticated', 'authenticated', 'yousuf@zonextel.com', '$2a$10$MFfmWSi8bezfGvsoQotITuAZkewgKNmuIJ10FlY4ZVRM7wEIrNVzS', '2024-02-06 06:06:11.600412+00', NULL, '', '2024-02-06 06:01:45.518421+00', '', NULL, '', '', NULL, '2024-02-06 06:13:21.575428+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Muhammad Yousuf", "role": "client", "email": "yousuf@zonextel.com", "phone": "+971564849631", "agent_id": "", "skype_id": "muhammadyousuf89", "company_name": "ZonexTel Limited", "noc_department": {}, "sales_department": {}, "finance_department": {}}', NULL, '2024-02-06 06:01:45.511681+00', '2024-02-06 06:13:21.578284+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c63da6ec-e43a-4d76-9c5d-a9c1f75d3387', 'authenticated', 'authenticated', 'gitanjali@magiktelcom.com', '$2a$10$lJDzRqGoWQ9s/bJ8w7F1L.qOqv3VaPXY7h7Qvc1/FC4ihTK896mN6', '2024-02-04 10:50:40.898955+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "MAGIK", "role": "vendor", "email": "gitanjali@magiktelcom.com", "phone": "+919999007034", "company_name": "MAGIC VOICE"}', NULL, '2024-02-04 10:50:40.89367+00', '2024-02-04 10:50:40.899158+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a9521b61-52ff-434e-9912-b1d158010cdb', 'authenticated', 'authenticated', 'annie.sales@alraheemtechnologiesltd.com', '$2a$10$JQg2DYT8gpxWOpzzViY.H.FcMVqezXm2VygVDBy1v0wbknGwcYBbS', '2024-02-04 10:28:35.968603+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "AL RAHEEM", "role": "vendor", "email": "annie.sales@alraheemtechnologiesltd.com", "phone": "+923246601194", "company_name": "AL RAHEEM TECHNOLOGY"}', NULL, '2024-02-04 10:28:35.96534+00', '2024-02-04 10:28:35.968796+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a03d3373-401f-4699-a8ea-73d86a7a3d40', 'authenticated', 'authenticated', 'jigz@sync-sound.com', '$2a$10$tNQXJ/2W9Q9cQbg.uMk8bepXpqX5y12/ZoOeLejX/mywWj7bufHO6', '2024-02-04 10:45:50.49618+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "FAHAD", "role": "vendor", "email": "jigz@sync-sound.com", "phone": "+971586327792", "company_name": "SYNC SOUND"}', NULL, '2024-02-04 10:45:50.491049+00', '2024-02-04 10:45:50.496369+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'f3299cbd-6d23-44ff-8a73-d6f0c2e4af6e', 'authenticated', 'authenticated', 'sales@telcoearth.co.uk', '$2a$10$zuAgyc5bsh4NC6hOx1z.TuZlZibDkb3G0c1xpKi1QT98g3mZdYSuy', '2024-02-05 06:45:52.240442+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "TELCO", "role": "vendor", "email": "sales@telcoearth.co.uk", "phone": "+918299830068", "company_name": "TELCO EARTH"}', NULL, '2024-02-05 06:45:52.233549+00', '2024-02-05 06:45:52.240639+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '334d24bb-410b-4589-9423-75b5d558466f', 'authenticated', 'authenticated', 'aailamughal2008@gmail.com', '$2a$10$30ZIOzdiMB0eywvmeWV3dOWzjZvk734iER5reolkp68/Dnyx37QAy', '2024-02-04 10:52:37.071758+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "ARIES", "role": "vendor", "email": "aailamughal2008@gmail.com", "phone": "+12342559692", "company_name": "ARIES"}', NULL, '2024-02-04 10:52:37.06886+00', '2024-02-04 10:52:37.071962+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3820c7f3-09ae-4b7f-a1ac-e54dc0cfa3f8', 'authenticated', 'authenticated', 'shabbir@voxpace.com', '$2a$10$rT7t6X2qSBq7RkAmaRiE2u/ki7tVpQyt/eUi.zs5d7CK83H5g121G', '2024-02-04 10:47:17.985887+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "SHABBIR", "role": "vendor", "email": "shabbir@voxpace.com", "phone": "+971552400345", "company_name": "VOXPACE"}', NULL, '2024-02-04 10:47:17.982728+00', '2024-02-04 10:47:17.986126+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3d9c5855-0731-4d04-90cc-43abf5248ef4', 'authenticated', 'authenticated', 'sumaiya@aladincomm.com', '$2a$10$RR3s8NTlp9//P1QAsnACEO19ZVH9ELjSzGblMno.gcbF20FC0Rb4W', '2024-02-04 10:48:52.37068+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "ALADIN", "role": "vendor", "email": "sumaiya@aladincomm.com", "phone": "+12136410047", "company_name": "ALADIN COMMUNICATION"}', NULL, '2024-02-04 10:48:52.367462+00', '2024-02-04 10:48:52.370896+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '592f9ba0-de12-4c1d-b077-56b1675a0e9d', 'authenticated', 'authenticated', 'aria@axistel.biz', '$2a$10$pZ7sZ3mTp8xSi0y4nnDtaeLmMNPc33YyTFHB0dMmJhZ7qzs1piaba', '2024-02-04 11:05:05.739708+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "ARIA", "role": "vendor", "email": "aria@axistel.biz", "phone": "+989123729079", "company_name": "AXISTEL"}', NULL, '2024-02-04 11:05:05.736017+00', '2024-02-04 11:05:05.739909+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ab338984-a13c-4370-a894-d086f46bacbf', 'authenticated', 'authenticated', 'mark@rise-sol.com', '$2a$10$pa6hn34wtG19i4yAoo68iOPSyufPVYa5Yz0pHKGw8ju4tKQwBsd6.', '2024-02-04 11:06:51.527641+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "RISE", "role": "vendor", "email": "Mark@rise-sol.com", "phone": "+447868497028", "company_name": "RISE SOLUTION"}', NULL, '2024-02-04 11:06:51.524495+00', '2024-02-04 11:06:51.527827+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'feeb856e-a7bd-41de-a13d-6bdc7f0d5867', 'authenticated', 'authenticated', 'shazia@malaktel.com', '$2a$10$llOL7nQje67cp/Dpcck6eOYSrfigf5bg6hF25kY98yVM99eLMhBFe', '2024-02-05 09:55:40.524882+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "SHAZIA", "role": "vendor", "email": "shazia@malaktel.com", "phone": "+923002661123", "company_name": "MALAKTEL"}', NULL, '2024-02-05 09:55:40.519402+00', '2024-02-05 09:55:40.525079+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '7523ee44-8435-427d-9cb0-2328f669e1f3', 'authenticated', 'authenticated', 'almteentech2@gmail.com', '$2a$10$idC9ICInLJZesjJ/FyMNOupwXbb0lILu4qhD/LPDDknwEuIre79wO', '2024-02-05 08:01:07.66498+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "AL MATEEN", "role": "vendor", "email": "almteentech2@gmail.com", "phone": "+15513077461", "company_name": "AL MATEEN TECH"}', NULL, '2024-02-05 08:01:07.659485+00', '2024-02-05 08:01:07.665192+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'b466057a-b048-484d-8479-5f2246e5b84e', 'authenticated', 'authenticated', 'rartelecom.com@gmail.com', '$2a$10$CDCzZSdNtGcDici/ngBsvuFKEQe1tObEgT2J9D1xhyJctLUUsBss.', '2024-02-05 07:10:05.104957+00', NULL, '', '2024-02-05 07:09:11.202802+00', '', NULL, '', '', NULL, '2024-02-05 07:15:44.156236+00', '{"provider": "email", "providers": ["email"]}', '{"name": "MD NAZMUL HOSSAIN", "role": "client", "email": "rartelecom.com@gmail.com", "phone": "01813794274", "agent_id": "", "skype_id": "vpn4voice_net", "company_name": "RAR TELECOM", "noc_department": {}, "sales_department": {}, "finance_department": {}}', NULL, '2024-02-05 07:09:11.187902+00', '2024-02-05 13:36:46.99763+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '64efe034-fc05-4730-bc40-43d3cb7a9f81', 'authenticated', 'authenticated', 'anush.m@voxmaster.com', '$2a$10$ZkHY1rV7sEf9n.abTF2Od.Ml.9eXzSiPSo7GiE8ENEbqnuwYlVHjK', '2024-02-06 08:42:38.941165+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "Anush", "role": "vendor", "email": "anush.m@voxmaster.com", "phone": "+37443881919", "skype_id": "anush.m@voxmaster.com", "company_name": "vox master"}', NULL, '2024-02-06 08:42:38.936679+00', '2024-02-06 08:42:38.941399+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c32ac86a-ff4f-4893-ac80-0c93377560c1', 'authenticated', 'authenticated', 'yusuf@tapvox.net', '$2a$10$Bp8xHVlAHBGtF6F7HhhV1efrobVTbKUyLFA98aGOBYxubxWMT3Hni', '2024-02-06 12:16:57.592853+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "Yousuf", "role": "vendor", "email": "Yusuf@tapvox.net", "phone": "+15642123295", "company_name": "Tapvox"}', NULL, '2024-02-06 12:16:57.588197+00', '2024-02-06 12:16:57.593051+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'cc4bc477-a253-4969-a08e-c2d7893fc6fe', 'authenticated', 'authenticated', 'gaurav@maximotech.co', '$2a$10$HUu61WT6sOOqqyIzHIvkrOl7gTLPuCF8rxaTlO9iQ8YXAlOp5jPAa', '2024-02-07 11:15:48.861286+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"name": "Gaurav", "role": "vendor", "email": "gaurav@maximotech.co", "phone": "9560856095", "company_name": "Maximo tech"}', NULL, '2024-02-07 11:15:48.856633+00', '2024-02-07 11:15:48.86148+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '108d34df-fb4f-483d-9fcf-b63b24fae944', 'authenticated', 'authenticated', 'animefarooqi1@gmail.com', '$2a$10$NV6V77rR3tTa8xt24x2bhOHlEhHlLksuN/PJs53vVbUIFcjMb87OK', '2024-03-08 05:26:14.227452+00', NULL, '', '2024-03-08 05:25:43.573189+00', '', NULL, '', '', NULL, '2024-03-08 05:26:22.126244+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Aarif", "role": "client", "email": "animefarooqi1@gmail.com", "phone": "06284957785", "agent_id": "", "skype_id": "", "company_name": "Server fix ", "noc_department": {}, "sales_department": {}, "finance_department": {}}', NULL, '2024-03-08 05:25:43.535252+00', '2024-03-08 06:48:24.81543+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '08d9a5a3-d1ae-43ae-9ac0-0fb566b33619', 'authenticated', 'authenticated', 'pkmymoonpk@gmail.com', '$2a$10$W1TK2pKKy1xLUuvWfIhNT.qXnJ.bVv8pgROVdkYeSHwauKvSSjxBW', '2024-02-28 04:26:42.515125+00', NULL, '', '2024-02-28 04:26:26.768135+00', '', NULL, '', '', NULL, '2024-02-28 04:46:02.409381+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Mymoon Muhammed PK", "role": "client", "email": "pkmymoonpk@gmail.com", "phone": "9539941964", "agent_id": "", "skype_id": "", "company_name": "PKM", "noc_department": {}, "sales_department": {}, "finance_department": {}}', NULL, '2024-02-28 04:26:26.702659+00', '2024-03-03 22:10:02.4553+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6c68f7fe-188f-482c-8aba-abcedec9e392', 'authenticated', 'authenticated', 'shahal.vc13@gmail.com', '$2a$10$KcmIHIMvipE8RD64r6H53u6./wJA.hxHpmL.5t98Fiq4Kf9iG4Keu', '2024-04-14 14:32:27.890621+00', NULL, '', '2024-04-14 14:32:09.199857+00', '', NULL, '', '', NULL, '2024-04-14 14:59:41.595376+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "6c68f7fe-188f-482c-8aba-abcedec9e392", "name": "Aaa", "role": "client", "email": "shahal.vc13@gmail.com", "phone": "9567729413", "agent_id": "", "skype_id": "anush.m@voxmaster.com", "company_name": "Nahal", "email_verified": false, "noc_department": {}, "phone_verified": false, "sales_department": {}, "finance_department": {}}', NULL, '2024-04-14 14:32:09.161612+00', '2024-04-14 14:59:41.599704+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'authenticated', 'authenticated', 'ameenahsanav76@gmail.com', '$2a$10$UrZjF5bjmQwZwgMJACQv9.Yysc4WhVMo6BLjeGRCTg31Bw62uShMu', '2024-03-08 22:22:09.065983+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-04-17 22:24:20.129703+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Ameen ", "role": "client", "email": "ameenahsanav76@gmail.com", "phone": "978811", "agent_id": "", "skype_id": "Ikd", "company_name": "Ahsan", "noc_department": {}, "sales_department": {}, "finance_department": {}}', NULL, '2024-03-08 22:21:48.79422+00', '2024-04-17 22:24:20.133825+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('63f8e39e-edee-4884-b7af-c772cea5fcbf', '63f8e39e-edee-4884-b7af-c772cea5fcbf', '{"sub": "63f8e39e-edee-4884-b7af-c772cea5fcbf", "email": "lcrtelweb@gmail.com"}', 'email', '2023-11-06 09:11:55.613177+00', '2023-11-06 09:11:55.613211+00', '2023-11-06 09:11:55.613211+00', 'bdfcfa52-a800-4e10-881f-84c7d77ad8f3'),
	('55c51783-5a10-457e-8812-79f4f1dea314', '55c51783-5a10-457e-8812-79f4f1dea314', '{"sub": "55c51783-5a10-457e-8812-79f4f1dea314", "email": "noor@nicetalk.biz", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 14:47:53.703377+00', '2024-02-04 14:47:53.703425+00', '2024-02-04 14:47:53.703425+00', '4293dedb-3fd8-426c-954a-4f05dfba23dd'),
	('c05cd20c-1764-4735-9363-2abfaf26f58d', 'c05cd20c-1764-4735-9363-2abfaf26f58d', '{"sub": "c05cd20c-1764-4735-9363-2abfaf26f58d", "email": "noc@d2call.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-03 07:57:42.017364+00', '2024-02-03 07:57:42.017422+00', '2024-02-03 07:57:42.017422+00', 'c68398ef-89e8-4910-85e6-bd4050e03a5a'),
	('f44035f8-16dc-4ce0-9c41-7dbba15402a1', 'f44035f8-16dc-4ce0-9c41-7dbba15402a1', '{"sub": "f44035f8-16dc-4ce0-9c41-7dbba15402a1", "email": "sales@nexttechltd.net", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:20:42.149644+00', '2024-02-04 10:20:42.14972+00', '2024-02-04 10:20:42.14972+00', '9ad3c8e3-bb34-4557-a819-6d58764d9296'),
	('6adf7496-fdd2-451f-bc9b-ff387ae1ce6c', '6adf7496-fdd2-451f-bc9b-ff387ae1ce6c', '{"sub": "6adf7496-fdd2-451f-bc9b-ff387ae1ce6c", "email": "sales@enigmaimcorp.in", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:23:33.881591+00', '2024-02-04 10:23:33.881638+00', '2024-02-04 10:23:33.881638+00', 'c93ff5d3-8649-4bad-8abc-93bd2ca51298'),
	('07028b03-b0cc-4243-99f0-5d3decb0d971', '07028b03-b0cc-4243-99f0-5d3decb0d971', '{"sub": "07028b03-b0cc-4243-99f0-5d3decb0d971", "email": "noc@fiamanillah.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:24:59.22344+00', '2024-02-04 10:24:59.223489+00', '2024-02-04 10:24:59.223489+00', 'f326bb04-e89c-4cea-bf7e-54612bf6aff3'),
	('17f325f0-6311-4842-b3a9-b7311067d59a', '17f325f0-6311-4842-b3a9-b7311067d59a', '{"sub": "17f325f0-6311-4842-b3a9-b7311067d59a", "email": "nowshad@globalvoip.ca", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:26:38.422371+00', '2024-02-04 10:26:38.422434+00', '2024-02-04 10:26:38.422434+00', 'b7582ca3-6042-4ded-9095-c87380a34ae4'),
	('a9521b61-52ff-434e-9912-b1d158010cdb', 'a9521b61-52ff-434e-9912-b1d158010cdb', '{"sub": "a9521b61-52ff-434e-9912-b1d158010cdb", "email": "annie.sales@alraheemtechnologiesltd.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:28:35.966597+00', '2024-02-04 10:28:35.966655+00', '2024-02-04 10:28:35.966655+00', '5cc0509d-840e-4794-9a0f-6d971577b95f'),
	('a03d3373-401f-4699-a8ea-73d86a7a3d40', 'a03d3373-401f-4699-a8ea-73d86a7a3d40', '{"sub": "a03d3373-401f-4699-a8ea-73d86a7a3d40", "email": "jigz@sync-sound.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:45:50.492892+00', '2024-02-04 10:45:50.492941+00', '2024-02-04 10:45:50.492941+00', '04d21a8a-3f76-4279-86a6-f219aa849ab2'),
	('3820c7f3-09ae-4b7f-a1ac-e54dc0cfa3f8', '3820c7f3-09ae-4b7f-a1ac-e54dc0cfa3f8', '{"sub": "3820c7f3-09ae-4b7f-a1ac-e54dc0cfa3f8", "email": "shabbir@voxpace.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:47:17.983864+00', '2024-02-04 10:47:17.983914+00', '2024-02-04 10:47:17.983914+00', '66da58f8-1ea4-423e-a1ec-f3b0e4aaa2bf'),
	('3d9c5855-0731-4d04-90cc-43abf5248ef4', '3d9c5855-0731-4d04-90cc-43abf5248ef4', '{"sub": "3d9c5855-0731-4d04-90cc-43abf5248ef4", "email": "sumaiya@aladincomm.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:48:52.368577+00', '2024-02-04 10:48:52.368623+00', '2024-02-04 10:48:52.368623+00', '7b5c4b13-ae6d-4212-9b60-ac1a6786729b'),
	('c63da6ec-e43a-4d76-9c5d-a9c1f75d3387', 'c63da6ec-e43a-4d76-9c5d-a9c1f75d3387', '{"sub": "c63da6ec-e43a-4d76-9c5d-a9c1f75d3387", "email": "gitanjali@magiktelcom.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:50:40.895786+00', '2024-02-04 10:50:40.895838+00', '2024-02-04 10:50:40.895838+00', '4dbbf4fe-65fe-4773-8688-3dccc06d0388'),
	('334d24bb-410b-4589-9423-75b5d558466f', '334d24bb-410b-4589-9423-75b5d558466f', '{"sub": "334d24bb-410b-4589-9423-75b5d558466f", "email": "aailamughal2008@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 10:52:37.06996+00', '2024-02-04 10:52:37.070012+00', '2024-02-04 10:52:37.070012+00', 'e48970b5-bb09-401c-96dc-1b1350d627c7'),
	('592f9ba0-de12-4c1d-b077-56b1675a0e9d', '592f9ba0-de12-4c1d-b077-56b1675a0e9d', '{"sub": "592f9ba0-de12-4c1d-b077-56b1675a0e9d", "email": "aria@axistel.biz", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 11:05:05.737079+00', '2024-02-04 11:05:05.737128+00', '2024-02-04 11:05:05.737128+00', '822d479c-1b59-42b9-ae60-46b0fa3690b2'),
	('ab338984-a13c-4370-a894-d086f46bacbf', 'ab338984-a13c-4370-a894-d086f46bacbf', '{"sub": "ab338984-a13c-4370-a894-d086f46bacbf", "email": "mark@rise-sol.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 11:06:51.525498+00', '2024-02-04 11:06:51.525543+00', '2024-02-04 11:06:51.525543+00', '3fc9a0d0-12ac-40b9-99d5-7ea7da0e9840'),
	('e12a0b91-9c05-4747-af29-f247125edc07', 'e12a0b91-9c05-4747-af29-f247125edc07', '{"sub": "e12a0b91-9c05-4747-af29-f247125edc07", "email": "wavenettel@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 11:15:33.038497+00', '2024-02-04 11:15:33.038546+00', '2024-02-04 11:15:33.038546+00', 'e3e38e73-e67e-44e5-ae89-1f324cad8a1c'),
	('bde6f9dc-e9be-4f17-a0fd-5f667ca8e527', 'bde6f9dc-e9be-4f17-a0fd-5f667ca8e527', '{"sub": "bde6f9dc-e9be-4f17-a0fd-5f667ca8e527", "email": "elvish@clickonetelecom.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-04 14:45:17.475171+00', '2024-02-04 14:45:17.475223+00', '2024-02-04 14:45:17.475223+00', '1b1e1bf2-9d13-4b03-9784-af08e9f17c97'),
	('f3299cbd-6d23-44ff-8a73-d6f0c2e4af6e', 'f3299cbd-6d23-44ff-8a73-d6f0c2e4af6e', '{"sub": "f3299cbd-6d23-44ff-8a73-d6f0c2e4af6e", "email": "sales@telcoearth.co.uk", "email_verified": false, "phone_verified": false}', 'email', '2024-02-05 06:45:52.236778+00', '2024-02-05 06:45:52.236832+00', '2024-02-05 06:45:52.236832+00', '4e9eb65a-91de-473d-98a9-9e27cd32a225'),
	('b466057a-b048-484d-8479-5f2246e5b84e', 'b466057a-b048-484d-8479-5f2246e5b84e', '{"sub": "b466057a-b048-484d-8479-5f2246e5b84e", "email": "rartelecom.com@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-05 07:09:11.19022+00', '2024-02-05 07:09:11.190268+00', '2024-02-05 07:09:11.190268+00', '1c22423a-3f56-40b8-9487-1d477dddebcf'),
	('7523ee44-8435-427d-9cb0-2328f669e1f3', '7523ee44-8435-427d-9cb0-2328f669e1f3', '{"sub": "7523ee44-8435-427d-9cb0-2328f669e1f3", "email": "almteentech2@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-05 08:01:07.662032+00', '2024-02-05 08:01:07.662085+00', '2024-02-05 08:01:07.662085+00', '628c2b66-0ef4-4363-997c-a191b895c004'),
	('feeb856e-a7bd-41de-a13d-6bdc7f0d5867', 'feeb856e-a7bd-41de-a13d-6bdc7f0d5867', '{"sub": "feeb856e-a7bd-41de-a13d-6bdc7f0d5867", "email": "shazia@malaktel.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-05 09:55:40.521257+00', '2024-02-05 09:55:40.521306+00', '2024-02-05 09:55:40.521306+00', 'f052944d-737f-4fa0-974a-280d7b8f2d5c'),
	('d4c6c86d-7ffc-49aa-841f-8202ff9478a1', 'd4c6c86d-7ffc-49aa-841f-8202ff9478a1', '{"sub": "d4c6c86d-7ffc-49aa-841f-8202ff9478a1", "email": "yousuf@zonextel.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-06 06:01:45.514919+00', '2024-02-06 06:01:45.514967+00', '2024-02-06 06:01:45.514967+00', '8d4f454e-ecb4-46e6-b8f9-eabd465d0427'),
	('64efe034-fc05-4730-bc40-43d3cb7a9f81', '64efe034-fc05-4730-bc40-43d3cb7a9f81', '{"sub": "64efe034-fc05-4730-bc40-43d3cb7a9f81", "email": "anush.m@voxmaster.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-06 08:42:38.938714+00', '2024-02-06 08:42:38.938763+00', '2024-02-06 08:42:38.938763+00', '345c34f0-1657-4580-80f3-e863388cc9a4'),
	('d3b482f7-a277-4afd-9c68-a033fa733bc1', 'd3b482f7-a277-4afd-9c68-a033fa733bc1', '{"sub": "d3b482f7-a277-4afd-9c68-a033fa733bc1", "email": "ankit.rath@voiptechsolutions.in", "email_verified": false, "phone_verified": false}', 'email', '2024-02-06 11:55:18.635617+00', '2024-02-06 11:55:18.635677+00', '2024-02-06 11:55:18.635677+00', '74f0e230-0aae-445a-af50-be66a27f4d6b'),
	('c32ac86a-ff4f-4893-ac80-0c93377560c1', 'c32ac86a-ff4f-4893-ac80-0c93377560c1', '{"sub": "c32ac86a-ff4f-4893-ac80-0c93377560c1", "email": "yusuf@tapvox.net", "email_verified": false, "phone_verified": false}', 'email', '2024-02-06 12:16:57.589353+00', '2024-02-06 12:16:57.589403+00', '2024-02-06 12:16:57.589403+00', '2df4391b-98f0-433a-b7ad-c6aea23da24d'),
	('cc4bc477-a253-4969-a08e-c2d7893fc6fe', 'cc4bc477-a253-4969-a08e-c2d7893fc6fe', '{"sub": "cc4bc477-a253-4969-a08e-c2d7893fc6fe", "email": "gaurav@maximotech.co", "email_verified": false, "phone_verified": false}', 'email', '2024-02-07 11:15:48.858467+00', '2024-02-07 11:15:48.858519+00', '2024-02-07 11:15:48.858519+00', 'ff089de6-a082-4180-af7a-de076cc88102'),
	('60ea457a-1bc4-41c5-955c-a5eadfe47480', '60ea457a-1bc4-41c5-955c-a5eadfe47480', '{"sub": "60ea457a-1bc4-41c5-955c-a5eadfe47480", "email": "commercials@haimicloud.net", "email_verified": false, "phone_verified": false}', 'email', '2024-02-07 11:20:50.356114+00', '2024-02-07 11:20:50.356167+00', '2024-02-07 11:20:50.356167+00', '73c5370b-416c-4d4c-a3b2-4bff02e74ccc'),
	('dd94fd4f-9a18-496b-941e-df92c3e49a86', 'dd94fd4f-9a18-496b-941e-df92c3e49a86', '{"sub": "dd94fd4f-9a18-496b-941e-df92c3e49a86", "email": "akhurana@excelsiorbird.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-07 11:23:16.249556+00', '2024-02-07 11:23:16.24961+00', '2024-02-07 11:23:16.24961+00', '76a7136e-7a65-45e7-a82b-27b399c479f1'),
	('18730a17-293e-45ea-a7e3-08863f9d2623', '18730a17-293e-45ea-a7e3-08863f9d2623', '{"sub": "18730a17-293e-45ea-a7e3-08863f9d2623", "email": "mai1bustan.aj@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-21 04:13:08.498461+00', '2024-02-21 04:13:08.498522+00', '2024-02-21 04:13:08.498522+00', '02f79ca2-8d97-463f-b484-255394bae1dc'),
	('77423768-f3cf-44c9-b83c-f72da1cb9a0b', '77423768-f3cf-44c9-b83c-f72da1cb9a0b', '{"sub": "77423768-f3cf-44c9-b83c-f72da1cb9a0b", "email": "amanhisham345@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-21 05:41:55.228566+00', '2024-02-21 05:41:55.228613+00', '2024-02-21 05:41:55.228613+00', 'a96f8132-7247-47ac-8ed3-0bef19796663'),
	('08d9a5a3-d1ae-43ae-9ac0-0fb566b33619', '08d9a5a3-d1ae-43ae-9ac0-0fb566b33619', '{"sub": "08d9a5a3-d1ae-43ae-9ac0-0fb566b33619", "email": "pkmymoonpk@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-02-28 04:26:26.743273+00', '2024-02-28 04:26:26.743319+00', '2024-02-28 04:26:26.743319+00', '620d9b38-c0d5-4ce0-9001-fc8a1807b12e'),
	('108d34df-fb4f-483d-9fcf-b63b24fae944', '108d34df-fb4f-483d-9fcf-b63b24fae944', '{"sub": "108d34df-fb4f-483d-9fcf-b63b24fae944", "email": "animefarooqi1@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-03-08 05:25:43.549004+00', '2024-03-08 05:25:43.549061+00', '2024-03-08 05:25:43.549061+00', 'f59446ba-55cf-443a-b037-39f92945ee1e'),
	('6c68f7fe-188f-482c-8aba-abcedec9e392', '6c68f7fe-188f-482c-8aba-abcedec9e392', '{"sub": "6c68f7fe-188f-482c-8aba-abcedec9e392", "name": "Aaa", "role": "client", "email": "shahal.vc13@gmail.com", "phone": "9567729413", "agent_id": "", "skype_id": "anush.m@voxmaster.com", "company_name": "Nahal", "email_verified": false, "noc_department": {}, "phone_verified": false, "sales_department": {}, "finance_department": {}}', 'email', '2024-04-14 14:32:09.175442+00', '2024-04-14 14:32:09.175499+00', '2024-04-14 14:32:09.175499+00', 'f930dbb2-e155-44e1-b332-56e6e39854b1'),
	('0c147006-6370-4cb6-b3c8-2edfb59ab302', '0c147006-6370-4cb6-b3c8-2edfb59ab302', '{"sub": "0c147006-6370-4cb6-b3c8-2edfb59ab302", "email": "ameenahsanav76@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-03-08 22:21:48.797694+00', '2024-03-08 22:21:48.79774+00', '2024-03-08 22:21:48.79774+00', '976a9e8f-ad7d-4fbf-8d72-301b39636fa0');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: agents; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: config; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."config" ("id", "created_at", "details", "type") VALUES
	(8, '2023-11-20 05:08:44.950528+00', '{"ip": "23.106.253.237", "cookie": "laravel_session=eyJpdiI6InJleStTN2hrOWxZQkJsUlRadUJObFE9PSIsInZhbHVlIjoiaitOc2xHU3JcL1VtbkZSNFwvODZ1cjFZNktlRjlCNlFpUGxOeUxBYURFTTNQUUNvNUpXcU50VlE4ekVwbjhDd2J5Q3pVXC91d3NzVEJZV1N3VzVPQWZ4OXc9PSIsIm1hYyI6ImM2ZGRlNmMwZjA4MGNiN2JiNmJkYTk1MjEyZjkxNmU4NGU4MjFjMTUwZThiMmY3OWI1MGU1MGJkYWE2NjAxNWMifQ%3D%3D", "password": "salafi#123#", "username": "VOS"}', 'vos'),
	(14, '2023-12-11 09:40:09.571391+00', '{"IFSCCode": "SBIN007", "bankName": "sbi", "branchName": "areekode", "accountNumber": "0928231", "accountHolderName": "aman"}', 'bank');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "name", "company_name", "email", "phone", "skype_id", "role", "finance_department", "noc_department", "sales_department", "payment_method", "agent_id", "vos_vendor_id", "vos_client_id", "balance", "over_draft", "departments") VALUES
	('55c51783-5a10-457e-8812-79f4f1dea314', 'NOOR', 'NICE TALK', 'noor@nicetalk.biz', '+447441440544', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('c63da6ec-e43a-4d76-9c5d-a9c1f75d3387', 'MAGIK', 'MAGIC VOICE', 'gitanjali@magiktelcom.com', '+919999007034', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '-2.13', '0', NULL),
	('f3299cbd-6d23-44ff-8a73-d6f0c2e4af6e', 'TELCO', 'TELCO EARTH', 'sales@telcoearth.co.uk', '+918299830068', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('108d34df-fb4f-483d-9fcf-b63b24fae944', 'Aarif', 'Server fix ', 'animefarooqi1@gmail.com', '06284957785', '', 'client', '{}', '{}', '{}', NULL, '', '', '', '0', '0', NULL),
	('6adf7496-fdd2-451f-bc9b-ff387ae1ce6c', 'ENIGMA', 'ENIGMA', 'sales@enigmaimcorp.in', '+17862336377', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('d3b482f7-a277-4afd-9c68-a033fa733bc1', 'Ankit', 'Voip tech', 'Ankit.rath@voiptechsolutions.in', '00917358737843', 'Ankit.rath', 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('07028b03-b0cc-4243-99f0-5d3decb0d971', 'FIAMANILLAH', 'FIAMANILLAH', 'noc@fiamanillah.com', '+447418349162', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('17f325f0-6311-4842-b3a9-b7311067d59a', 'NOWSHAD SUBAIR', 'GLOBAL VOIP', 'nowshad@globalvoip.ca', '+971554405442', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('a9521b61-52ff-434e-9912-b1d158010cdb', 'AL RAHEEM', 'AL RAHEEM TECHNOLOGY', 'annie.sales@alraheemtechnologiesltd.com', '+923246601194', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('c32ac86a-ff4f-4893-ac80-0c93377560c1', 'Yousuf', 'Tapvox', 'Yusuf@tapvox.net', '+15642123295', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('a03d3373-401f-4699-a8ea-73d86a7a3d40', 'FAHAD', 'SYNC SOUND', 'jigz@sync-sound.com', '+971586327792', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('3820c7f3-09ae-4b7f-a1ac-e54dc0cfa3f8', 'SHABBIR', 'VOXPACE', 'shabbir@voxpace.com', '+971552400345', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('60ea457a-1bc4-41c5-955c-a5eadfe47480', 'Sagar', 'Hcc', 'commercials@haimicloud.net', '9650127433', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '2', NULL),
	('3d9c5855-0731-4d04-90cc-43abf5248ef4', 'ALADIN', 'ALADIN COMMUNICATION', 'sumaiya@aladincomm.com', '+12136410047', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('334d24bb-410b-4589-9423-75b5d558466f', 'ARIES', 'ARIES', 'aailamughal2008@gmail.com', '+12342559692', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('7523ee44-8435-427d-9cb0-2328f669e1f3', 'AL MATEEN', 'AL MATEEN TECH', 'almteentech2@gmail.com', '+15513077461', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('592f9ba0-de12-4c1d-b077-56b1675a0e9d', 'ARIA', 'AXISTEL', 'aria@axistel.biz', '+989123729079', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('ab338984-a13c-4370-a894-d086f46bacbf', 'RISE', 'RISE SOLUTION', 'Mark@rise-sol.com', '+447868497028', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('6c68f7fe-188f-482c-8aba-abcedec9e392', 'Aaa', 'Nahal', 'shahal.vc13@gmail.com', '9567729413', 'anush.m@voxmaster.com', 'client', '{}', '{}', '{}', NULL, '', '', '', '0', '0', NULL),
	('18730a17-293e-45ea-a7e3-08863f9d2623', 'Mohammed N', NULL, 'mai1bustan.aj@gmail.com', '00971567469166', NULL, 'agent', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('77423768-f3cf-44c9-b83c-f72da1cb9a0b', 'Aman', 'Lcr', 'amanhisham345@gmail.com', '9778258846', 'J', 'client', '{}', '{}', '{}', NULL, '', '', '', '0', '100', NULL),
	('bde6f9dc-e9be-4f17-a0fd-5f667ca8e527', 'ELVISH', 'CLICK ONE TELECOM', 'elvish@clickonetelecom.com', '+447441440447', NULL, 'client', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('cc4bc477-a253-4969-a08e-c2d7893fc6fe', 'Gaurav', 'Maximo tech', 'gaurav@maximotech.co', '9560856095', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('feeb856e-a7bd-41de-a13d-6bdc7f0d5867', 'SHAZIA', 'MALAKTEL', 'shazia@malaktel.com', '+923002661123', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('b466057a-b048-484d-8479-5f2246e5b84e', 'MD NAZMUL HOSSAIN', 'RAR TELECOM', 'rartelecom.com@gmail.com', '01813794274', 'vpn4voice_net', 'client', '{}', '{}', '{}', NULL, '', '', '', '0', '0', NULL),
	('c05cd20c-1764-4735-9363-2abfaf26f58d', 'SHAHAL', 'D2CALL', 'noc@d2call.com', '+13024262298', 'd2call.noc', 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('d4c6c86d-7ffc-49aa-841f-8202ff9478a1', 'Muhammad Yousuf', 'ZonexTel Limited', 'yousuf@zonextel.com', '+971564849631', 'muhammadyousuf89', 'client', '{}', '{}', '{}', NULL, '', '', '', '0', '0', NULL),
	('dd94fd4f-9a18-496b-941e-df92c3e49a86', 'Abhishek', 'Excelsior bird', 'akhurana@excelsiorbird.com', '+919971430370', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('64efe034-fc05-4730-bc40-43d3cb7a9f81', 'Anush', 'vox master', 'anush.m@voxmaster.com', '+37443881919', 'anush.m@voxmaster.com', 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '0', '0', NULL),
	('f44035f8-16dc-4ce0-9c41-7dbba15402a1', 'NEXT TECH', 'NEXT TECH', 'sales@nexttechltd.net', '+15103702526', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '-1238.79', '2000', NULL),
	('e12a0b91-9c05-4747-af29-f247125edc07', 'WAVENET', 'WAVENET TEL', 'wavenettel@gmail.com', '+12027736948', NULL, 'vendor', '{}', '{}', '{}', NULL, NULL, '', '', '-13.45', '100', NULL),
	('08d9a5a3-d1ae-43ae-9ac0-0fb566b33619', 'Mymoon Muhammed PK', 'PKM', 'pkmymoonpk@gmail.com', '9539941964', '', 'vendor', '{}', '{}', '{}', NULL, '', '', '', '0', '0', NULL),
	('63f8e39e-edee-4884-b7af-c772cea5fcbf', 'LCRTel', 'LCRTel', 'lcrtelweb@gmail.com', '9539941964', '', 'admin', NULL, NULL, NULL, NULL, '', NULL, NULL, '0', '0', NULL),
	('0c147006-6370-4cb6-b3c8-2edfb59ab302', 'Ameen ', 'Ahsan', 'ameenahsanav76@gmail.com', '978811', 'Ikd', 'client', '{}', '{}', '{}', NULL, '', '', '', '0', '0', NULL);


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."routes" ("id", "vendor_id", "destination", "rate", "route_type", "asr", "acd", "ports", "capacity", "verification", "verification_by", "verified_at", "created_at", "updated_at", "destination_code", "pdd", "selling_rate") VALUES
	('3ebfd501-ccf8-455a-9752-35baa4047e57', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:47.253+00', NULL, '9230', '0', '0.01440'),
	('6165acbf-5a34-4219-8ebb-62f8fc9fa898', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:47.253+00', NULL, '9231', '0', '0.01080'),
	('81afb224-9e52-46f1-8494-b257a5d4a361', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:47.253+00', NULL, '9232', '0', '0.01440'),
	('5d4cb58d-bfe3-4102-9de0-9d0154e128ed', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:47.253+00', NULL, '9233', '0', '0.01320'),
	('a9d3b1f6-91f8-451c-92e3-a0053d8c36b9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:47.253+00', NULL, '9234', '0', '0.02880'),
	('ba00a563-c766-44ba-958c-c3a3a71f5958', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'india', '0.1', 'cli', '30', '12', '14', '100', 'pending', NULL, NULL, '2024-03-08 22:28:45.653+00', NULL, '91', '16', '0.12000'),
	('fccaf930-22f1-45b3-a148-a7dfa2c82bea', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'india', '0.1', 'cli', '30', '12', '14', '100', 'pending', NULL, NULL, '2024-03-08 22:28:46.637+00', NULL, '91', '16', '0.12000'),
	('a462b121-8812-4f55-a22d-c1d378cf2c19', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'india', '0.1', 'cli', '30', '12', '14', '100', 'pending', NULL, NULL, '2024-03-08 22:28:47.464+00', NULL, '91', '16', '0.12000'),
	('0a4a75cc-45f0-4345-996f-08c2ab151fd4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:13:50.831+00', NULL, '9230', '0', '0.01440'),
	('a1b21e22-65d2-445f-abd7-39f879b14fa0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:13:50.831+00', NULL, '9231', '0', '0.01080'),
	('21e18067-f562-46e0-a876-d7497096ad84', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:13:50.831+00', NULL, '9232', '0', '0.01440'),
	('eacc650c-084e-45a4-bfd7-da44c25f11cd', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:13:50.831+00', NULL, '9233', '0', '0.01320'),
	('70f9748a-5163-4e0e-a198-356de4428273', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:13:50.831+00', NULL, '9234', '0', '0.02880'),
	('c8c87177-5035-4c7b-9700-baa96b68f2f3', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:13:51.923+00', NULL, '9230', '0', '0.01440'),
	('d546364e-180c-41ef-b367-09180bf1befb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:13:51.923+00', NULL, '9231', '0', '0.01080'),
	('9c5c6f87-dc32-47de-bdae-6b986c7d342f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:13:51.923+00', NULL, '9232', '0', '0.01440'),
	('515af728-6e11-4fe5-8cd2-19267b1fe20b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:13:51.923+00', NULL, '9233', '0', '0.01320'),
	('48dd662c-2c37-415a-b749-00f33314790f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:13:51.923+00', NULL, '9234', '0', '0.02880'),
	('94593167-afd2-42fd-9e18-00d47b535487', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:13:52.876+00', NULL, '9230', '0', '0.01440'),
	('388fc9b5-4bb3-43ff-ba69-8407ba10f44a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:13:52.876+00', NULL, '9231', '0', '0.01080'),
	('13ce0fc5-512e-42c3-8d9c-0e6bc739484d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:13:52.876+00', NULL, '9232', '0', '0.01440'),
	('77d18437-70bc-441e-8f89-3c471d27facf', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:13:52.876+00', NULL, '9233', '0', '0.01320'),
	('49da5bc0-05ef-4bf1-aa50-c5dd533c21b5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:13:52.876+00', NULL, '9234', '0', '0.02880'),
	('e31d1a49-3741-445d-843c-e2a7ad51ff07', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:39.403+00', NULL, '9230', '0', '0.01440'),
	('a6c5a7f8-2971-4bc7-9fb8-78ae692dd2db', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:39.403+00', NULL, '9231', '0', '0.01080'),
	('935720ab-d299-42c9-80ca-d8332196cb8f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:39.403+00', NULL, '9232', '0', '0.01440'),
	('0dd81f0f-fa72-4a86-9812-61af58b32d35', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:39.403+00', NULL, '9233', '0', '0.01320'),
	('d5d6791a-17b5-4ea3-aef4-83205d9a496b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:39.403+00', NULL, '9234', '0', '0.02880'),
	('b4f59fdd-1804-42c0-917b-fe515566eb59', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:40.459+00', NULL, '9230', '0', '0.01440'),
	('6f8324e9-905d-44f3-9421-7a4455cdb6d8', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:40.459+00', NULL, '9231', '0', '0.01080'),
	('d3cbfcae-ab38-4fca-a497-e6168808427e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:40.459+00', NULL, '9232', '0', '0.01440'),
	('45a67908-e89f-43ab-808d-7ef214f77bd6', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:40.459+00', NULL, '9233', '0', '0.01320'),
	('e6a7e1a6-7542-49d0-a02c-67e96b4175fe', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:40.459+00', NULL, '9234', '0', '0.02880'),
	('6f5d54fc-f3a7-441f-98d9-198b5c010abb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:41.975+00', NULL, '9230', '0', '0.01440'),
	('d3da22e8-3bb1-46ad-a082-a0dc48de875a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:41.975+00', NULL, '9231', '0', '0.01080'),
	('c5e11bca-2b2b-4028-83dd-0f01fde25ab1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:41.975+00', NULL, '9232', '0', '0.01440'),
	('c959c651-52b0-484b-91a9-81dc5dea225e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:41.975+00', NULL, '9233', '0', '0.01320'),
	('0ac9b514-9385-440a-9938-3e68ed331406', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:41.975+00', NULL, '9234', '0', '0.02880'),
	('1667b91f-442b-44da-8c19-14136a307399', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:42.801+00', NULL, '9230', '0', '0.01440'),
	('39c54e8d-8862-448f-8a1b-c5377aa44b6c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:42.801+00', NULL, '9231', '0', '0.01080'),
	('f232fd0b-a8cb-4e89-8a63-6b298f8b168d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:42.801+00', NULL, '9232', '0', '0.01440'),
	('3d528e3b-894a-4a22-864f-8141c2b2b73e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:42.801+00', NULL, '9233', '0', '0.01320'),
	('578af341-50a3-4c8f-aef9-c1aa9e88e27f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:42.801+00', NULL, '9234', '0', '0.02880'),
	('09739e03-ba6b-4b4c-a8f9-9a051622df15', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:50.173+00', NULL, '9230', '0', '0.01440'),
	('d848c2b0-5f53-470c-b6e2-314994c66e53', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:50.174+00', NULL, '9231', '0', '0.01080'),
	('7bdda18c-40af-4447-85f0-7e77f530073a', 'b466057a-b048-484d-8479-5f2246e5b84e', 'Mayanmar Non Cli', '0.013', 'non-cli', '20', '165', '30', '30', 'pending', NULL, NULL, '2024-02-05 07:12:27.423728+00', NULL, '9596', '1', '0.01560'),
	('5fac3b2c-0e42-4714-957b-f3a5eec91ba4', 'b466057a-b048-484d-8479-5f2246e5b84e', 'BD NON CLI', '0.0086', 'non-cli', '25', '180', '30', '30', 'pending', NULL, NULL, '2024-02-05 07:13:03.393631+00', NULL, '01', '1', '0.01032'),
	('dcc0f5a8-1d44-462e-ade6-1c1260abfd53', 'b466057a-b048-484d-8479-5f2246e5b84e', 'India airtel tdm', '0.0042', 'tdm', '30', '240', '100', '100', 'pending', NULL, NULL, '2024-02-05 07:14:41.077914+00', NULL, '91', '1', '0.00504'),
	('664ed175-58cf-4f08-aca9-85d3e8cbfbb1', 'c05cd20c-1764-4735-9363-2abfaf26f58d', 'Bd ncli', '0.0089', 'non-cli', '25', '3', '50', '100', 'verified', NULL, NULL, '2024-02-07 08:04:28.81959+00', '2024-02-09 07:15:28.296+00', '8801', '0', '0.01068'),
	('ff40b46f-f08d-4fbc-bcdb-adffa9c9ec9a', '3820c7f3-09ae-4b7f-a1ac-e54dc0cfa3f8', 'United states', '0.038', 'cli', '20', '30', '500', '5000', 'verified', NULL, NULL, '2024-02-07 08:34:21.92427+00', '2024-02-09 07:21:52.705+00', '1', '0', '0.04560'),
	('cbde5284-1a26-40eb-83d8-7fcb7c4bc15f', 'c05cd20c-1764-4735-9363-2abfaf26f58d', 'Bangladesh', '0.0093', 'cli', '25', '4', '100', '300', 'verified', NULL, NULL, '2024-02-09 07:26:11.406063+00', '2024-02-09 07:29:06.609+00', '8801', '0', '0.0093'),
	('e830a1f1-2cd6-4829-9886-c7f0eead254d', 'c05cd20c-1764-4735-9363-2abfaf26f58d', 'INDIA', '0.0080', 'pri', '35', '4', '30', '100', 'verified', NULL, NULL, '2024-02-09 07:27:20.817374+00', '2024-02-09 07:29:37.982+00', '91', '0', '0.0080'),
	('e25d2454-5aad-4447-9810-8b2a80411b20', 'c05cd20c-1764-4735-9363-2abfaf26f58d', 'UNITED STATES', '0.038', 'cc', '30', '60', '200', '2000', 'verified', NULL, NULL, '2024-02-09 07:28:16.477185+00', '2024-02-09 07:29:56.83+00', '1', '0', '0.04560'),
	('c1bc01ba-f687-4932-a2fc-0ca490859fbc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:43.698+00', NULL, '9230', '0', '0.01440'),
	('94a6a161-727a-4385-b6c4-e5ecf5e363fb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:43.698+00', NULL, '9231', '0', '0.01080'),
	('9255cb66-ef56-40cd-92bc-a7361616db10', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:43.698+00', NULL, '9232', '0', '0.01440'),
	('330f4712-d7d3-4f56-a4e0-6c6f2f1f3669', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:43.698+00', NULL, '9233', '0', '0.01320'),
	('4ff41274-bdae-4975-b285-72f08af316b3', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:43.698+00', NULL, '9234', '0', '0.02880'),
	('a96e304c-5035-4ac4-bbc5-82dbbcc4b07b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:45.376+00', NULL, '9230', '0', '0.01440'),
	('d7f1c360-9fe6-4c6a-852a-6846809fe33f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:45.376+00', NULL, '9231', '0', '0.01080'),
	('c475aabb-de3f-417f-8c0d-f81fe51bb855', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:45.376+00', NULL, '9232', '0', '0.01440'),
	('c55e29d9-92e2-4254-bade-4cb40df133fd', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:45.376+00', NULL, '9233', '0', '0.01320'),
	('31cf4c7f-6a75-4f4b-843c-693b079b9ef5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:45.376+00', NULL, '9234', '0', '0.02880'),
	('9ac68fd2-6ea5-4919-b416-922df3f02e5f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:48.667+00', NULL, '9230', '0', '0.01440'),
	('212a08da-9a77-4d7d-83c2-1c4708ba13c4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:48.667+00', NULL, '9231', '0', '0.01080'),
	('1a5cf092-9207-463d-810f-de38fd7ae957', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:48.667+00', NULL, '9232', '0', '0.01440'),
	('ada84549-3e25-4146-b3d5-63b0713260dd', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:48.667+00', NULL, '9233', '0', '0.01320'),
	('d09759fc-0203-418e-8276-7ed307c8d66a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:48.667+00', NULL, '9234', '0', '0.02880'),
	('ffa7f132-bac1-4074-a69c-8251ba180525', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:49.499+00', NULL, '9230', '0', '0.01440'),
	('bd41fbf5-a2a5-4000-aaeb-8cbbaecbac8e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:49.499+00', NULL, '9231', '0', '0.01080'),
	('a6a3335d-caa9-446d-9c9e-a9a6340b5183', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:49.499+00', NULL, '9232', '0', '0.01440'),
	('73e549e0-4e87-4126-9b58-fef4f85e65bb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:49.499+00', NULL, '9233', '0', '0.01320'),
	('15d30e87-4526-491c-b0c0-939a3a4f5709', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:49.499+00', NULL, '9234', '0', '0.02880'),
	('263d41cc-7931-4f79-8543-a7e303398d12', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:53.061+00', NULL, '9230', '0', '0.01440'),
	('2bba1e31-9e33-463c-955b-b1a773d9b0e1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:53.061+00', NULL, '9231', '0', '0.01080'),
	('c98ab378-5bb8-4d2d-b636-9a0b0b960371', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:53.061+00', NULL, '9232', '0', '0.01440'),
	('177e5dcf-204d-4e80-8831-dbc7e8dc4169', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:53.061+00', NULL, '9233', '0', '0.01320'),
	('35e0861f-265f-4005-b706-c7fc6574e7f9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:53.061+00', NULL, '9234', '0', '0.02880'),
	('3ffc0933-2a82-4112-ae37-83889d6881fc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:54.769+00', NULL, '9230', '0', '0.01440'),
	('0ce259bc-480f-4034-bb54-2820fc845692', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:54.769+00', NULL, '9231', '0', '0.01080'),
	('59145c8c-1efe-436c-8e4c-117c6589caa1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:54.769+00', NULL, '9232', '0', '0.01440'),
	('f480c485-77e4-404d-ab4c-d16ee7a22350', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:54.769+00', NULL, '9233', '0', '0.01320'),
	('cc15ce60-fa8d-4380-848a-98b95fc3cff9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:54.769+00', NULL, '9234', '0', '0.02880'),
	('48d6ba2a-0dad-4cfa-b8f9-49fe581b892f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:00.108+00', NULL, '9230', '0', '0.01440'),
	('543ea810-b9d7-4cb0-b3b6-6813cc8492a1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:00.108+00', NULL, '9231', '0', '0.01080'),
	('949f234a-1f96-48ef-90d5-3f9b9faf01b8', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:00.108+00', NULL, '9232', '0', '0.01440'),
	('56e35625-59c6-4f86-8a0a-bd58b7ed7663', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:00.108+00', NULL, '9233', '0', '0.01320'),
	('748ab43d-463e-4dbb-a91a-a50466c57fcc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:00.108+00', NULL, '9234', '0', '0.02880'),
	('67068ca4-b64a-41d8-90e7-33c83de75281', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:01.274+00', NULL, '9230', '0', '0.01440'),
	('d5ce19c3-b249-41eb-b2b8-c83ade8e0dd4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:01.274+00', NULL, '9231', '0', '0.01080'),
	('d004857e-43ba-4186-81bf-013513b3daa2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:01.274+00', NULL, '9232', '0', '0.01440'),
	('e139b9f7-9750-4d72-967f-526db7f1ee8b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:01.274+00', NULL, '9233', '0', '0.01320'),
	('64a66fd0-3d70-402b-bf30-cc37e011552c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:01.274+00', NULL, '9234', '0', '0.02880'),
	('02e9173b-f363-4e77-9c40-0b62dc0d6d20', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:03.551+00', NULL, '9230', '0', '0.01440'),
	('1cbce9ed-5d66-45b8-a11d-9c74565d9a0c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:03.551+00', NULL, '9231', '0', '0.01080'),
	('763426d1-7e61-4df0-b377-071bed9b5d34', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:03.551+00', NULL, '9232', '0', '0.01440'),
	('33a1ccc3-ad90-4ff9-9346-17510754fc72', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:03.551+00', NULL, '9233', '0', '0.01320'),
	('0ad5b233-7604-49ce-8159-4a0fbaf05020', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:03.551+00', NULL, '9234', '0', '0.02880'),
	('ce8b1f59-5721-4ba5-bdcc-8bc647259ff4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:05.084+00', NULL, '9230', '0', '0.01440'),
	('47c972b6-2fa5-46a7-8891-89c286919a6c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:05.084+00', NULL, '9231', '0', '0.01080'),
	('5926558c-e413-4d85-bef7-db6820d8c158', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:05.084+00', NULL, '9232', '0', '0.01440'),
	('f6fe02dd-4f10-4794-afef-67891a73d7ca', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:05.084+00', NULL, '9233', '0', '0.01320'),
	('95807b31-acb6-46f3-b991-e711868b8721', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:05.084+00', NULL, '9234', '0', '0.02880'),
	('5fee768d-89b1-482f-b157-11faf45cb2e9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:05.643+00', NULL, '9230', '0', '0.01440'),
	('a7509911-23bc-4f36-8557-eee99af8da06', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:05.643+00', NULL, '9231', '0', '0.01080'),
	('e5469cae-555f-4601-b57e-f1a4475a0cc2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:05.643+00', NULL, '9232', '0', '0.01440'),
	('ced52292-ab20-48c3-a762-b705f8b57939', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:05.643+00', NULL, '9233', '0', '0.01320'),
	('7937c3b3-0791-4d44-89c9-5cf48a1f4493', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:05.643+00', NULL, '9234', '0', '0.02880'),
	('33d71000-e868-48f9-9d56-33470f7cdf5d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:50.174+00', NULL, '9232', '0', '0.01440'),
	('1d0d2ab6-3cf6-4da7-8a5e-e2a474195fbd', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:50.174+00', NULL, '9233', '0', '0.01320'),
	('0eb11506-f969-43b1-814b-1a097a0f6422', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:50.174+00', NULL, '9234', '0', '0.02880'),
	('456cd363-68c5-4ce0-9299-229b527fbd07', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:50.879+00', NULL, '9230', '0', '0.01440'),
	('7956e2cf-6490-4525-9e31-014aeb9e3311', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:50.879+00', NULL, '9231', '0', '0.01080'),
	('fabe25cd-0a8b-4da3-8b7c-9bee9bb7df17', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:50.879+00', NULL, '9232', '0', '0.01440'),
	('9d0847bc-7d82-461e-bcf8-19382dfdd67d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:50.879+00', NULL, '9233', '0', '0.01320'),
	('96472381-971a-4bef-ae8f-f83a09feb10c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:50.879+00', NULL, '9234', '0', '0.02880'),
	('88c46f74-11ae-4bc1-a521-dea1edad66b6', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:53.465+00', NULL, '9230', '0', '0.01440'),
	('65772134-ee1a-4552-9257-6dea8f1800d9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:53.465+00', NULL, '9231', '0', '0.01080'),
	('042317dc-cc16-45cc-88ad-c33c96de30a2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:53.465+00', NULL, '9232', '0', '0.01440'),
	('068ebe0c-0b09-4658-aa2d-ab5a5bedd067', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:53.465+00', NULL, '9233', '0', '0.01320'),
	('39c8756b-c665-46b7-b25e-ff328fe5854c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:53.465+00', NULL, '9234', '0', '0.02880'),
	('d4dd4404-70d8-4b02-a57b-a5481f62ec45', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:56.539+00', NULL, '9230', '0', '0.01440'),
	('7fa145b0-4a74-4d2a-95c1-28916b1793f9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:56.539+00', NULL, '9231', '0', '0.01080'),
	('ef7eb0c9-08f9-4790-8bef-6032384a5bd8', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:56.539+00', NULL, '9232', '0', '0.01440'),
	('2b32224a-49ea-48e8-8029-ca076c46bfb6', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:56.539+00', NULL, '9233', '0', '0.01320'),
	('1ebc51d1-b267-49fc-bf6c-bdd12d2c870d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:56.539+00', NULL, '9234', '0', '0.02880'),
	('265f63ef-a930-42bf-b912-61340b116e82', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:58.219+00', NULL, '9230', '0', '0.01440'),
	('453e5d49-91dd-463a-a307-583a14b8cf1c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:58.219+00', NULL, '9231', '0', '0.01080'),
	('c0322a1f-1a9f-4bb2-994d-7ba8a674ec26', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:58.219+00', NULL, '9232', '0', '0.01440'),
	('94383d3f-c022-44b2-84c2-f4e88330c41f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:58.219+00', NULL, '9233', '0', '0.01320'),
	('2691608e-bfcc-44f6-9ef3-187ce3643261', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:58.219+00', NULL, '9234', '0', '0.02880'),
	('0fd3c11d-6cae-4d7d-83f5-bb30d8325438', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:26:59.516+00', NULL, '9230', '0', '0.01440'),
	('f9a518e4-f3a3-4099-8549-4abbb922373a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:26:59.516+00', NULL, '9231', '0', '0.01080'),
	('65e93a88-11a7-432d-befe-8be44b0f6072', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:26:59.516+00', NULL, '9232', '0', '0.01440'),
	('03c91d71-bb64-4198-97ce-cbb4d1c3f567', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:26:59.516+00', NULL, '9233', '0', '0.01320'),
	('ab4eae74-c12f-457a-aaf2-27122366ac06', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:26:59.516+00', NULL, '9234', '0', '0.02880'),
	('b22f4488-bc62-40c9-8f56-3ef368cb600d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:02.678+00', NULL, '9230', '0', '0.01440'),
	('8bfe2a02-5e5e-4644-9ec9-6607a0f40020', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:02.678+00', NULL, '9231', '0', '0.01080'),
	('05c5ea58-ef8e-4e50-b9e0-9c9fe58e75ce', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:02.678+00', NULL, '9232', '0', '0.01440'),
	('38d0d8d2-00be-4884-9096-e6062913b492', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:02.678+00', NULL, '9233', '0', '0.01320'),
	('98563a36-c6c2-4560-a947-528310826150', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:02.678+00', NULL, '9234', '0', '0.02880'),
	('21466f9d-bdf1-4df9-8a98-b22d3bda4024', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:11.383+00', NULL, '9230', '0', '0.01440'),
	('feb59fd7-cf5b-49cc-b51b-90be26ac8793', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:11.383+00', NULL, '9231', '0', '0.01080'),
	('7e1e2147-fabd-421c-b43e-4a1e7de32241', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:11.383+00', NULL, '9232', '0', '0.01440'),
	('753b55a3-1344-4201-8b08-dff9e67991e1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:11.383+00', NULL, '9233', '0', '0.01320'),
	('fa4d6ef5-4f07-41c6-a715-873b63eda1bf', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:11.383+00', NULL, '9234', '0', '0.02880'),
	('7e3b3994-1a5b-47a6-bdf4-338b164bae4c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:12.958+00', NULL, '9230', '0', '0.01440'),
	('f77770ee-2483-4168-8d93-7aa21ed21989', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:12.958+00', NULL, '9231', '0', '0.01080'),
	('710f7d85-ec0c-47c9-8de0-22897d8f0502', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:12.958+00', NULL, '9232', '0', '0.01440'),
	('35fe70f6-59d1-479e-bc15-22e68c26bbc7', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:12.958+00', NULL, '9233', '0', '0.01320'),
	('fe67b01d-cfe5-4d82-848e-87fafb7f1f95', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:12.958+00', NULL, '9234', '0', '0.02880'),
	('8f675fe7-4e40-4c15-9b0d-f0e6d012ebf0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:15.716+00', NULL, '9230', '0', '0.01440'),
	('4ce8f0a4-445d-4287-beb1-02f112057034', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:15.716+00', NULL, '9231', '0', '0.01080'),
	('e571de29-cdf0-41b1-b65a-988b2a2fd88d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:15.716+00', NULL, '9232', '0', '0.01440'),
	('29645b7b-46ca-4149-8559-ec3497b9c25e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:15.716+00', NULL, '9233', '0', '0.01320'),
	('2c929bb9-5b9b-431c-892c-2f70bfee6b87', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:15.716+00', NULL, '9234', '0', '0.02880'),
	('24d07bdd-9503-4a48-9808-3697750e50f2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:18.972+00', NULL, '9230', '0', '0.01440'),
	('dec86eaa-e463-4b21-87e3-4af7155a9a40', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:18.972+00', NULL, '9231', '0', '0.01080'),
	('5ab39332-3e0d-44d9-9ef9-b5b19f3581d5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:18.972+00', NULL, '9232', '0', '0.01440'),
	('7e3ad6df-1d9b-43bb-9760-9ec5c1a5a291', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:18.972+00', NULL, '9233', '0', '0.01320'),
	('6cb6f8e3-6aac-4fbf-971e-f60e34f766e3', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:18.972+00', NULL, '9234', '0', '0.02880'),
	('5f6f2171-8f0c-41e6-bdd9-d70bf121336a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:22.509+00', NULL, '9230', '0', '0.01440'),
	('5ca3b953-f4cc-41b3-93b3-2671d31c382e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:22.509+00', NULL, '9231', '0', '0.01080'),
	('a10f13a8-c537-419e-b23e-c22be3b7fd1a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:06.647+00', NULL, '9230', '0', '0.01440'),
	('e80af8b8-7489-4c93-9700-1271ae186ae0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:06.647+00', NULL, '9231', '0', '0.01080'),
	('fcb0accc-c3a0-4c76-90f5-2ed5682ed792', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:06.647+00', NULL, '9232', '0', '0.01440'),
	('4e113add-b61f-423a-9c61-91852a82c5f6', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:06.647+00', NULL, '9233', '0', '0.01320'),
	('eec1858a-c342-4f70-a06c-40067ef9f9fe', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:06.647+00', NULL, '9234', '0', '0.02880'),
	('4834fb6f-2435-47ba-8784-7cd281625ad9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:08.989+00', NULL, '9230', '0', '0.01440'),
	('1ef6222b-860d-416a-a402-65be81a904e4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:08.989+00', NULL, '9231', '0', '0.01080'),
	('c58d6a60-8803-4ba5-a6b9-3601b86ec237', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:08.989+00', NULL, '9232', '0', '0.01440'),
	('5f82ed6b-e3be-4a47-983d-63fd8d922059', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:08.989+00', NULL, '9233', '0', '0.01320'),
	('7b8edb8c-e7b7-4930-a4ff-2ca1c1a3fa75', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:08.989+00', NULL, '9234', '0', '0.02880'),
	('d43a83db-bace-490a-9ac4-415c61d12b04', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:10.532+00', NULL, '9230', '0', '0.01440'),
	('94a225af-939f-452d-9e43-fd99e8453d0e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:10.532+00', NULL, '9231', '0', '0.01080'),
	('52b4c514-765e-4066-831d-a799e9c937f7', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:10.532+00', NULL, '9232', '0', '0.01440'),
	('35a5bdb4-0fd3-4483-abde-363b58f8a681', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:10.532+00', NULL, '9233', '0', '0.01320'),
	('6521f91a-f4d0-477a-8370-9882f40498fa', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:10.532+00', NULL, '9234', '0', '0.02880'),
	('be6a3a33-bb85-4bed-9ae8-e78f3e505a2c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:14.295+00', NULL, '9230', '0', '0.01440'),
	('b7cfbd65-adfe-4fe2-9337-b8a91dfae36e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:14.295+00', NULL, '9231', '0', '0.01080'),
	('bddc23d8-43f8-400a-b287-300868b61525', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:14.295+00', NULL, '9232', '0', '0.01440'),
	('4ac2072a-83c1-4873-86f8-e8f350a3f9cc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:14.295+00', NULL, '9233', '0', '0.01320'),
	('a3c701df-e281-46af-bdd3-0666657f10f2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:14.295+00', NULL, '9234', '0', '0.02880'),
	('f80e3984-04bd-4e99-afa7-904df0e27a07', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:15.162+00', NULL, '9230', '0', '0.01440'),
	('0fbfdad8-910b-4306-a6d7-a1e55f5c274d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:15.162+00', NULL, '9231', '0', '0.01080'),
	('c8d45d52-8d5f-47fb-b6ec-ba9f32bdf8a0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:15.162+00', NULL, '9232', '0', '0.01440'),
	('1eb447a1-ce87-40dc-8962-416a5ac46d8a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:15.162+00', NULL, '9233', '0', '0.01320'),
	('8ac67f3d-110b-4788-a894-940dd73d7776', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:15.162+00', NULL, '9234', '0', '0.02880'),
	('f478d191-2911-475f-9840-f73fbb3f071a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:17.046+00', NULL, '9230', '0', '0.01440'),
	('b5e0e6bc-3bf7-4dbf-8365-cbe5873d356a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:17.046+00', NULL, '9231', '0', '0.01080'),
	('a0322085-78d6-48b2-bee4-c0964dddeaf5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:17.046+00', NULL, '9232', '0', '0.01440'),
	('fe9ba2cd-faea-4add-bd0e-078b6e514026', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:17.046+00', NULL, '9233', '0', '0.01320'),
	('82abe73d-f157-44ed-8f9e-2779462b9bf5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:17.046+00', NULL, '9234', '0', '0.02880'),
	('e6ee8857-f86d-4300-9bb5-3a6fb9c8bd82', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:18.163+00', NULL, '9230', '0', '0.01440'),
	('53c1c0fb-b2ac-4250-ad9b-c9073779bcf7', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:18.163+00', NULL, '9231', '0', '0.01080'),
	('3191aadd-584e-4566-94db-4b215559f2dc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:18.163+00', NULL, '9232', '0', '0.01440'),
	('f8330a08-332f-458f-bd7c-2f95b50ffd76', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:18.163+00', NULL, '9233', '0', '0.01320'),
	('2d85a31c-b942-4aa7-a880-1f16b67b244b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:18.163+00', NULL, '9234', '0', '0.02880'),
	('ccdf5095-3ceb-4986-bfb5-c9f4296f5629', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:20.38+00', NULL, '9230', '0', '0.01440'),
	('c4348488-aafa-48af-b90c-6ea092a8c5bb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:20.38+00', NULL, '9231', '0', '0.01080'),
	('276f49ac-51d0-4a1e-9676-4374ee95fc21', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:20.38+00', NULL, '9232', '0', '0.01440'),
	('641a27c7-a64e-4c5a-abeb-2b9fb8633b45', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:20.38+00', NULL, '9233', '0', '0.01320'),
	('70c8f9d4-cec5-4100-a95b-c33641c8582a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:20.38+00', NULL, '9234', '0', '0.02880'),
	('f15ae2d3-5cc9-466d-94cd-8f3afecf7761', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:21.369+00', NULL, '9230', '0', '0.01440'),
	('585b1b5c-e500-4f27-852f-fe46efbd6a1f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:21.369+00', NULL, '9231', '0', '0.01080'),
	('04fbe7f7-87d4-45e8-849a-157ecb037037', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:21.369+00', NULL, '9232', '0', '0.01440'),
	('0dcbb51b-8e6a-4488-8a77-f131d52815aa', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:21.369+00', NULL, '9233', '0', '0.01320'),
	('e74e041d-4034-4671-a567-5cab3327eb15', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:21.369+00', NULL, '9234', '0', '0.02880'),
	('e64a1401-e0c1-41fc-9f56-0fa931ab4c5f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:24.628+00', NULL, '9230', '0', '0.01440'),
	('bce56e76-7b73-4a8e-94be-3acce1ff00f8', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:24.628+00', NULL, '9231', '0', '0.01080'),
	('3ebe6c46-b915-4d9c-9989-de45b1a40dbb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:24.628+00', NULL, '9232', '0', '0.01440'),
	('3cb14cf8-9f96-43b4-a7df-a6cbf71c280b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:24.628+00', NULL, '9233', '0', '0.01320'),
	('458e47e8-768e-498d-b1ce-b3d489ac3f9e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:24.628+00', NULL, '9234', '0', '0.02880'),
	('50075c20-af97-42d4-a6c7-e1742fcc4bf4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:26.184+00', NULL, '9230', '0', '0.01440'),
	('0d10bcf2-ee73-47ac-a001-c4b3dc79496f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:26.184+00', NULL, '9231', '0', '0.01080'),
	('48a4f6f9-e862-4f41-bb61-d3549469f19a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:26.184+00', NULL, '9232', '0', '0.01440'),
	('a29c666c-7588-4d40-a1c1-04fb0fa1cb0b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:26.184+00', NULL, '9233', '0', '0.01320'),
	('8489e1e7-0c4f-45fe-ab13-3824b3d6931b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:26.184+00', NULL, '9234', '0', '0.02880'),
	('75301941-f249-4281-b64b-f2086a9afbbd', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:22.509+00', NULL, '9232', '0', '0.01440'),
	('ebb15f3a-c34d-4196-b11d-1e055dfdeb6b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:22.509+00', NULL, '9233', '0', '0.01320'),
	('5513027d-34ac-4c03-85b8-39dc5550e4e6', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:22.509+00', NULL, '9234', '0', '0.02880'),
	('2345498e-9b9e-4b5d-81c5-9111f2ebd802', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:23.239+00', NULL, '9230', '0', '0.01440'),
	('3a3a298e-2ee7-42d0-95c8-4a3e4e46cb01', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:23.239+00', NULL, '9231', '0', '0.01080'),
	('14929fff-9083-492f-80a8-51522e4a2521', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:23.239+00', NULL, '9232', '0', '0.01440'),
	('09f64b07-f28e-49b4-b202-d231e9f6fd5c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:23.239+00', NULL, '9233', '0', '0.01320'),
	('b2dde9f7-99ce-400f-a4c9-08eb9d74202b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:23.239+00', NULL, '9234', '0', '0.02880'),
	('0fc73495-2ba1-4620-b2f6-01b8ce6c05d7', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:28.997+00', NULL, '9230', '0', '0.01440'),
	('620e59ee-12ff-4b7a-b07c-1a16c1f2c0bc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:28.997+00', NULL, '9231', '0', '0.01080'),
	('891a99b6-cfd3-4eb9-aa3e-db16e6687e4c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:28.997+00', NULL, '9232', '0', '0.01440'),
	('d063100c-6595-40a1-aa71-12d97acc78b7', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:28.997+00', NULL, '9233', '0', '0.01320'),
	('a7e2dcc7-3b9d-4eb8-b4ff-309969f74d24', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:28.997+00', NULL, '9234', '0', '0.02880'),
	('a483e355-d31e-4e34-97e9-91562812c250', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:27.801+00', NULL, '9230', '0', '0.01440'),
	('68ccb75c-4169-4ff4-b4a4-e858cec497de', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:27.801+00', NULL, '9231', '0', '0.01080'),
	('a552f0ef-399e-4778-b19e-a48d0b1a22c9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:27.801+00', NULL, '9232', '0', '0.01440'),
	('6333544d-7581-460d-af24-902bbf894106', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:27.801+00', NULL, '9233', '0', '0.01320'),
	('d99762b4-c571-42c7-bd7c-ac40a4bd2390', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:27.801+00', NULL, '9234', '0', '0.02880'),
	('6db1713b-f318-4f04-bde3-4bfbaddddf5b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:28.327+00', NULL, '9230', '0', '0.01440'),
	('69e93db4-f379-46d4-a23c-00400461b25c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:28.327+00', NULL, '9231', '0', '0.01080'),
	('0461dd2b-c8a1-4b98-a4f5-9e46b3a3e1e0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:28.327+00', NULL, '9232', '0', '0.01440'),
	('fe6e2339-f2e0-4163-ae9a-4581d852e696', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:28.327+00', NULL, '9233', '0', '0.01320'),
	('703ca333-f2c1-498c-b870-9a16e6f684a0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:28.327+00', NULL, '9234', '0', '0.02880'),
	('bfbc8750-e4f1-4ae9-a5a5-923b174402c0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:30.208+00', NULL, '9230', '0', '0.01440'),
	('aaa7cab2-43d5-4758-a026-2c0c155de577', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:30.208+00', NULL, '9231', '0', '0.01080'),
	('1ab9d145-9214-4741-855f-779071233ea5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:30.208+00', NULL, '9232', '0', '0.01440'),
	('07105d6b-b464-4721-8a3c-46c4e7a4fb63', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:30.208+00', NULL, '9233', '0', '0.01320'),
	('4c645806-160c-4da6-8db5-45125ba79f22', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:30.208+00', NULL, '9234', '0', '0.02880'),
	('194fe8d9-6154-483a-ba95-cf575f6d789d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:30.881+00', NULL, '9230', '0', '0.01440'),
	('c3a94508-7fd4-43b0-93aa-0b5ed26f7c42', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:30.881+00', NULL, '9231', '0', '0.01080'),
	('ef247433-84de-41a2-89a3-d6eeedf92fd7', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:30.881+00', NULL, '9232', '0', '0.01440'),
	('737521f1-2afe-4c91-80fd-e549c03c370a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:30.881+00', NULL, '9233', '0', '0.01320'),
	('0b859bf9-4261-4614-be6a-682823b296cf', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:30.881+00', NULL, '9234', '0', '0.02880'),
	('a8dbf64c-53ba-4942-b5f8-e600fff3b4f2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:31.687+00', NULL, '9230', '0', '0.01440'),
	('7bd571f1-c006-4d84-935a-cc4ab18ad6fc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:31.687+00', NULL, '9231', '0', '0.01080'),
	('2ecfc5db-531f-4e27-870e-3cb047aa26d3', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:31.687+00', NULL, '9232', '0', '0.01440'),
	('8b159173-8d0a-482c-b729-7f2e27f2b83e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:31.687+00', NULL, '9233', '0', '0.01320'),
	('0bdf376d-651c-4a6d-9118-19b6427f630a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:31.687+00', NULL, '9234', '0', '0.02880'),
	('bdadd25b-f356-4dea-b05a-c8c4906b26d1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:32.393+00', NULL, '9230', '0', '0.01440'),
	('5525e7da-9eb7-4b54-9393-c75ceaae178a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:32.393+00', NULL, '9231', '0', '0.01080'),
	('f724c7a0-7a21-427a-9fb4-b331051524fa', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:32.393+00', NULL, '9232', '0', '0.01440'),
	('ec3066c5-acb1-4fa2-a03e-e3dfc1e2555b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:32.393+00', NULL, '9233', '0', '0.01320'),
	('504bee00-fb3b-468e-a2d9-25300fec7913', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:32.393+00', NULL, '9234', '0', '0.02880'),
	('694d7726-03d7-4b37-8b7a-7f75b3995884', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:34.386+00', NULL, '9230', '0', '0.01440'),
	('d5f9426d-0a00-40fa-a9c5-b7ebf3331655', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:34.386+00', NULL, '9231', '0', '0.01080'),
	('f79e0e9c-ff57-48d7-815b-4556213f8ad1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:34.386+00', NULL, '9232', '0', '0.01440'),
	('509373af-8efa-44a9-8830-18437a4cbff2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:34.386+00', NULL, '9233', '0', '0.01320'),
	('778db312-4bb9-4074-8d34-7db8aa2d7ea6', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:34.386+00', NULL, '9234', '0', '0.02880'),
	('6a584aab-ea65-4437-b8c5-821e4a1083c4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:35.615+00', NULL, '9230', '0', '0.01440'),
	('d8968363-81c3-4a8c-8e3a-7bfe474eaebe', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:35.615+00', NULL, '9231', '0', '0.01080'),
	('bce989be-e567-4e0c-86d9-c6937acba86f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:35.615+00', NULL, '9232', '0', '0.01440'),
	('eac3e441-437d-45f1-a953-29d75fe665f0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:35.615+00', NULL, '9233', '0', '0.01320'),
	('76bbb7b2-90f2-4454-a9bc-fd5b8f544d55', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:35.615+00', NULL, '9234', '0', '0.02880'),
	('1cbdea75-16bc-4cdf-9ecb-47bf5990ebad', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:36.446+00', NULL, '9230', '0', '0.01440'),
	('f6c612b4-d3dc-4840-833b-893437d3b034', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:36.446+00', NULL, '9231', '0', '0.01080'),
	('7fd94562-33e2-46e6-be44-880565b7eb3f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:36.446+00', NULL, '9232', '0', '0.01440'),
	('3b53d7fa-1201-4ed8-b544-1b4ba8cf76cc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:36.446+00', NULL, '9233', '0', '0.01320'),
	('27d815ec-c0cf-4615-a739-23bf02fd6f76', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:36.446+00', NULL, '9234', '0', '0.02880'),
	('addb97a7-ddb0-4dbb-b35c-5f6f246f5915', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:37.044+00', NULL, '9230', '0', '0.01440'),
	('1793df2c-5763-4275-a15a-75851ead3ce1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:37.044+00', NULL, '9231', '0', '0.01080'),
	('7f6eada4-f6ba-4965-8504-381e9da4d8fb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:37.044+00', NULL, '9232', '0', '0.01440'),
	('e919ad89-d0ad-47e3-8b60-fea3f618944b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:37.044+00', NULL, '9233', '0', '0.01320'),
	('300542cc-4f33-41ae-ae09-7ffa7e768369', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:37.044+00', NULL, '9234', '0', '0.02880'),
	('dc8e7115-0cc9-4d20-acc8-fb6fd6d77803', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:38.733+00', NULL, '9230', '0', '0.01440'),
	('860d69fa-4e1b-4ae3-bef0-dfd521b16ec3', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:38.733+00', NULL, '9231', '0', '0.01080'),
	('5bd121a2-aa3d-4cd4-8052-747720f99612', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:38.733+00', NULL, '9232', '0', '0.01440'),
	('bf0f0034-2c85-48fd-9028-1e03389603e1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:38.733+00', NULL, '9233', '0', '0.01320'),
	('0ee5d85c-fe17-43ff-819a-5665362ebda3', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:38.733+00', NULL, '9234', '0', '0.02880'),
	('3d3afc6b-58d3-4d25-9f22-2a8918756baa', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:40.156+00', NULL, '9230', '0', '0.01440'),
	('0d47a708-bdf8-48bb-8403-a7760556b75b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:40.156+00', NULL, '9231', '0', '0.01080'),
	('4383303c-1f1e-49f1-bf37-d41760f33a41', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:40.156+00', NULL, '9232', '0', '0.01440'),
	('1348d066-9ff5-4516-a355-5f03083ca867', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:40.156+00', NULL, '9233', '0', '0.01320'),
	('a06b67eb-2ecc-49e5-9eb6-7bf9174402e0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:40.156+00', NULL, '9234', '0', '0.02880'),
	('27887454-7130-491f-986d-c602ca9988eb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:40.828+00', NULL, '9230', '0', '0.01440'),
	('8a4b9ff9-a92c-486d-99e3-015c9ef50591', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:40.828+00', NULL, '9231', '0', '0.01080'),
	('3b69d0ea-10ea-400f-8889-75d35e2fbcec', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:40.828+00', NULL, '9232', '0', '0.01440'),
	('b3867883-d1e0-4d91-8e73-738e67cefd77', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:40.828+00', NULL, '9233', '0', '0.01320'),
	('34ec86b0-1d1a-4b40-bd49-8acbd2f86458', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:40.828+00', NULL, '9234', '0', '0.02880'),
	('1adc94c7-12d2-4c14-9095-c9533f20b317', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:41.784+00', NULL, '9230', '0', '0.01440'),
	('c26a1eac-dde3-471c-8627-73da59d84092', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:41.784+00', NULL, '9231', '0', '0.01080'),
	('7f98214b-710b-462f-9e46-369aa0ab3558', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:41.784+00', NULL, '9232', '0', '0.01440'),
	('2690e66a-d776-4661-944a-799cb72b179b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:41.784+00', NULL, '9233', '0', '0.01320'),
	('dc9f0dfb-cb41-405e-967c-d37f350ae3a6', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:41.784+00', NULL, '9234', '0', '0.02880'),
	('7d30c106-a52d-413b-a52f-4174abf67dd8', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:43.158+00', NULL, '9230', '0', '0.01440'),
	('108ddad5-8118-44bf-9d80-2f852114a23a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:43.158+00', NULL, '9231', '0', '0.01080'),
	('16ac5991-6d52-4957-8e06-db1321ae19d5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:43.158+00', NULL, '9232', '0', '0.01440'),
	('2a1b9d11-be59-46fe-b8f1-e86754cd2123', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:43.158+00', NULL, '9233', '0', '0.01320'),
	('a61f74aa-5604-486b-828f-884e190cccee', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:43.158+00', NULL, '9234', '0', '0.02880'),
	('d21b28df-f3cd-4a88-9451-e48a82f71b0d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:44.044+00', NULL, '9230', '0', '0.01440'),
	('53938cd7-c6e8-4a1c-989c-085fa7023e4d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:44.044+00', NULL, '9231', '0', '0.01080'),
	('49fe7b9f-6557-4cc2-aef4-52c2fc42a265', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:44.044+00', NULL, '9232', '0', '0.01440'),
	('7a180537-4460-40ed-a1d5-925ab5e738a0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:44.044+00', NULL, '9233', '0', '0.01320'),
	('8e59790e-94e3-47cb-96c9-2ffd6408901c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:44.044+00', NULL, '9234', '0', '0.02880'),
	('a7340964-183f-4413-88be-eae10dd01e62', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:44.775+00', NULL, '9230', '0', '0.01440'),
	('5f7406a2-165b-4a65-be0c-26261518fcff', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:44.775+00', NULL, '9231', '0', '0.01080'),
	('961a0be4-6dd3-40c9-9c8e-8ca4e0793f3e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:44.775+00', NULL, '9232', '0', '0.01440'),
	('2629742c-d790-4c33-a14b-d42cbf5cb517', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:44.775+00', NULL, '9233', '0', '0.01320'),
	('128d435b-dae1-4faa-9415-b3361f05fee0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:44.775+00', NULL, '9234', '0', '0.02880'),
	('9e376a23-a5f2-4e94-bd33-9e443071aa27', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:46.418+00', NULL, '9230', '0', '0.01440'),
	('661b2283-8b55-4c2a-a272-d7e7a5a38f2d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:46.418+00', NULL, '9231', '0', '0.01080'),
	('6bee6fb3-1ef7-4101-ad6c-7d8f7c839d59', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:46.418+00', NULL, '9232', '0', '0.01440'),
	('f1419b7c-3b5b-4488-9ed0-e2c36499e5d0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:46.418+00', NULL, '9233', '0', '0.01320'),
	('bc6348f6-b70a-4983-b923-de9940370fdd', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:46.418+00', NULL, '9234', '0', '0.02880'),
	('78a8d737-9bdf-4543-9a6c-4ecd70ed9433', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:47.338+00', NULL, '9230', '0', '0.01440'),
	('013107d4-0057-4cfa-88a0-c693b55e6ee9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:47.338+00', NULL, '9231', '0', '0.01080'),
	('f7d8f9c9-6605-4935-b583-544acb79ebe1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:47.338+00', NULL, '9232', '0', '0.01440'),
	('e92ea569-147c-4d41-8f7f-c4ae5d164cef', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:47.338+00', NULL, '9233', '0', '0.01320'),
	('dd878852-0d4a-4a33-8b19-bd1e43cc60bf', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:47.338+00', NULL, '9234', '0', '0.02880'),
	('071304ff-d38a-4fce-9c79-ec21db74c7a0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:48.343+00', NULL, '9230', '0', '0.01440'),
	('596e53cb-efe3-491b-bf00-4d49cf37f889', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:48.343+00', NULL, '9231', '0', '0.01080'),
	('d2978680-8a38-4cc1-ae53-0e734520f2ae', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:48.343+00', NULL, '9232', '0', '0.01440'),
	('4d6a5db8-b136-43a3-beeb-43bbee4603eb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:48.343+00', NULL, '9233', '0', '0.01320'),
	('4f19a3bb-f6e0-4778-aa7d-86a6af5e43b9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:48.343+00', NULL, '9234', '0', '0.02880'),
	('13595de5-8c7b-4504-9000-780f55f17423', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:51.489+00', NULL, '9230', '0', '0.01440'),
	('8f65f432-59b3-4cc3-9e47-53cc0de13608', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:51.489+00', NULL, '9231', '0', '0.01080'),
	('89250490-b289-4ecb-b46f-c1042b502482', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:51.489+00', NULL, '9232', '0', '0.01440'),
	('198cc967-8d09-48e1-a608-a6579d8e0da8', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:51.489+00', NULL, '9233', '0', '0.01320'),
	('d3a4283a-6a20-4911-979e-864d9d0b80af', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:51.489+00', NULL, '9234', '0', '0.02880'),
	('d895099b-aaae-42da-a53c-d67bac2ce730', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:52.901+00', NULL, '9230', '0', '0.01440'),
	('83b93b8a-52af-4996-8c97-a0766a049bd4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:52.901+00', NULL, '9231', '0', '0.01080'),
	('054af1f8-53db-4d3c-8634-9250d9d4ea9f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:52.901+00', NULL, '9232', '0', '0.01440'),
	('19782793-2c60-4635-a09f-f26859aada77', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:52.901+00', NULL, '9233', '0', '0.01320'),
	('25249ce4-de50-4cbf-a879-fbca57a60f90', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:52.901+00', NULL, '9234', '0', '0.02880'),
	('0b9210e5-83d8-4670-8768-3492953c6c82', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:49.867+00', NULL, '9230', '0', '0.01440'),
	('44e9fee3-67e8-4073-983d-a4a73ab48fb9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:49.867+00', NULL, '9231', '0', '0.01080'),
	('9bc3a170-ef6d-468d-9f2e-6e8990068b07', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:49.867+00', NULL, '9232', '0', '0.01440'),
	('320cd35b-0308-4803-8ac7-94116dbdca13', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:49.867+00', NULL, '9233', '0', '0.01320'),
	('55f3faaf-c4af-4ccb-a6fd-d731119a2bfb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:49.867+00', NULL, '9234', '0', '0.02880'),
	('3b43c05f-da0f-4ff0-af11-a22b1239f96e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:01.189+00', NULL, '9230', '0', '0.01440'),
	('1e56c843-f057-488d-97a3-c065e90ad876', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:01.189+00', NULL, '9231', '0', '0.01080'),
	('56a865cc-0cb5-483b-8a46-c5e5c2259df1', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:01.189+00', NULL, '9232', '0', '0.01440'),
	('fdd0b1d0-af5f-4db3-8415-64432b4e496a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:01.189+00', NULL, '9233', '0', '0.01320'),
	('ce3b311b-afec-49cd-ac27-187d4385158f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:01.189+00', NULL, '9234', '0', '0.02880'),
	('b57e33d1-ee15-448e-a2e7-daa8c7921b26', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:09.615+00', NULL, '9230', '0', '0.01440'),
	('5a1c1e03-981d-4576-a954-7397b9770547', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:09.615+00', NULL, '9231', '0', '0.01080'),
	('fd765674-ce61-432a-860a-62757861c00d', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:09.615+00', NULL, '9232', '0', '0.01440'),
	('bfde5035-e623-4223-aed4-115985e8276b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:09.615+00', NULL, '9233', '0', '0.01320'),
	('6684f316-ea3d-45d0-bd0d-ecc6a1263a50', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:09.615+00', NULL, '9234', '0', '0.02880'),
	('033c2db3-f9fe-45ae-ac0c-11511222438e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:11.03+00', NULL, '9230', '0', '0.01440'),
	('d2c14726-688a-4f6c-b8ad-061cf2279a17', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:11.03+00', NULL, '9231', '0', '0.01080'),
	('eef92767-5806-40f7-9f42-220742f4f365', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:11.03+00', NULL, '9232', '0', '0.01440'),
	('641855fd-c003-43f2-a1a7-1c9e2bf51c48', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:11.03+00', NULL, '9233', '0', '0.01320'),
	('759a5de5-68d3-4f6e-8396-f733e02606ee', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:11.03+00', NULL, '9234', '0', '0.02880'),
	('fe5dd791-8ba6-4783-934d-a8919814053b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:12.336+00', NULL, '9230', '0', '0.01440'),
	('69a4dcf4-4054-417c-a289-22b7d2d40626', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:12.336+00', NULL, '9231', '0', '0.01080'),
	('7e414f44-0c72-47b5-ba8d-fa77cff58207', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:12.336+00', NULL, '9232', '0', '0.01440'),
	('84462db0-ff35-48fe-b12b-07f4f9af701e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:12.336+00', NULL, '9233', '0', '0.01320'),
	('66a9929b-424f-4cbd-8541-39794519b5cc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:12.336+00', NULL, '9234', '0', '0.02880'),
	('9798e39d-0b19-463f-a9fb-2cde533f8016', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:54.702+00', NULL, '9230', '0', '0.01440'),
	('42db7d00-5064-4106-86da-b6d0f2d3f382', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:54.702+00', NULL, '9231', '0', '0.01080'),
	('d57c54c4-67b7-4932-b53c-5dc620b15d87', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:54.702+00', NULL, '9232', '0', '0.01440'),
	('c0b833fb-1d16-4ab2-b53d-36163ed4722a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:54.702+00', NULL, '9233', '0', '0.01320'),
	('677c54e7-d062-4aa4-98fe-95abca82e453', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:54.702+00', NULL, '9234', '0', '0.02880'),
	('c673d817-bffc-426b-b73e-b9a89c699e43', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:27:59.478+00', NULL, '9230', '0', '0.01440'),
	('43f8b81b-1837-4df4-806c-2bacf19c091a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:27:59.478+00', NULL, '9231', '0', '0.01080'),
	('3aaed23b-58cb-4aac-94bf-827aba07c080', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:27:59.478+00', NULL, '9232', '0', '0.01440'),
	('f953a455-acbe-460d-bb7e-c0c8a080552f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:27:59.478+00', NULL, '9233', '0', '0.01320'),
	('9f1ac211-4188-483e-ab94-2d17f4291a47', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:27:59.478+00', NULL, '9234', '0', '0.02880'),
	('7e203562-f867-445d-aac0-64439542a5d4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:00.396+00', NULL, '9230', '0', '0.01440'),
	('dbf112d1-1275-4ce1-9526-3c95be5f506e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:00.396+00', NULL, '9231', '0', '0.01080'),
	('20b0023f-93d0-4a56-a2a1-13c2d9bb4b65', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:00.396+00', NULL, '9232', '0', '0.01440'),
	('12a6f5e8-7e56-43cb-a96c-6ffef2cfbf0c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:00.396+00', NULL, '9233', '0', '0.01320'),
	('3d347c9e-ca4c-4975-98cd-41861d46a6c0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:00.396+00', NULL, '9234', '0', '0.02880'),
	('d2de7323-1ab6-4300-a4b2-6425759d4603', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:02.376+00', NULL, '9230', '0', '0.01440'),
	('ab45228d-a45a-4ae4-9983-02c3d8e67712', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:02.376+00', NULL, '9231', '0', '0.01080'),
	('497993b8-693d-427c-87cc-3b3faa8363eb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:02.376+00', NULL, '9232', '0', '0.01440'),
	('7b6a8258-7cba-4ac8-808f-9170a51bb7c0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:02.376+00', NULL, '9233', '0', '0.01320'),
	('65109c6c-fd85-4424-9c92-2f1db44a8c57', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:02.376+00', NULL, '9234', '0', '0.02880'),
	('5e02b5fe-1aa8-473b-baab-c41230e2de04', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:03.708+00', NULL, '9230', '0', '0.01440'),
	('e8e902d4-482f-4be8-9d0a-ff1c1c25a984', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:03.708+00', NULL, '9231', '0', '0.01080'),
	('452f4a09-f1be-4e0b-8047-447d60a264cc', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:03.708+00', NULL, '9232', '0', '0.01440'),
	('a607467b-478e-4d1c-9b9b-4239268078c2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:03.708+00', NULL, '9233', '0', '0.01320'),
	('52fbace0-80c3-413d-b6c8-24021ad846a9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:03.708+00', NULL, '9234', '0', '0.02880'),
	('67a8cf46-30fb-430d-b453-10b1b7037698', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:04.599+00', NULL, '9230', '0', '0.01440'),
	('0e0c89e6-546b-4dd1-8a0c-d5d243f47d5e', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:04.599+00', NULL, '9231', '0', '0.01080'),
	('fd6eb687-e245-45e4-bacb-8354fb4d9a37', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:04.599+00', NULL, '9232', '0', '0.01440'),
	('caed8915-40e9-446f-838b-60f66e16d896', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:04.599+00', NULL, '9233', '0', '0.01320'),
	('6d5b38c2-49f3-4243-abfe-cbf67ca369b2', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:04.599+00', NULL, '9234', '0', '0.02880'),
	('38d9a61a-d5a6-415b-804e-e4dd6220e01b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:05.358+00', NULL, '9230', '0', '0.01440'),
	('f810e3a6-c8e7-41c1-aa1b-85f8b9546909', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:05.358+00', NULL, '9231', '0', '0.01080'),
	('3cc5eff8-ee14-43ff-b67d-00b6d5f3668f', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:05.358+00', NULL, '9232', '0', '0.01440'),
	('578ee082-a136-4e5e-93c1-d6bbec3a24ef', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:05.358+00', NULL, '9233', '0', '0.01320'),
	('2100badb-dba3-4e54-ac23-57363f7d52ef', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:05.358+00', NULL, '9234', '0', '0.02880'),
	('75f40297-15e9-46e9-b7e5-b75e6e75318c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:05.922+00', NULL, '9230', '0', '0.01440'),
	('ba8a36b9-f6ff-4c5f-8f51-a3a1d64d5a01', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:05.922+00', NULL, '9231', '0', '0.01080'),
	('3aab6677-00be-41d5-b733-ad529738a0e4', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:05.922+00', NULL, '9232', '0', '0.01440'),
	('6f63e39a-c0e7-4b02-9fc0-e58688ea0f1c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:05.922+00', NULL, '9233', '0', '0.01320'),
	('515f4787-5a98-422b-9feb-6a8aae90f3df', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:05.922+00', NULL, '9234', '0', '0.02880'),
	('718317ff-dacd-473d-8d74-645027a34f2b', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:06.618+00', NULL, '9230', '0', '0.01440'),
	('0cdfa6b7-bcfc-4346-a68d-698ecc64dd71', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:06.618+00', NULL, '9231', '0', '0.01080'),
	('36b8fd34-cd7a-40fc-ab69-e001f225e1a5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:06.618+00', NULL, '9232', '0', '0.01440'),
	('072d775f-e767-48d1-88c4-7b5e11a79cbb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:06.618+00', NULL, '9233', '0', '0.01320'),
	('82cfd275-4f59-4db3-ad9d-2cfb09f2c955', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:06.618+00', NULL, '9234', '0', '0.02880'),
	('6084f204-3fc2-44f6-b596-672772b34c4a', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:07.527+00', NULL, '9230', '0', '0.01440'),
	('390a22df-8a62-41ff-891f-6962cf590572', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:07.527+00', NULL, '9231', '0', '0.01080'),
	('75f2b811-c032-4c0c-87e7-f7274c4c0bd9', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:07.527+00', NULL, '9232', '0', '0.01440'),
	('b6febadd-4947-4b00-8c4c-563452e931ae', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:07.527+00', NULL, '9233', '0', '0.01320'),
	('1d0cec69-26db-4ca2-bf9e-03af6f24a1b3', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:07.527+00', NULL, '9234', '0', '0.02880'),
	('2cbaf6fb-d808-42ec-9f84-e7ed0294fac5', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:08.279+00', NULL, '9230', '0', '0.01440'),
	('488d4f82-5d3b-4f5b-be9a-d7ab02db9a12', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:08.279+00', NULL, '9231', '0', '0.01080'),
	('9b36b026-2640-417d-a368-debbecfb93f0', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:08.279+00', NULL, '9232', '0', '0.01440'),
	('132dbe65-43fb-40fc-a201-cc020cbbbadb', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:08.279+00', NULL, '9233', '0', '0.01320'),
	('b7799d38-0e7c-491f-9fd8-e4a80b68992c', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:08.279+00', NULL, '9234', '0', '0.02880'),
	('477dc01b-2519-4f5f-b7a1-0c26bc8561f8', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', 'pending', NULL, NULL, '2024-03-09 15:28:09.057+00', NULL, '9230', '0', '0.01440'),
	('61c103b4-2d8c-4ace-bce6-1d2bf0ed2433', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', 'pending', NULL, NULL, '2024-03-09 15:28:09.057+00', NULL, '9231', '0', '0.01080'),
	('9270f8e6-2d0d-4d58-946e-107100d9f867', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', 'pending', NULL, NULL, '2024-03-09 15:28:09.057+00', NULL, '9232', '0', '0.01440'),
	('79a7ee83-e73c-48ac-94f7-6b2b31b01c36', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', 'pending', NULL, NULL, '2024-03-09 15:28:09.057+00', NULL, '9233', '0', '0.01320'),
	('522135cf-5743-4336-87b9-79b66b86e594', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', 'pending', NULL, NULL, '2024-03-09 15:28:09.057+00', NULL, '9234', '0', '0.02880'),
	('d04e826f-2608-4bde-86e4-8c8212f2d0ba', 'c05cd20c-1764-4735-9363-2abfaf26f58d', 'India', '0.0078', 'tdm', '30', '4', '30', '200', 'verified', NULL, NULL, '2024-02-07 07:45:27.042047+00', '2024-04-14 15:03:30.023+00', '91', '0', '0.00456'),
	('f7c61a05-44bb-4dcb-a907-c27d7050bfc7', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'india', '1000', 'sms', '12', '21', '31', '500', 'pending', NULL, NULL, '2024-04-15 23:51:01.44+00', NULL, '91', '13', '1200.00000'),
	('440cf1ed-5d24-4e45-8600-c116ab56f9a8', '0c147006-6370-4cb6-b3c8-2edfb59ab302', 'india', '1000', 'sms', '12', '21', '31', '500', 'pending', NULL, NULL, '2024-04-15 23:51:02.258+00', NULL, '91', '13', '1200.00000');


--
-- Data for Name: gateways; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: notifications ; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: purchase_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."purchase_requests" ("created_at", "client_id", "route_id", "status", "id", "payment_type", "communication_status", "whatsapp_no", "ip", "vos_status") VALUES
	('2024-04-14 14:33:27.347927+00', '6c68f7fe-188f-482c-8aba-abcedec9e392', 'd04e826f-2608-4bde-86e4-8c8212f2d0ba', 'approved', 'cd75a718-1c74-44a3-b529-ce2d47d87e83', 'postpaid', 'deal_settled_successfully', '+91236856685', '22.566.3.2', 'pending');


--
-- Data for Name: routes_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."routes_history" ("id", "destination", "rate", "route_type", "asr", "acd", "ports", "capacity", "destination_code", "pdd", "selling_rate", "effective_date", "route_id") VALUES
	('a35de354-3d1e-48b3-8dda-8e9e8b4e86cf', 'india', '0.1', 'cli', '30', '12', '14', '100', '91', '16', '0.12000', '2024-03-08 22:28:45.852761+00', 'ba00a563-c766-44ba-958c-c3a3a71f5958'),
	('6c9357d0-5588-4cf7-938e-b8622a426eef', 'india', '0.1', 'cli', '30', '12', '14', '100', '91', '16', '0.12000', '2024-03-08 22:28:46.696823+00', 'fccaf930-22f1-45b3-a148-a7dfa2c82bea'),
	('ebef4958-10ce-4499-997c-3e8ece989e37', 'india', '0.1', 'cli', '30', '12', '14', '100', '91', '16', '0.12000', '2024-03-08 22:28:47.64526+00', 'a462b121-8812-4f55-a22d-c1d378cf2c19'),
	('2056eef7-5e2b-4670-9805-fc45c75e46d7', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:13:51.033742+00', '0a4a75cc-45f0-4345-996f-08c2ab151fd4'),
	('b7954a65-4f87-423c-8a59-6697a3f25788', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:13:51.033742+00', 'a1b21e22-65d2-445f-abd7-39f879b14fa0'),
	('6b59a41d-da49-472b-80e2-1c0def85ae51', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:13:51.033742+00', '21e18067-f562-46e0-a876-d7497096ad84'),
	('3005cb0d-d4c1-44c8-9363-c5719c917a7c', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:13:51.033742+00', 'eacc650c-084e-45a4-bfd7-da44c25f11cd'),
	('e8a48169-c466-4819-9231-3d654f3b5311', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:13:51.033742+00', '70f9748a-5163-4e0e-a198-356de4428273'),
	('ad4ef75f-d613-4fb9-8064-093e16992515', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:13:52.127386+00', 'c8c87177-5035-4c7b-9700-baa96b68f2f3'),
	('3e33ba6e-9039-4a4b-bb7c-3a77800fdfea', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:13:52.127386+00', 'd546364e-180c-41ef-b367-09180bf1befb'),
	('0f3a669c-fbc2-4584-ab15-c8bea76448a4', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:13:52.127386+00', '9c5c6f87-dc32-47de-bdae-6b986c7d342f'),
	('25ec5bc7-164e-4b2f-a858-abb68e031a3f', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:13:52.127386+00', '515af728-6e11-4fe5-8cd2-19267b1fe20b'),
	('78d5fb79-daea-4287-b839-2e46b884aa13', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:13:52.127386+00', '48dd662c-2c37-415a-b749-00f33314790f'),
	('7c6ccdb5-a7f2-4a66-b121-9ea9c539f8ef', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:13:53.051857+00', '94593167-afd2-42fd-9e18-00d47b535487'),
	('46bcf93c-cc9d-4c3f-a3ff-a92360efc68e', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:13:53.051857+00', '388fc9b5-4bb3-43ff-ba69-8407ba10f44a'),
	('d38092e2-01f4-41a5-a392-8e5f5889f578', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:13:53.051857+00', '13ce0fc5-512e-42c3-8d9c-0e6bc739484d'),
	('cca2974a-1d29-4436-bb10-d2b6a3945929', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:13:53.051857+00', '77d18437-70bc-441e-8f89-3c471d27facf'),
	('10317d2f-1315-4bd9-a6e7-2b6ac47f0c1c', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:13:53.051857+00', '49da5bc0-05ef-4bf1-aa50-c5dd533c21b5'),
	('d06a2121-4ed1-4249-b3e5-5f539e018afc', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:39.463533+00', 'e31d1a49-3741-445d-843c-e2a7ad51ff07'),
	('27fa8033-48d9-46c1-b070-feb87f2cec09', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:39.463533+00', 'a6c5a7f8-2971-4bc7-9fb8-78ae692dd2db'),
	('64ea9f5a-56ce-45a5-ab48-a231b46d8895', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:39.463533+00', '935720ab-d299-42c9-80ca-d8332196cb8f'),
	('3d036d82-5c74-4d63-a730-cf036c57636a', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:39.463533+00', '0dd81f0f-fa72-4a86-9812-61af58b32d35'),
	('523694a5-c13d-44b1-badf-59fc6bddd5e9', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:39.463533+00', 'd5d6791a-17b5-4ea3-aef4-83205d9a496b'),
	('4ed49e2b-83e9-4e00-8d60-6c428dc17b47', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:40.667467+00', 'b4f59fdd-1804-42c0-917b-fe515566eb59'),
	('93a0341d-f893-4267-87ad-f1d757b14de1', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:40.667467+00', '6f8324e9-905d-44f3-9421-7a4455cdb6d8'),
	('ae652521-77f5-4cc5-8d8f-1ebbc5058e75', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:40.667467+00', 'd3cbfcae-ab38-4fca-a497-e6168808427e'),
	('55a27f74-7e61-4c6b-ae58-dad8ac3f5be1', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:40.667467+00', '45a67908-e89f-43ab-808d-7ef214f77bd6'),
	('40c782f3-57b8-446e-97a9-bb0cd30bc098', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:40.667467+00', 'e6a7e1a6-7542-49d0-a02c-67e96b4175fe'),
	('88f6a686-4b99-406a-9627-a41b7cdb7429', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:42.14636+00', '6f5d54fc-f3a7-441f-98d9-198b5c010abb'),
	('9168e390-17a6-4b2a-b0ec-58e13af1c862', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:42.14636+00', 'd3da22e8-3bb1-46ad-a082-a0dc48de875a'),
	('36c34c0d-c148-4a59-ad0c-07c2fcf1f244', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:42.14636+00', 'c5e11bca-2b2b-4028-83dd-0f01fde25ab1'),
	('d6bd1dcf-e10f-42f3-a786-679b1855aa68', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:42.14636+00', 'c959c651-52b0-484b-91a9-81dc5dea225e'),
	('d3ea417c-fd64-4742-88bf-be4aa83b7a30', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:42.14636+00', '0ac9b514-9385-440a-9938-3e68ed331406'),
	('ac9c5f7b-c4a5-424e-bf3c-46941d8bbb34', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:43.048457+00', '1667b91f-442b-44da-8c19-14136a307399'),
	('1642152f-9658-4776-961c-c5051420fb31', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:43.048457+00', '39c54e8d-8862-448f-8a1b-c5377aa44b6c'),
	('de95d1ca-d639-4ab6-b93f-2ea427e399ce', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:43.048457+00', 'f232fd0b-a8cb-4e89-8a63-6b298f8b168d'),
	('765c108c-9f7e-494f-aeda-abcf8d5db3b2', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:43.048457+00', '3d528e3b-894a-4a22-864f-8141c2b2b73e'),
	('b7186e8f-e829-4434-b74e-b1e8b43ce13a', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:43.048457+00', '578af341-50a3-4c8f-aef9-c1aa9e88e27f'),
	('668ce453-5316-48fd-9a2f-f07cff334656', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:43.874144+00', 'c1bc01ba-f687-4932-a2fc-0ca490859fbc'),
	('e1c183ca-c40f-4968-b3c5-e64da5e62954', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:43.874144+00', '94a6a161-727a-4385-b6c4-e5ecf5e363fb'),
	('a9c7f14e-fd51-4bf0-884b-2078a377011a', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:43.874144+00', '9255cb66-ef56-40cd-92bc-a7361616db10'),
	('b02f4585-e5f3-4af2-b1e4-95a84434370b', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:43.874144+00', '330f4712-d7d3-4f56-a4e0-6c6f2f1f3669'),
	('76f249bf-6e10-47a8-868f-c4a804ae07a1', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:43.874144+00', '4ff41274-bdae-4975-b285-72f08af316b3'),
	('b8b0a799-600b-4ba8-91c9-c79b210b17f1', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:45.543227+00', 'a96e304c-5035-4ac4-bbc5-82dbbcc4b07b'),
	('de51e3eb-62f6-4412-a120-a5030e117413', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:45.543227+00', 'd7f1c360-9fe6-4c6a-852a-6846809fe33f'),
	('21045bd4-7e85-4d2d-af12-e7b5a8a04c74', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:45.543227+00', 'c475aabb-de3f-417f-8c0d-f81fe51bb855'),
	('4fdbe86e-9872-4b49-9a42-f8ea63940a94', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:45.543227+00', 'c55e29d9-92e2-4254-bade-4cb40df133fd'),
	('d8b01ed9-c02d-40bc-95b9-1afbabec65da', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:45.543227+00', '31cf4c7f-6a75-4f4b-843c-693b079b9ef5'),
	('50e083d9-43c6-45c6-b3a0-caeae1959d90', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:47.450556+00', '3ebfd501-ccf8-455a-9752-35baa4047e57'),
	('65e7d897-f185-4360-b6a5-66808e80f9c4', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:47.450556+00', '6165acbf-5a34-4219-8ebb-62f8fc9fa898'),
	('23755177-042f-4fc9-ac61-146698a24667', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:47.450556+00', '81afb224-9e52-46f1-8494-b257a5d4a361'),
	('a0b6cb54-d1a6-4b53-8fc3-d413d26df172', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:47.450556+00', '5d4cb58d-bfe3-4102-9de0-9d0154e128ed'),
	('819bb75c-869c-4694-8702-2f8bbe76d831', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:47.450556+00', 'a9d3b1f6-91f8-451c-92e3-a0053d8c36b9'),
	('d5ddd6d7-7c70-4c0f-9b09-bc25f10d1dac', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:48.867546+00', '9ac68fd2-6ea5-4919-b416-922df3f02e5f'),
	('c89611d1-e2b7-46fd-b212-7a9817b1ea7f', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:48.867546+00', '212a08da-9a77-4d7d-83c2-1c4708ba13c4'),
	('216804d3-accc-4c29-a066-7193d3908852', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:48.867546+00', '1a5cf092-9207-463d-810f-de38fd7ae957'),
	('4d489b8b-7268-4a96-8e00-b0ec14cab8b6', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:48.867546+00', 'ada84549-3e25-4146-b3d5-63b0713260dd'),
	('49b1b5bc-8947-46dc-b784-d5f9e15c7f4c', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:48.867546+00', 'd09759fc-0203-418e-8276-7ed307c8d66a'),
	('35f08b48-b0ad-4731-875b-7fd0b89c7360', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:49.562263+00', 'ffa7f132-bac1-4074-a69c-8251ba180525'),
	('51df087b-f8b6-442a-a236-b9459fe849a5', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:49.562263+00', 'bd41fbf5-a2a5-4000-aaeb-8cbbaecbac8e'),
	('fd907517-ad28-47c9-9d34-40896aff1655', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:49.562263+00', 'a6a3335d-caa9-446d-9c9e-a9a6340b5183'),
	('8a95a9e4-4e0b-4544-b7c3-d6587dddf0cb', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:49.562263+00', '73e549e0-4e87-4126-9b58-fef4f85e65bb'),
	('81d63f69-40e3-496a-bcf4-c2ae869bac0d', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:49.562263+00', '15d30e87-4526-491c-b0c0-939a3a4f5709'),
	('bafeeb3a-5f09-486e-acd6-3519b266bfe6', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:53.121457+00', '263d41cc-7931-4f79-8543-a7e303398d12'),
	('951de108-ccb0-4a48-af8a-f19660b0615f', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:53.121457+00', '2bba1e31-9e33-463c-955b-b1a773d9b0e1'),
	('cc5e3fb9-5958-4d86-9d7b-6f811ad9e25d', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:53.121457+00', 'c98ab378-5bb8-4d2d-b636-9a0b0b960371'),
	('e3bbc4c4-f150-48f5-bc7f-0d1d3f7feb18', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:53.121457+00', '177e5dcf-204d-4e80-8831-dbc7e8dc4169'),
	('f2d5f42f-8702-4a71-aecb-6401da2e066b', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:53.121457+00', '35e0861f-265f-4005-b706-c7fc6574e7f9'),
	('f46aaa7c-0f8c-455e-831a-5e5ea0f02274', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:54.949848+00', '3ffc0933-2a82-4112-ae37-83889d6881fc'),
	('0a001183-a471-434a-bc06-26fc72f185c7', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:54.949848+00', '0ce259bc-480f-4034-bb54-2820fc845692'),
	('a5250b7e-acb6-499f-9ee9-1d001950088a', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:54.949848+00', '59145c8c-1efe-436c-8e4c-117c6589caa1'),
	('a326faf9-848d-4bee-b298-b177bef14eee', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:54.949848+00', 'f480c485-77e4-404d-ab4c-d16ee7a22350'),
	('2d62d7f2-8e18-486c-af96-336f2beff9d7', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:54.949848+00', 'cc15ce60-fa8d-4380-848a-98b95fc3cff9'),
	('838bcfd5-d733-4bf3-b804-1e17a06619de', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:00.284376+00', '48d6ba2a-0dad-4cfa-b8f9-49fe581b892f'),
	('68f5e34d-b4f8-4d35-81c8-e6f69bba3101', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:00.284376+00', '543ea810-b9d7-4cb0-b3b6-6813cc8492a1'),
	('7e063d0c-5b9d-4115-8cba-e8499a234493', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:00.284376+00', '949f234a-1f96-48ef-90d5-3f9b9faf01b8'),
	('9fbef1b3-2f29-4466-b4ce-9addf6c2d73e', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:00.284376+00', '56e35625-59c6-4f86-8a0a-bd58b7ed7663'),
	('fef1c94e-34a1-450d-a544-03fd63c828f7', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:00.284376+00', '748ab43d-463e-4dbb-a91a-a50466c57fcc'),
	('6d5e2865-6db1-427e-9a53-7a520feb7a80', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:01.453272+00', '67068ca4-b64a-41d8-90e7-33c83de75281'),
	('592bba1a-74af-473d-ba77-d66adc01f5ee', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:01.453272+00', 'd5ce19c3-b249-41eb-b2b8-c83ade8e0dd4'),
	('b9398ad9-aac4-4378-8218-04de36f7f26e', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:01.453272+00', 'd004857e-43ba-4186-81bf-013513b3daa2'),
	('91b2e043-873f-446e-9bc1-4a56996d8f4f', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:01.453272+00', 'e139b9f7-9750-4d72-967f-526db7f1ee8b'),
	('dc9cf616-11df-44e7-aaaa-e651f6e52624', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:01.453272+00', '64a66fd0-3d70-402b-bf30-cc37e011552c'),
	('93f8ddbe-7b8c-46f7-894d-0a869ea84c88', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:03.720706+00', '02e9173b-f363-4e77-9c40-0b62dc0d6d20'),
	('5bb14764-4c46-4dda-a9a9-2ca62bc7f60a', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:03.720706+00', '1cbce9ed-5d66-45b8-a11d-9c74565d9a0c'),
	('fc06f82b-d66c-4216-9f4d-bc2da94ea7b8', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:03.720706+00', '763426d1-7e61-4df0-b377-071bed9b5d34'),
	('ce203e11-1809-4162-afa9-36595ff57c24', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:03.720706+00', '33a1ccc3-ad90-4ff9-9346-17510754fc72'),
	('907d2236-8904-499f-93f0-c830a866421f', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:03.720706+00', '0ad5b233-7604-49ce-8159-4a0fbaf05020'),
	('702641ad-73ce-4763-9a21-7c56064f3e99', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:05.146188+00', 'ce8b1f59-5721-4ba5-bdcc-8bc647259ff4'),
	('54b1105a-7437-4cb5-a42c-c0d449ec4362', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:05.146188+00', '47c972b6-2fa5-46a7-8891-89c286919a6c'),
	('5a41b7fd-02d8-4dbf-975d-dd4c72347e09', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:05.146188+00', '5926558c-e413-4d85-bef7-db6820d8c158'),
	('957cae03-82c5-43ab-a5b8-b81b3d6afa44', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:05.146188+00', 'f6fe02dd-4f10-4794-afef-67891a73d7ca'),
	('b2e3097c-d9e3-43d1-9c0c-517d348952a4', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:05.146188+00', '95807b31-acb6-46f3-b991-e711868b8721'),
	('aa9752fb-62db-4544-8a4b-a377203de255', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:05.835811+00', '5fee768d-89b1-482f-b157-11faf45cb2e9'),
	('211dbb9a-f265-4a16-b5c4-a513b3ad5d2a', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:05.835811+00', 'a7509911-23bc-4f36-8557-eee99af8da06'),
	('655de039-d5fe-47e6-843a-95b883d5c7b1', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:05.835811+00', 'e5469cae-555f-4601-b57e-f1a4475a0cc2'),
	('456b62a7-c52b-4304-b440-4c19ba11e4ea', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:05.835811+00', 'ced52292-ab20-48c3-a762-b705f8b57939'),
	('0df89ed7-66c9-4caa-adf1-07e2e7a38f2c', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:05.835811+00', '7937c3b3-0791-4d44-89c9-5cf48a1f4493'),
	('c0e629d6-a5d0-4f96-9e27-204d98baac01', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:06.832723+00', 'a10f13a8-c537-419e-b23e-c22be3b7fd1a'),
	('5e4aae13-323f-4d4b-b2d5-c6d2bb7c528c', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:06.832723+00', 'e80af8b8-7489-4c93-9700-1271ae186ae0'),
	('2f0f6fb4-271c-45fc-becb-a9ccaaad62fe', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:06.832723+00', 'fcb0accc-c3a0-4c76-90f5-2ed5682ed792'),
	('79d53131-f018-472f-985b-2ac1819f1bfe', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:06.832723+00', '4e113add-b61f-423a-9c61-91852a82c5f6'),
	('80f5bb3f-437c-422a-9e58-f61e71d0b6d7', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:06.832723+00', 'eec1858a-c342-4f70-a06c-40067ef9f9fe'),
	('3827222d-fba2-476b-8dd6-c1751da0f6fd', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:09.050599+00', '4834fb6f-2435-47ba-8784-7cd281625ad9'),
	('e2173140-f6d9-4ebf-a677-40a1865ee9e7', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:09.050599+00', '1ef6222b-860d-416a-a402-65be81a904e4'),
	('cffe6645-4d4a-451b-82d8-747b7de3ab3b', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:09.050599+00', 'c58d6a60-8803-4ba5-a6b9-3601b86ec237'),
	('a21b863f-a773-4219-b489-ec5a2a758b4d', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:09.050599+00', '5f82ed6b-e3be-4a47-983d-63fd8d922059'),
	('cdef0c03-e017-4f00-8df6-dbe0831713b1', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:09.050599+00', '7b8edb8c-e7b7-4930-a4ff-2ca1c1a3fa75'),
	('a07cd25b-0754-4695-86c5-3693aa1c1bd4', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:10.718303+00', 'd43a83db-bace-490a-9ac4-415c61d12b04'),
	('a1078257-708c-4167-b0bd-09e39db41b1f', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:10.718303+00', '94a225af-939f-452d-9e43-fd99e8453d0e'),
	('4dfad963-0a5b-46b8-b446-fa7a8a3ca02d', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:10.718303+00', '52b4c514-765e-4066-831d-a799e9c937f7'),
	('b66de1f6-1f36-409c-a828-92ef12508cb1', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:10.718303+00', '35a5bdb4-0fd3-4483-abde-363b58f8a681'),
	('625b0c4b-31bd-485d-9ed6-1a48e252532c', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:10.718303+00', '6521f91a-f4d0-477a-8370-9882f40498fa'),
	('97037afd-a60a-4b68-90e0-dab8de4abc47', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:14.470644+00', 'be6a3a33-bb85-4bed-9ae8-e78f3e505a2c'),
	('7c63429e-a943-4106-91ce-8558016c690d', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:14.470644+00', 'b7cfbd65-adfe-4fe2-9337-b8a91dfae36e'),
	('60956f2e-11e3-4184-a96d-1e65a5735990', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:14.470644+00', 'bddc23d8-43f8-400a-b287-300868b61525'),
	('70db3c53-83bd-465c-a6ce-6086b56ee138', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:14.470644+00', '4ac2072a-83c1-4873-86f8-e8f350a3f9cc'),
	('d64b4136-3f1e-4620-85c9-c7981f5a3526', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:14.470644+00', 'a3c701df-e281-46af-bdd3-0666657f10f2'),
	('31d7a120-5641-4651-8647-24404f7738c5', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:50.384596+00', '09739e03-ba6b-4b4c-a8f9-9a051622df15'),
	('95b9fd83-c504-47fe-8104-9439638e4423', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:50.384596+00', 'd848c2b0-5f53-470c-b6e2-314994c66e53'),
	('679da3d7-f63e-43f3-bdbb-58b44594fd07', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:50.384596+00', '33d71000-e868-48f9-9d56-33470f7cdf5d'),
	('59c67221-535e-4560-ac50-54d675fe104e', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:50.384596+00', '1d0d2ab6-3cf6-4da7-8a5e-e2a474195fbd'),
	('0e84789e-602d-46c1-9b90-953b6733fe5e', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:50.384596+00', '0eb11506-f969-43b1-814b-1a097a0f6422'),
	('05ad4c49-6739-46b7-809f-325a74ed1839', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:51.069116+00', '456cd363-68c5-4ce0-9299-229b527fbd07'),
	('1f791bd5-2398-4294-acbd-b5276673fc0e', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:51.069116+00', '7956e2cf-6490-4525-9e31-014aeb9e3311'),
	('620d0830-9f11-4f61-a208-7eb106fe76c5', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:51.069116+00', 'fabe25cd-0a8b-4da3-8b7c-9bee9bb7df17'),
	('eb1161d6-7b6c-403b-a22f-9d88e8d0e0b3', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:51.069116+00', '9d0847bc-7d82-461e-bcf8-19382dfdd67d'),
	('ddd8bc3b-e921-4fd6-9dc6-81306ad63222', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:51.069116+00', '96472381-971a-4bef-ae8f-f83a09feb10c'),
	('2042adac-b3cf-49b1-a2a5-9d6bca5f3b8b', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:53.624203+00', '88c46f74-11ae-4bc1-a521-dea1edad66b6'),
	('e465d3fd-59a3-4fb8-9aa7-981752ac8ad7', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:53.624203+00', '65772134-ee1a-4552-9257-6dea8f1800d9'),
	('939b2cc5-e012-4f98-bb1a-340cd38ee73b', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:53.624203+00', '042317dc-cc16-45cc-88ad-c33c96de30a2'),
	('bb6b364c-735f-4e95-a8eb-034a3f915783', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:53.624203+00', '068ebe0c-0b09-4658-aa2d-ab5a5bedd067'),
	('f32d4682-a336-42ae-86b9-98b941bd4cbd', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:53.624203+00', '39c8756b-c665-46b7-b25e-ff328fe5854c'),
	('46367727-e3a5-4d44-b401-89909c573e2a', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:56.90322+00', 'd4dd4404-70d8-4b02-a57b-a5481f62ec45'),
	('990ca168-6d06-419e-86a1-83cb29b8d546', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:56.90322+00', '7fa145b0-4a74-4d2a-95c1-28916b1793f9'),
	('8fd42c87-991e-47e3-a04b-79b6fb994f84', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:56.90322+00', 'ef7eb0c9-08f9-4790-8bef-6032384a5bd8'),
	('46f0b6bd-bff4-4ebc-92f5-b9a46ba72816', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:56.90322+00', '2b32224a-49ea-48e8-8029-ca076c46bfb6'),
	('9e41bc59-107d-467f-8066-4184a846ed25', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:56.90322+00', '1ebc51d1-b267-49fc-bf6c-bdd12d2c870d'),
	('fe64b527-3d57-4e49-ae47-aefed908ddd9', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:58.282676+00', '265f63ef-a930-42bf-b912-61340b116e82'),
	('66a9b641-d0b4-4053-80b4-1216f97a581c', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:58.282676+00', '453e5d49-91dd-463a-a307-583a14b8cf1c'),
	('202119e4-f50a-4e8c-95bc-7aab7774727b', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:58.282676+00', 'c0322a1f-1a9f-4bb2-994d-7ba8a674ec26'),
	('67d6ec4c-33fa-4087-a264-659f38325bf0', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:58.282676+00', '94383d3f-c022-44b2-84c2-f4e88330c41f'),
	('3b84a5c6-1656-4943-b3ae-6b5c517a8a0d', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:58.282676+00', '2691608e-bfcc-44f6-9ef3-187ce3643261'),
	('53235091-6565-466e-985f-f9cacf25df15', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:26:59.692914+00', '0fd3c11d-6cae-4d7d-83f5-bb30d8325438'),
	('c92dcff8-a8c1-4dbf-b45c-2c89649dae03', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:26:59.692914+00', 'f9a518e4-f3a3-4099-8549-4abbb922373a'),
	('ab4e2df8-a0a7-4a31-bd3f-35323184ef84', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:26:59.692914+00', '65e93a88-11a7-432d-befe-8be44b0f6072'),
	('782e4c7b-2d71-45ae-9460-27a28ad52e9c', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:26:59.692914+00', '03c91d71-bb64-4198-97ce-cbb4d1c3f567'),
	('3e0ac749-2ce4-4cc2-9c5f-51f9de457cf9', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:26:59.692914+00', 'ab4eae74-c12f-457a-aaf2-27122366ac06'),
	('75cd415b-0301-4992-9df2-c184a17d7e24', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:02.859421+00', 'b22f4488-bc62-40c9-8f56-3ef368cb600d'),
	('5b40715b-693c-4306-990f-1254b17611ec', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:02.859421+00', '8bfe2a02-5e5e-4644-9ec9-6607a0f40020'),
	('6ba8ea15-2cbb-4883-a729-8b8f421e1ee7', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:02.859421+00', '05c5ea58-ef8e-4e50-b9e0-9c9fe58e75ce'),
	('2fb26916-8daa-4882-a00b-90c4c9fc7563', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:02.859421+00', '38d0d8d2-00be-4884-9096-e6062913b492'),
	('429de55a-9f4f-4a21-a1e8-7d4baafc2682', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:02.859421+00', '98563a36-c6c2-4560-a947-528310826150'),
	('8cb44f9d-a171-4d03-8d90-6b99f2ebce67', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:11.454619+00', '21466f9d-bdf1-4df9-8a98-b22d3bda4024'),
	('c52f0340-d028-482a-8ead-a29b0fd00e97', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:11.454619+00', 'feb59fd7-cf5b-49cc-b51b-90be26ac8793'),
	('56657a80-6c2c-4a5e-8452-175190320a9a', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:11.454619+00', '7e1e2147-fabd-421c-b43e-4a1e7de32241'),
	('75bfc7c4-1954-48e7-8827-3ef30ed29684', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:11.454619+00', '753b55a3-1344-4201-8b08-dff9e67991e1'),
	('e1d7334b-9c0e-4393-872d-e1733ccf94de', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:11.454619+00', 'fa4d6ef5-4f07-41c6-a715-873b63eda1bf'),
	('122906cb-7990-49c1-b288-8823470c04c8', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:13.137166+00', '7e3b3994-1a5b-47a6-bdf4-338b164bae4c'),
	('a70e4714-c90b-48af-9be3-b4adbe60b7b0', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:13.137166+00', 'f77770ee-2483-4168-8d93-7aa21ed21989'),
	('90cdd442-aa83-47f0-af37-0ff1b0cc3f54', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:13.137166+00', '710f7d85-ec0c-47c9-8de0-22897d8f0502'),
	('9289986f-5234-4c64-b7cc-89d36f86499d', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:13.137166+00', '35fe70f6-59d1-479e-bc15-22e68c26bbc7'),
	('b891c740-adbc-4dda-bdc7-405ee8658622', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:13.137166+00', 'fe67b01d-cfe5-4d82-848e-87fafb7f1f95'),
	('ade695b5-8e70-4144-8185-ae5ad23feefb', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:15.973068+00', '8f675fe7-4e40-4c15-9b0d-f0e6d012ebf0'),
	('3507f034-a337-4258-9739-1575aab2588d', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:15.973068+00', '4ce8f0a4-445d-4287-beb1-02f112057034'),
	('10c4b92f-2c27-4fa2-bcfe-a6cf93da05d3', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:15.973068+00', 'e571de29-cdf0-41b1-b65a-988b2a2fd88d'),
	('22d1eae1-cb53-4fb0-8242-3651ca0856c7', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:15.973068+00', '29645b7b-46ca-4149-8559-ec3497b9c25e'),
	('9f825599-ba2c-4c5f-b6db-fdbaa1f28b40', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:15.973068+00', '2c929bb9-5b9b-431c-892c-2f70bfee6b87'),
	('ef1deb40-5f53-4392-88e1-4a5c4e802344', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:19.171245+00', '24d07bdd-9503-4a48-9808-3697750e50f2'),
	('8e1c2159-f56e-401b-9f7d-2f38b36909d7', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:19.171245+00', 'dec86eaa-e463-4b21-87e3-4af7155a9a40'),
	('db85bf59-29fa-43e4-9aa8-571372267015', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:19.171245+00', '5ab39332-3e0d-44d9-9ef9-b5b19f3581d5'),
	('bdb65273-4a1b-4faa-bf13-42abe026ecb9', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:19.171245+00', '7e3ad6df-1d9b-43bb-9760-9ec5c1a5a291'),
	('eb3e6fa4-3665-4aca-8680-3deea7cbdddb', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:19.171245+00', '6cb6f8e3-6aac-4fbf-971e-f60e34f766e3'),
	('93166e79-5f90-42e7-a3ec-f7fefe194620', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:22.695095+00', '5f6f2171-8f0c-41e6-bdd9-d70bf121336a'),
	('5d4fc26b-6bf6-4dd6-ba2b-d2d47e22d636', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:22.695095+00', '5ca3b953-f4cc-41b3-93b3-2671d31c382e'),
	('2a67835f-1565-459a-8961-e4d8543b3d64', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:22.695095+00', '75301941-f249-4281-b64b-f2086a9afbbd'),
	('927b1098-68c2-4c3b-9411-e2dc00e310b2', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:22.695095+00', 'ebb15f3a-c34d-4196-b11d-1e055dfdeb6b'),
	('21db4bab-d614-4835-bf3a-1f5f841833fe', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:22.695095+00', '5513027d-34ac-4c03-85b8-39dc5550e4e6'),
	('d61e239e-93b1-44a1-bc77-d7a3fd725a6b', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:15.226358+00', 'f80e3984-04bd-4e99-afa7-904df0e27a07'),
	('b0853923-1f78-4685-ae56-cc2c68423354', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:15.226358+00', '0fbfdad8-910b-4306-a6d7-a1e55f5c274d'),
	('a1b533bb-c3e8-47ae-af48-8af3e671dd3e', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:15.226358+00', 'c8d45d52-8d5f-47fb-b6ec-ba9f32bdf8a0'),
	('07855ccd-5431-4ed1-98d6-3d178588e0d9', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:15.226358+00', '1eb447a1-ce87-40dc-8962-416a5ac46d8a'),
	('2af8902d-fc28-491b-9366-0f91be7d8759', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:15.226358+00', '8ac67f3d-110b-4788-a894-940dd73d7776'),
	('33b4803c-11d3-4eae-b8ce-ad979ebfce7b', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:17.10304+00', 'f478d191-2911-475f-9840-f73fbb3f071a'),
	('3cbc072f-5899-4f2f-b420-b30f3c3b0f2e', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:17.10304+00', 'b5e0e6bc-3bf7-4dbf-8365-cbe5873d356a'),
	('088e7d6e-870b-4a7f-93a9-294b2649d3bf', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:17.10304+00', 'a0322085-78d6-48b2-bee4-c0964dddeaf5'),
	('d633597e-4269-485e-8a6f-182a01857313', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:17.10304+00', 'fe9ba2cd-faea-4add-bd0e-078b6e514026'),
	('7ec19d05-a264-434c-a3b7-c6487702dfe8', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:17.10304+00', '82abe73d-f157-44ed-8f9e-2779462b9bf5'),
	('8cc61c22-7b49-4f2d-8826-bd3f2aa3a377', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:18.21163+00', 'e6ee8857-f86d-4300-9bb5-3a6fb9c8bd82'),
	('83c110bf-7341-4967-b347-4e5dae5f53d5', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:18.21163+00', '53c1c0fb-b2ac-4250-ad9b-c9073779bcf7'),
	('5ad3ed21-a39e-42ce-b9ce-c5d2df1a43b5', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:18.21163+00', '3191aadd-584e-4566-94db-4b215559f2dc'),
	('49444a15-d10d-4416-b44c-1f0c80c877bf', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:18.21163+00', 'f8330a08-332f-458f-bd7c-2f95b50ffd76'),
	('fa83c8e7-0c2f-48d8-bf66-0ea189d3088b', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:18.21163+00', '2d85a31c-b942-4aa7-a880-1f16b67b244b'),
	('7919a2cc-5aec-4852-82f0-3b81bb829d65', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:20.437382+00', 'ccdf5095-3ceb-4986-bfb5-c9f4296f5629'),
	('09b24098-fca5-4a3c-bedb-bbcda754caf7', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:20.437382+00', 'c4348488-aafa-48af-b90c-6ea092a8c5bb'),
	('941d8589-5f86-43f3-9565-af13c20db588', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:20.437382+00', '276f49ac-51d0-4a1e-9676-4374ee95fc21'),
	('b3cb01a6-0547-44ab-b1b0-4aa91d96e817', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:20.437382+00', '641a27c7-a64e-4c5a-abeb-2b9fb8633b45'),
	('ae2d1c88-df9a-47e8-a720-489409e6ac4d', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:20.437382+00', '70c8f9d4-cec5-4100-a95b-c33641c8582a'),
	('527ee67c-8c48-4549-bbe3-41917dce5e4f', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:21.553983+00', 'f15ae2d3-5cc9-466d-94cd-8f3afecf7761'),
	('5b474ad8-cf64-450a-8164-a03ed8ff08a7', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:21.553983+00', '585b1b5c-e500-4f27-852f-fe46efbd6a1f'),
	('b42110e4-27d8-42d9-a012-7083be1bfe2b', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:21.553983+00', '04fbe7f7-87d4-45e8-849a-157ecb037037'),
	('7e14c9a0-54df-4633-b0bb-0408e5523412', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:21.553983+00', '0dcbb51b-8e6a-4488-8a77-f131d52815aa'),
	('def5c09e-e5b2-48a5-ae2c-9aaf5ca5071f', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:21.553983+00', 'e74e041d-4034-4671-a567-5cab3327eb15'),
	('b8465df2-c99a-4550-94b1-4958849f52c3', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:24.681212+00', 'e64a1401-e0c1-41fc-9f56-0fa931ab4c5f'),
	('484f13c6-b71a-484f-ac8e-a8c66af6c050', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:24.681212+00', 'bce56e76-7b73-4a8e-94be-3acce1ff00f8'),
	('d0e2282c-996d-4765-970a-51f05d6a9b87', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:24.681212+00', '3ebe6c46-b915-4d9c-9989-de45b1a40dbb'),
	('4e82a278-d21c-4a50-8b60-801e2d3561e9', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:24.681212+00', '3cb14cf8-9f96-43b4-a7df-a6cbf71c280b'),
	('5fabeb7c-961c-4866-9144-46c611669961', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:24.681212+00', '458e47e8-768e-498d-b1ce-b3d489ac3f9e'),
	('6e952826-68a6-4b1f-83b5-ef204852368b', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:26.379015+00', '50075c20-af97-42d4-a6c7-e1742fcc4bf4'),
	('5cb43ae0-f47d-42a7-97ab-c15ff690a9d1', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:26.379015+00', '0d10bcf2-ee73-47ac-a001-c4b3dc79496f'),
	('e322041f-c3e5-4c92-8934-0704c79f3e6f', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:26.379015+00', '48a4f6f9-e862-4f41-bb61-d3549469f19a'),
	('c655406c-e4f1-48a4-9834-8bdf6adf34c1', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:26.379015+00', 'a29c666c-7588-4d40-a1c1-04fb0fa1cb0b'),
	('c7f6e14a-ecdb-4898-9226-37d7daae0fa8', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:26.379015+00', '8489e1e7-0c4f-45fe-ab13-3824b3d6931b'),
	('33496023-a022-4911-a0aa-3ff286bb0dda', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:27.850574+00', 'a483e355-d31e-4e34-97e9-91562812c250'),
	('d57fa699-d5bb-4ebd-863d-8ed1e93a4170', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:27.850574+00', '68ccb75c-4169-4ff4-b4a4-e858cec497de'),
	('0ca72a6a-8d15-4371-9f3d-8265eb9b4867', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:27.850574+00', 'a552f0ef-399e-4778-b19e-a48d0b1a22c9'),
	('707c258a-0180-47df-9977-2aa3d84bd04c', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:27.850574+00', '6333544d-7581-460d-af24-902bbf894106'),
	('a20b6803-0aef-4498-b492-d0efa1afdb01', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:27.850574+00', 'd99762b4-c571-42c7-bd7c-ac40a4bd2390'),
	('e9846342-9fc0-4b69-8499-88195d5e50a2', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:28.492064+00', '6db1713b-f318-4f04-bde3-4bfbaddddf5b'),
	('c7746386-c20d-49fb-b877-544cfba54e81', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:28.492064+00', '69e93db4-f379-46d4-a23c-00400461b25c'),
	('58223bc5-e44a-479f-bff6-9b2958a5d72b', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:28.492064+00', '0461dd2b-c8a1-4b98-a4f5-9e46b3a3e1e0'),
	('eff4981d-fe68-4c91-9d2f-53ac5bbf453f', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:28.492064+00', 'fe6e2339-f2e0-4163-ae9a-4581d852e696'),
	('d776c632-8a42-4aeb-ab83-a9d65c1e384a', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:28.492064+00', '703ca333-f2c1-498c-b870-9a16e6f684a0'),
	('8a94eb61-662b-4e41-b942-af8fb637a920', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:30.2658+00', 'bfbc8750-e4f1-4ae9-a5a5-923b174402c0'),
	('450b7d70-17e5-46f1-995c-c8c302186bba', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:30.2658+00', 'aaa7cab2-43d5-4758-a026-2c0c155de577'),
	('ea334550-d77e-4480-916e-1b87adbf3ee9', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:30.2658+00', '1ab9d145-9214-4741-855f-779071233ea5'),
	('95a919e2-0ca9-46dc-9857-473e6f7e18b6', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:30.2658+00', '07105d6b-b464-4721-8a3c-46c4e7a4fb63'),
	('cd69184c-10c5-49d2-863c-a702c6c3a443', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:30.2658+00', '4c645806-160c-4da6-8db5-45125ba79f22'),
	('b84a79bb-6a53-46ff-8b52-971feac645d9', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:31.061965+00', '194fe8d9-6154-483a-ba95-cf575f6d789d'),
	('d2ce3875-936f-46f4-a0fc-41f6115c33db', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:31.061965+00', 'c3a94508-7fd4-43b0-93aa-0b5ed26f7c42'),
	('c5cc0a2a-2166-4880-9e1e-af88f14c115a', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:31.061965+00', 'ef247433-84de-41a2-89a3-d6eeedf92fd7'),
	('4849417a-2b3d-477e-af5e-68e9d3a5ed14', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:31.061965+00', '737521f1-2afe-4c91-80fd-e549c03c370a'),
	('3fe4918b-e904-4326-9a56-5549ac18e8c8', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:31.061965+00', '0b859bf9-4261-4614-be6a-682823b296cf'),
	('4da36551-663c-474f-a5da-f50eaf9d1c68', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:31.750049+00', 'a8dbf64c-53ba-4942-b5f8-e600fff3b4f2'),
	('e672a26b-d38f-4004-b060-70e4cf931987', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:31.750049+00', '7bd571f1-c006-4d84-935a-cc4ab18ad6fc'),
	('98cdf827-8f4d-453b-a186-deab8ccb4cf6', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:31.750049+00', '2ecfc5db-531f-4e27-870e-3cb047aa26d3'),
	('df3483be-8699-4a90-a457-421cda5e2e6b', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:31.750049+00', '8b159173-8d0a-482c-b729-7f2e27f2b83e'),
	('5dfda58a-307e-4fe5-8fa1-965919c7cb99', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:31.750049+00', '0bdf376d-651c-4a6d-9118-19b6427f630a'),
	('f689ed65-7fc0-4584-9007-0f53671e9f35', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:23.307259+00', '2345498e-9b9e-4b5d-81c5-9111f2ebd802'),
	('64f65bee-d3a1-40da-b346-c2c3b643af8c', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:23.307259+00', '3a3a298e-2ee7-42d0-95c8-4a3e4e46cb01'),
	('ff26a60e-379d-4b75-842e-63f33efece30', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:23.307259+00', '14929fff-9083-492f-80a8-51522e4a2521'),
	('1fae5cb7-b78a-4a7b-94a2-f3e25eee3b3e', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:23.307259+00', '09f64b07-f28e-49b4-b202-d231e9f6fd5c'),
	('17931e6d-6562-44ed-a794-55de6ef8cfb3', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:23.307259+00', 'b2dde9f7-99ce-400f-a4c9-08eb9d74202b'),
	('84506c82-2c9d-4c48-8f3c-ac5b40706fcb', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:29.062962+00', '0fc73495-2ba1-4620-b2f6-01b8ce6c05d7'),
	('9ea8f6f5-8417-4488-91ba-83f53b6e29bd', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:29.062962+00', '620e59ee-12ff-4b7a-b07c-1a16c1f2c0bc'),
	('5d2dfe7b-6d30-42f5-96ed-63070afdf894', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:29.062962+00', '891a99b6-cfd3-4eb9-aa3e-db16e6687e4c'),
	('3d22a99a-8261-41bd-8870-9c04cb216119', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:29.062962+00', 'd063100c-6595-40a1-aa71-12d97acc78b7'),
	('8fcccc10-44e7-4f96-aecc-82ce6eae1f0a', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:29.062962+00', 'a7e2dcc7-3b9d-4eb8-b4ff-309969f74d24'),
	('bd61e6cb-0121-4ef8-b061-a33a2edc915f', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:32.567222+00', 'bdadd25b-f356-4dea-b05a-c8c4906b26d1'),
	('ddbcee8f-0c25-4534-af5a-dd14cae29995', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:32.567222+00', '5525e7da-9eb7-4b54-9393-c75ceaae178a'),
	('16cbdbb9-3fc2-4cfa-be76-9d9ca9118eef', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:32.567222+00', 'f724c7a0-7a21-427a-9fb4-b331051524fa'),
	('5600e8e6-b243-4b21-9261-0ba624d7af93', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:32.567222+00', 'ec3066c5-acb1-4fa2-a03e-e3dfc1e2555b'),
	('d41d3132-87de-49ee-bf33-b36fa03e4b79', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:32.567222+00', '504bee00-fb3b-468e-a2d9-25300fec7913'),
	('207e2e55-6535-48ba-a0e0-15c4069d751c', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:34.455418+00', '694d7726-03d7-4b37-8b7a-7f75b3995884'),
	('824e8dba-f66d-4719-8365-42eb0f22884e', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:34.455418+00', 'd5f9426d-0a00-40fa-a9c5-b7ebf3331655'),
	('0f6b7701-dd1c-4312-87c4-1f7497f78662', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:34.455418+00', 'f79e0e9c-ff57-48d7-815b-4556213f8ad1'),
	('668c8ead-7d85-411a-a997-8d362d0cca55', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:34.455418+00', '509373af-8efa-44a9-8830-18437a4cbff2'),
	('55ec0fc5-efcc-44c3-9fc0-4754959804f0', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:34.455418+00', '778db312-4bb9-4074-8d34-7db8aa2d7ea6'),
	('45680a0a-6426-470b-a0ac-2234b0937064', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:35.808564+00', '6a584aab-ea65-4437-b8c5-821e4a1083c4'),
	('675958fc-f13f-4740-bcd7-0635eac429d1', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:35.808564+00', 'd8968363-81c3-4a8c-8e3a-7bfe474eaebe'),
	('ba8f5b87-9c49-4aae-b657-2e254def4395', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:35.808564+00', 'bce989be-e567-4e0c-86d9-c6937acba86f'),
	('d5182737-0a3b-4511-8abb-63b5c026beba', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:35.808564+00', 'eac3e441-437d-45f1-a953-29d75fe665f0'),
	('c9ca967d-c183-4776-b1c3-e352eb4d599a', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:35.808564+00', '76bbb7b2-90f2-4454-a9bc-fd5b8f544d55'),
	('283be576-80a3-49bf-98b2-da1e1f9401a0', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:36.504856+00', '1cbdea75-16bc-4cdf-9ecb-47bf5990ebad'),
	('a46054b7-9bac-4b4f-8740-c2df6b55ac06', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:36.504856+00', 'f6c612b4-d3dc-4840-833b-893437d3b034'),
	('53327690-a619-435c-8dc2-6ea2de129eb9', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:36.504856+00', '7fd94562-33e2-46e6-be44-880565b7eb3f'),
	('d0f50487-337a-4bab-a730-28aa8ea4c9d9', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:36.504856+00', '3b53d7fa-1201-4ed8-b544-1b4ba8cf76cc'),
	('29e39b08-54f7-4f0b-b251-70c9ed457a63', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:36.504856+00', '27d815ec-c0cf-4615-a739-23bf02fd6f76'),
	('552d71f0-f31a-4da2-ab9b-932a4e5b20d5', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:37.21023+00', 'addb97a7-ddb0-4dbb-b35c-5f6f246f5915'),
	('65a4dafb-2f41-4d48-a794-49d0f82066a8', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:37.21023+00', '1793df2c-5763-4275-a15a-75851ead3ce1'),
	('dafed60e-8aa0-46fe-b984-563c5ee9e0c8', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:37.21023+00', '7f6eada4-f6ba-4965-8504-381e9da4d8fb'),
	('e2de15c6-ce2a-456e-abd7-d1fb3c1815c6', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:37.21023+00', 'e919ad89-d0ad-47e3-8b60-fea3f618944b'),
	('a5ae3eae-e117-4694-bfc4-c7a997054cce', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:37.21023+00', '300542cc-4f33-41ae-ae09-7ffa7e768369'),
	('ddecbaa9-8275-49e6-8eb4-e4b718ab09ba', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:38.893396+00', 'dc8e7115-0cc9-4d20-acc8-fb6fd6d77803'),
	('ac458889-7324-4895-98b1-cea26758d765', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:38.893396+00', '860d69fa-4e1b-4ae3-bef0-dfd521b16ec3'),
	('54081182-9f21-4876-aa61-6a5022c67339', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:38.893396+00', '5bd121a2-aa3d-4cd4-8052-747720f99612'),
	('ac0c8d08-3685-49a2-9b3b-29b721ce896e', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:38.893396+00', 'bf0f0034-2c85-48fd-9028-1e03389603e1'),
	('5c8c3749-d7c5-4362-aa18-3a73f84e46f3', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:38.893396+00', '0ee5d85c-fe17-43ff-819a-5665362ebda3'),
	('b8116e81-7465-4f3e-9149-135877cf353d', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:40.319217+00', '3d3afc6b-58d3-4d25-9f22-2a8918756baa'),
	('3da9e55d-cf83-41bb-800d-1237d97660ab', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:40.319217+00', '0d47a708-bdf8-48bb-8403-a7760556b75b'),
	('891f54d7-2404-490b-82a5-ac36a105ec7a', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:40.319217+00', '4383303c-1f1e-49f1-bf37-d41760f33a41'),
	('e8a30790-17a1-4e13-a4f0-6193a789bd16', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:40.319217+00', '1348d066-9ff5-4516-a355-5f03083ca867'),
	('7f2ca6dc-29d9-4581-b3bf-ea81c1842e9c', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:40.319217+00', 'a06b67eb-2ecc-49e5-9eb6-7bf9174402e0'),
	('8d57bf78-33aa-46be-ab37-7f5bbddf0839', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:41.004914+00', '27887454-7130-491f-986d-c602ca9988eb'),
	('9c6a3484-0bec-4c74-a4f9-fd3697f83944', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:41.004914+00', '8a4b9ff9-a92c-486d-99e3-015c9ef50591'),
	('be96601b-1607-4395-b10a-9f9d91970f7a', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:41.004914+00', '3b69d0ea-10ea-400f-8889-75d35e2fbcec'),
	('754ca3f0-4f92-437e-913a-a6fccfe47353', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:41.004914+00', 'b3867883-d1e0-4d91-8e73-738e67cefd77'),
	('406880e5-a336-434b-80b0-fd10db139d6e', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:41.004914+00', '34ec86b0-1d1a-4b40-bd49-8acbd2f86458'),
	('8a3a3469-ffb9-437b-bd4a-558a0f93b37b', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:41.845971+00', '1adc94c7-12d2-4c14-9095-c9533f20b317'),
	('670639e6-ef63-4c14-baaf-15ec0ecefd9c', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:41.845971+00', 'c26a1eac-dde3-471c-8627-73da59d84092'),
	('67bd5fd8-139e-49ec-9ce7-71bc02c38b54', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:41.845971+00', '7f98214b-710b-462f-9e46-369aa0ab3558'),
	('3d2bfae1-8264-444e-8458-15a0694bbb54', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:41.845971+00', '2690e66a-d776-4661-944a-799cb72b179b'),
	('c20dbdec-e23d-4f26-a716-2f1173341107', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:41.845971+00', 'dc9f0dfb-cb41-405e-967c-d37f350ae3a6'),
	('d7bc4e3f-7203-4464-af03-734a4871516e', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:43.3287+00', '7d30c106-a52d-413b-a52f-4174abf67dd8'),
	('c49d29d4-6795-4944-93da-7f3f774268eb', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:43.3287+00', '108ddad5-8118-44bf-9d80-2f852114a23a'),
	('881558b4-04a3-4ea7-8850-1a4bcc88f045', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:43.3287+00', '16ac5991-6d52-4957-8e06-db1321ae19d5'),
	('c537f652-1e58-4d75-bbca-3e968dfda379', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:43.3287+00', '2a1b9d11-be59-46fe-b8f1-e86754cd2123'),
	('208a58b9-e881-45f9-8601-f8c338fd839b', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:43.3287+00', 'a61f74aa-5604-486b-828f-884e190cccee'),
	('b9e5fb36-0210-4d00-9824-012170803d98', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:44.204898+00', 'd21b28df-f3cd-4a88-9451-e48a82f71b0d'),
	('80e5a693-6d83-4380-b0d6-fa7b4ced6759', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:44.204898+00', '53938cd7-c6e8-4a1c-989c-085fa7023e4d'),
	('0162b01a-92d0-483e-973c-0df7c4eda75b', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:44.204898+00', '49fe7b9f-6557-4cc2-aef4-52c2fc42a265'),
	('fd765522-60d4-43d8-8461-a05882ebc914', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:44.204898+00', '7a180537-4460-40ed-a1d5-925ab5e738a0'),
	('bd693a95-e90a-4cbb-9f48-d7ded4366c5a', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:44.204898+00', '8e59790e-94e3-47cb-96c9-2ffd6408901c'),
	('eb7ad870-32aa-49f2-9bae-27efaee3a72f', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:44.82816+00', 'a7340964-183f-4413-88be-eae10dd01e62'),
	('5299c8b4-6c56-4a9d-a840-59634792e67d', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:44.82816+00', '5f7406a2-165b-4a65-be0c-26261518fcff'),
	('d8a4d749-9d38-4544-abdb-80508af2942e', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:44.82816+00', '961a0be4-6dd3-40c9-9c8e-8ca4e0793f3e'),
	('3b1524ee-5b6a-477f-9724-822fb5e96905', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:44.82816+00', '2629742c-d790-4c33-a14b-d42cbf5cb517'),
	('985b71bb-e602-446e-bb0a-8e926e47ca98', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:44.82816+00', '128d435b-dae1-4faa-9415-b3361f05fee0'),
	('7b97e85c-bfc7-4d20-85ae-d7bb16cba9e3', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:46.603715+00', '9e376a23-a5f2-4e94-bd33-9e443071aa27'),
	('2920b307-14db-4af8-98c7-dcca1e854867', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:46.603715+00', '661b2283-8b55-4c2a-a272-d7e7a5a38f2d'),
	('5dfd360f-ff1b-4f87-bcaa-6d9387536dd8', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:46.603715+00', '6bee6fb3-1ef7-4101-ad6c-7d8f7c839d59'),
	('5c0998ba-d8ca-4bf5-96de-5223464f50e3', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:46.603715+00', 'f1419b7c-3b5b-4488-9ed0-e2c36499e5d0'),
	('5ee3b141-d797-48d8-9b4c-a043530075d6', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:46.603715+00', 'bc6348f6-b70a-4983-b923-de9940370fdd'),
	('771a036f-c891-440a-8f91-770e2692a5e4', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:47.514778+00', '78a8d737-9bdf-4543-9a6c-4ecd70ed9433'),
	('d263d837-4419-4263-989e-9f5f44a75be5', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:47.514778+00', '013107d4-0057-4cfa-88a0-c693b55e6ee9'),
	('30b857bc-75c9-4035-a92a-f331aeb1a417', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:47.514778+00', 'f7d8f9c9-6605-4935-b583-544acb79ebe1'),
	('90dad715-7870-466c-982c-2224c2d27d0d', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:47.514778+00', 'e92ea569-147c-4d41-8f7f-c4ae5d164cef'),
	('7978f498-ff62-47be-91fc-d1185c556565', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:47.514778+00', 'dd878852-0d4a-4a33-8b19-bd1e43cc60bf'),
	('ba358a40-d850-42f2-8bea-c80ade757d86', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:48.543139+00', '071304ff-d38a-4fce-9c79-ec21db74c7a0'),
	('d7937ee8-1059-4d8e-be85-23b7389209b6', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:48.543139+00', '596e53cb-efe3-491b-bf00-4d49cf37f889'),
	('582e9ee2-fe41-4835-910e-427ac9ed797b', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:48.543139+00', 'd2978680-8a38-4cc1-ae53-0e734520f2ae'),
	('889efc7f-45f1-4b1c-973d-627d846ad478', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:48.543139+00', '4d6a5db8-b136-43a3-beeb-43bbee4603eb'),
	('b4e19d80-827a-4ece-b33e-4e39fbb753fe', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:48.543139+00', '4f19a3bb-f6e0-4778-aa7d-86a6af5e43b9'),
	('2a656503-a8e8-4029-9031-ad068df39fab', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:51.54676+00', '13595de5-8c7b-4504-9000-780f55f17423'),
	('3cdf48f2-4397-4a13-ad9a-b44dd0e8726b', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:51.54676+00', '8f65f432-59b3-4cc3-9e47-53cc0de13608'),
	('bb4d5db9-e0dc-455f-bc08-99601036bde4', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:51.54676+00', '89250490-b289-4ecb-b46f-c1042b502482'),
	('123b7a62-3b30-49fb-9902-afee6e238102', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:51.54676+00', '198cc967-8d09-48e1-a608-a6579d8e0da8'),
	('b0535e5c-14a4-477a-acea-282a1c92b63b', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:51.54676+00', 'd3a4283a-6a20-4911-979e-864d9d0b80af'),
	('3d41f1d3-c9b5-47d3-9b45-6cc4532fb38a', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:53.092703+00', 'd895099b-aaae-42da-a53c-d67bac2ce730'),
	('f1f2650c-33f1-4817-a566-48378b1f1f4a', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:53.092703+00', '83b93b8a-52af-4996-8c97-a0766a049bd4'),
	('6f8a6370-5b17-4dae-a4e2-e62e111ea05c', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:53.092703+00', '054af1f8-53db-4d3c-8634-9250d9d4ea9f'),
	('eced046c-6c4d-4a39-92fd-a89e0eb8e5fc', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:53.092703+00', '19782793-2c60-4635-a09f-f26859aada77'),
	('c76a22c3-41d8-43fb-ba04-5cfba350753a', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:53.092703+00', '25249ce4-de50-4cbf-a879-fbca57a60f90'),
	('049b7d63-4bed-44bc-91c0-ef094c693b16', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:54.769581+00', '9798e39d-0b19-463f-a9fb-2cde533f8016'),
	('4231cd68-81ba-4459-92c7-da98b7fc0023', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:54.769581+00', '42db7d00-5064-4106-86da-b6d0f2d3f382'),
	('5990ec81-5295-453a-a80d-7ebb80e7a1f7', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:54.769581+00', 'd57c54c4-67b7-4932-b53c-5dc620b15d87'),
	('a049bbac-05a1-43c3-9fc7-b4a92050dabc', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:54.769581+00', 'c0b833fb-1d16-4ab2-b53d-36163ed4722a'),
	('e4cfe54d-4be1-49c6-a219-feeb42842757', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:54.769581+00', '677c54e7-d062-4aa4-98fe-95abca82e453'),
	('c5f36fb4-613a-4516-ba82-af8aba80e6ac', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:59.545435+00', 'c673d817-bffc-426b-b73e-b9a89c699e43'),
	('037b8462-3da1-45e7-b315-6dba346cb0ac', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:59.545435+00', '43f8b81b-1837-4df4-806c-2bacf19c091a'),
	('44b5088f-6f89-43ca-b55a-a3b027d4225f', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:59.545435+00', '3aaed23b-58cb-4aac-94bf-827aba07c080'),
	('fdb6624f-6602-43c9-82a1-6c11d50dabb8', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:59.545435+00', 'f953a455-acbe-460d-bb7e-c0c8a080552f'),
	('28f87ac8-925d-4847-9679-d6be4c4f6ec4', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:59.545435+00', '9f1ac211-4188-483e-ab94-2d17f4291a47'),
	('72a9db47-55cc-4e24-b9bb-ff31f439d327', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:00.452042+00', '7e203562-f867-445d-aac0-64439542a5d4'),
	('b25d142b-e979-402a-83c6-eda55d99f21a', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:00.452042+00', 'dbf112d1-1275-4ce1-9526-3c95be5f506e'),
	('7d20c76f-f643-40bf-8c01-9a4ee7ed57b5', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:00.452042+00', '20b0023f-93d0-4a56-a2a1-13c2d9bb4b65'),
	('e286ff54-939d-4402-891c-efbd58cd24c8', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:00.452042+00', '12a6f5e8-7e56-43cb-a96c-6ffef2cfbf0c'),
	('5945197d-e61a-4a04-8538-a9cbb6fa5845', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:00.452042+00', '3d347c9e-ca4c-4975-98cd-41861d46a6c0'),
	('9922a56a-7441-4f19-bead-3211efcc967a', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:02.441218+00', 'd2de7323-1ab6-4300-a4b2-6425759d4603'),
	('83fb6c96-5a77-40a0-b47e-b3431738fdf8', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:02.441218+00', 'ab45228d-a45a-4ae4-9983-02c3d8e67712'),
	('0d1f6f5a-a1f6-48be-8bd3-9eed843e4e27', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:02.441218+00', '497993b8-693d-427c-87cc-3b3faa8363eb'),
	('c1eb7a5f-e72d-4c1a-aa5c-a75a97f1120f', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:02.441218+00', '7b6a8258-7cba-4ac8-808f-9170a51bb7c0'),
	('ad3d1d38-ab20-4071-b1ee-020c4fe53f83', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:02.441218+00', '65109c6c-fd85-4424-9c92-2f1db44a8c57'),
	('7168d715-9b36-4194-8cfa-1d3e1cd7c430', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:03.880602+00', '5e02b5fe-1aa8-473b-baab-c41230e2de04'),
	('8d3cdc07-7384-491f-9d78-f7143f887e3b', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:03.880602+00', 'e8e902d4-482f-4be8-9d0a-ff1c1c25a984'),
	('6d02df32-eb1f-4dba-8027-5a5a1e0a504d', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:03.880602+00', '452f4a09-f1be-4e0b-8047-447d60a264cc'),
	('f2ea53b1-002a-4cab-bc31-0879d131feeb', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:03.880602+00', 'a607467b-478e-4d1c-9b9b-4239268078c2'),
	('0848ecc4-03b2-4e3d-9f2f-eefd7cd871bc', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:03.880602+00', '52fbace0-80c3-413d-b6c8-24021ad846a9'),
	('6b5826af-5832-4a0b-b497-11e4f5264678', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:04.660978+00', '67a8cf46-30fb-430d-b453-10b1b7037698'),
	('4c46c595-3201-4d6a-be6b-ca68c3fa818f', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:04.660978+00', '0e0c89e6-546b-4dd1-8a0c-d5d243f47d5e'),
	('375c506b-1736-4e31-9035-24817b9c0cb0', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:04.660978+00', 'fd6eb687-e245-45e4-bacb-8354fb4d9a37'),
	('7236d5e6-df25-444f-b96e-693c4db4df97', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:04.660978+00', 'caed8915-40e9-446f-838b-60f66e16d896'),
	('2d699dbb-3773-4d91-ae10-645b31d9d691', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:04.660978+00', '6d5b38c2-49f3-4243-abfe-cbf67ca369b2'),
	('58bbae84-441d-4e4b-b6a8-caaa1e3b99e2', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:05.410196+00', '38d9a61a-d5a6-415b-804e-e4dd6220e01b'),
	('545171cf-532a-489c-9314-99152fbd5030', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:05.410196+00', 'f810e3a6-c8e7-41c1-aa1b-85f8b9546909'),
	('8aa8d16a-f669-42e9-9560-534b5637c75f', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:05.410196+00', '3cc5eff8-ee14-43ff-b67d-00b6d5f3668f'),
	('f8cdcffc-fb82-40e5-8e8a-d5927ded1e04', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:05.410196+00', '578ee082-a136-4e5e-93c1-d6bbec3a24ef'),
	('971d8c79-e857-448d-a7d1-37f66e7ea03c', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:05.410196+00', '2100badb-dba3-4e54-ac23-57363f7d52ef'),
	('a89c5c0c-0700-4a20-afd6-c8388fe1460c', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:27:50.032589+00', '0b9210e5-83d8-4670-8768-3492953c6c82'),
	('355d9d1a-f69d-415b-9947-46b12f9b5dd1', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:27:50.032589+00', '44e9fee3-67e8-4073-983d-a4a73ab48fb9'),
	('f252a93e-61ac-4070-99cf-e56b485ce813', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:27:50.032589+00', '9bc3a170-ef6d-468d-9f2e-6e8990068b07'),
	('88164b9b-c7a3-4a3c-a01f-37082af5e763', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:27:50.032589+00', '320cd35b-0308-4803-8ac7-94116dbdca13'),
	('fc5e7c2a-8f96-4b10-a9a8-a9e21db4a81b', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:27:50.032589+00', '55f3faaf-c4af-4ccb-a6fd-d731119a2bfb'),
	('54969e43-6aa4-4d3b-b87f-87c437d1701a', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:01.256993+00', '3b43c05f-da0f-4ff0-af11-a22b1239f96e'),
	('7c9c9abd-5888-47ce-83af-96aabfc331ba', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:01.256993+00', '1e56c843-f057-488d-97a3-c065e90ad876'),
	('2222ce12-4c34-4cd3-82aa-648175157a3b', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:01.256993+00', '56a865cc-0cb5-483b-8a46-c5e5c2259df1'),
	('cb9a8af8-7f3c-4270-b84a-14fa6f46172c', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:01.256993+00', 'fdd0b1d0-af5f-4db3-8415-64432b4e496a'),
	('93a7a213-55c9-4f2d-81f0-e889a4c68698', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:01.256993+00', 'ce3b311b-afec-49cd-ac27-187d4385158f'),
	('069d7731-fc61-4e07-9d29-056679226e0b', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:09.679205+00', 'b57e33d1-ee15-448e-a2e7-daa8c7921b26'),
	('18a8e47e-be6d-415d-b8aa-eb70f9528b87', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:09.679205+00', '5a1c1e03-981d-4576-a954-7397b9770547'),
	('5018cb6f-406f-4b73-98bb-463ac8233193', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:09.679205+00', 'fd765674-ce61-432a-860a-62757861c00d'),
	('d9b3f0cd-96dc-4ced-beb2-ee6dde839dd0', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:09.679205+00', 'bfde5035-e623-4223-aed4-115985e8276b'),
	('98921463-a611-433a-b9ad-0d17487fddee', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:09.679205+00', '6684f316-ea3d-45d0-bd0d-ecc6a1263a50'),
	('a60c218a-b2dc-464b-ae35-e89034b3d61b', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:11.203827+00', '033c2db3-f9fe-45ae-ac0c-11511222438e'),
	('36034453-52fd-49a2-9aab-98e6c2791d04', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:11.203827+00', 'd2c14726-688a-4f6c-b8ad-061cf2279a17'),
	('d76d1867-42f7-4ef7-8e9a-e550100ac6c0', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:11.203827+00', 'eef92767-5806-40f7-9f42-220742f4f365'),
	('766da823-5254-4c5d-9b49-ca28e8b8fdfd', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:11.203827+00', '641855fd-c003-43f2-a1a7-1c9e2bf51c48'),
	('1d0da419-aa98-4e08-9fde-8c3ee3e9fc4b', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:11.203827+00', '759a5de5-68d3-4f6e-8396-f733e02606ee'),
	('3d46879b-4174-4717-a006-6fb313f30256', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:12.516483+00', 'fe5dd791-8ba6-4783-934d-a8919814053b'),
	('114175c1-cc78-4d59-b737-12b3737fd864', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:12.516483+00', '69a4dcf4-4054-417c-a289-22b7d2d40626'),
	('aea6d2c9-ed9a-4402-8a12-105c603d6049', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:12.516483+00', '7e414f44-0c72-47b5-ba8d-fa77cff58207'),
	('599cc449-697f-4c2d-b56c-c281c1b433a9', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:12.516483+00', '84462db0-ff35-48fe-b12b-07f4f9af701e'),
	('7b852400-3821-46cf-8b90-76687b0a976d', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:12.516483+00', '66a9929b-424f-4cbd-8541-39794519b5cc'),
	('437986dc-d728-4010-b82f-f260612410bc', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:05.983802+00', '75f40297-15e9-46e9-b7e5-b75e6e75318c'),
	('706e92cb-d286-4da1-80f1-541b60a65719', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:05.983802+00', 'ba8a36b9-f6ff-4c5f-8f51-a3a1d64d5a01'),
	('a0a7270e-4dbb-4b58-be04-b4fc7312f657', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:05.983802+00', '3aab6677-00be-41d5-b733-ad529738a0e4'),
	('14ba12e3-46ad-4c99-91dd-3da7d316a5a3', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:05.983802+00', '6f63e39a-c0e7-4b02-9fc0-e58688ea0f1c'),
	('f48b4fd7-0352-481c-96dc-69612a37f0d0', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:05.983802+00', '515f4787-5a98-422b-9feb-6a8aae90f3df'),
	('8d026156-fdd4-4a6f-beed-90ab75dc59a6', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:06.790321+00', '718317ff-dacd-473d-8d74-645027a34f2b'),
	('3f8d0b93-bad3-4b41-ae54-441497d17bf4', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:06.790321+00', '0cdfa6b7-bcfc-4346-a68d-698ecc64dd71'),
	('9a602249-cd69-4422-9334-65c670325ff1', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:06.790321+00', '36b8fd34-cd7a-40fc-ab69-e001f225e1a5'),
	('66a26819-f227-4f57-a7ef-0b222aae675d', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:06.790321+00', '072d775f-e767-48d1-88c4-7b5e11a79cbb'),
	('0732c26d-2082-4180-aaa4-e8bb8b054002', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:06.790321+00', '82cfd275-4f59-4db3-ad9d-2cfb09f2c955'),
	('e790a6e3-9046-4671-9c3b-50f3942ecc81', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:07.695307+00', '6084f204-3fc2-44f6-b596-672772b34c4a'),
	('3d4d3452-4ecf-40d2-a74a-0da21a6aae05', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:07.695307+00', '390a22df-8a62-41ff-891f-6962cf590572'),
	('157d451c-5662-417a-96e0-52fdd71242b7', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:07.695307+00', '75f2b811-c032-4c0c-87e7-f7274c4c0bd9'),
	('b7a48e4b-2512-408f-a77e-40b140593dd5', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:07.695307+00', 'b6febadd-4947-4b00-8c4c-563452e931ae'),
	('bc4bbbaf-76e7-44c2-8646-9c04e85f7560', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:07.695307+00', '1d0cec69-26db-4ca2-bf9e-03af6f24a1b3'),
	('670af633-975f-4365-b735-b71e494cdf41', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:08.35311+00', '2cbaf6fb-d808-42ec-9f84-e7ed0294fac5'),
	('fdea16b3-5b7f-43e5-bcf2-7079b34bcd58', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:08.35311+00', '488d4f82-5d3b-4f5b-be9a-d7ab02db9a12'),
	('83778968-c279-47de-91fb-c80948d521f4', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:08.35311+00', '9b36b026-2640-417d-a368-debbecfb93f0'),
	('54a0096f-0652-4829-8e6d-02e57e44d062', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:08.35311+00', '132dbe65-43fb-40fc-a201-cc020cbbbadb'),
	('0b48ab08-f979-49b3-8a53-eaf6d33db796', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:08.35311+00', 'b7799d38-0e7c-491f-9fd8-e4a80b68992c'),
	('d8f1953a-cbc4-4f80-af8c-f72ed0eb5730', 'pakistan mobilink', '0.012', 'non-cli', '20', '3', '20', '200', '9230', '0', '0.01440', '2024-03-09 15:28:09.118493+00', '477dc01b-2519-4f5f-b7a1-0c26bc8561f8'),
	('e6857d25-815a-4903-8677-1b778817a50e', 'pakistan zong', '0.009', 'non-cli', '20', '2', '30', '100', '9231', '0', '0.01080', '2024-03-09 15:28:09.118493+00', '61c103b4-2d8c-4ace-bce6-1d2bf0ed2433'),
	('bb61b370-b84d-4ba7-9ade-7c27f5c8b7ab', 'pakistan warid', '0.012', 'non-cli', '25', '2', '40', '100', '9232', '0', '0.01440', '2024-03-09 15:28:09.118493+00', '9270f8e6-2d0d-4d58-946e-107100d9f867'),
	('a9199654-5677-4e63-aeb9-787fc598afe1', 'pakistan ufone', '0.011', 'non-cli', '15', '2', '32', '100', '9233', '0', '0.01320', '2024-03-09 15:28:09.118493+00', '79a7ee83-e73c-48ac-94f7-6b2b31b01c36'),
	('b6273d5b-1162-4611-bfde-1c85688552ce', 'pakistan telenor', '0.024', 'non-cli', '12', '3', '33', '100', '9234', '0', '0.02880', '2024-03-09 15:28:09.118493+00', '522135cf-5743-4336-87b9-79b66b86e594'),
	('bc392568-b4cf-494d-9f04-2b3446b9f38b', 'India', '0.0078', 'tdm', '30', '4', '30', '200', '91', '0', '0.00456', '2024-04-14 15:03:31.613063+00', 'd04e826f-2608-4bde-86e4-8c8212f2d0ba'),
	('2d5be855-53f7-4ea3-9065-636b24854faf', 'india', '1000', 'sms', '12', '21', '31', '500', '91', '13', '1200.00000', '2024-04-15 23:51:01.630847+00', 'f7c61a05-44bb-4dcb-a907-c27d7050bfc7'),
	('7d600675-873e-4e6f-b4b6-a098ab242385', 'india', '1000', 'sms', '12', '21', '31', '500', '91', '13', '1200.00000', '2024-04-15 23:51:02.456405+00', '440cf1ed-5d24-4e45-8600-c116ab56f9a8');


--
-- Data for Name: selected_routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."selected_routes" ("route_id", "id", "user_id") VALUES
	('ff40b46f-f08d-4fbc-bcdb-adffa9c9ec9a', '21ab6466-9acc-47cc-b491-0c66ad938ffb', '77423768-f3cf-44c9-b83c-f72da1cb9a0b'),
	('e830a1f1-2cd6-4829-9886-c7f0eead254d', 'ce1dd72a-2b39-4e61-bced-9494e6eeb964', '108d34df-fb4f-483d-9fcf-b63b24fae944');


--
-- Data for Name: targets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."targets" ("id", "client_id", "destination", "rate", "route_type", "asr", "acd", "ports", "capacity", "created_at", "updated_at", "destination_code", "pdd", "buying_rate") VALUES
	('e933ba6b-d95d-48fd-8a2d-6d2d167a8178', 'c63da6ec-e43a-4d76-9c5d-a9c1f75d3387', 'Usa', '0.02', 'cc', '50', '0.30', '500', '500', '2024-02-06 09:12:37.508657+00', NULL, '1', '0', 0.01600),
	('71f4409f-208b-4244-9687-76e64279ad92', 'c63da6ec-e43a-4d76-9c5d-a9c1f75d3387', 'China', '0.15', 'cc', '15', '0.40', '500', '500', '2024-02-06 09:12:37.508657+00', NULL, '86', '0', 0.12000);


--
-- Data for Name: targets_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO roles (role_name, description) VALUES
('Admin', 'Administrator with full access'),
('Manager', 'Manager with specific privileges'),
('Accountant', 'Accountant with financial access'),
('Salesman', 'Salesperson with sales access'),
('NOC', 'Network Operations Center staff'),
('Technical', 'Technical staff with system access');


--
-- Data for Name: wallet; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: watchlist; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1737, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: bank_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."bank_accounts_id_seq"', 17, true);


--
-- Name: invoices_invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."invoices_invoice_id_seq"', 560, true);


--
-- Name: notifications _notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."notifications _notification_id_seq"', 1, false);


--
-- Name: payments_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."payments_payment_id_seq"', 30, true);


--
-- Name: wallet_wallet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."wallet_wallet_id_seq"', 1, false);


--
-- Name: watchlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."watchlist_id_seq"', 15, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
