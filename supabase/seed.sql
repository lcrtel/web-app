SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

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

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '3e05b86a-fa74-44ef-85f3-f284c915b702', '{"action":"login","actor_id":"63f8e39e-edee-4884-b7af-c772cea5fcbf","actor_username":"lcrtelweb@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-22 07:11:30.200189+00', ''),
	('00000000-0000-0000-0000-000000000000', '67d80397-a9d7-4ed1-9296-f53ea2a6c901', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"manager@sales.lcrtel.com","user_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","user_phone":""}}', '2024-10-22 07:14:25.48434+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e3e2cfc-0c27-4c57-b28d-ce42a5c6e27f', '{"action":"logout","actor_id":"63f8e39e-edee-4884-b7af-c772cea5fcbf","actor_username":"lcrtelweb@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-22 07:14:36.653204+00', ''),
	('00000000-0000-0000-0000-000000000000', '19b45388-c02a-448e-8ce3-774d11623ef9', '{"action":"login","actor_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","actor_username":"manager@sales.lcrtel.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-22 07:14:48.725976+00', ''),
	('00000000-0000-0000-0000-000000000000', '114acf38-a90a-40fd-a984-1f6dbe808650', '{"action":"logout","actor_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","actor_username":"manager@sales.lcrtel.com","actor_via_sso":false,"log_type":"account"}', '2024-10-22 07:18:01.584003+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ec4bed5-8450-41e2-ad96-6eb6367404a5', '{"action":"login","actor_id":"63f8e39e-edee-4884-b7af-c772cea5fcbf","actor_username":"lcrtelweb@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-22 07:18:14.252138+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b0c09b95-d43b-4e2f-b1da-c80257ec7484', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"executive1@sales.lcrtel.com","user_id":"3c05310f-dcb2-4291-b5ba-1eb7a5a2303c","user_phone":""}}', '2024-10-22 07:22:38.508474+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd143298c-9075-4feb-ac9c-3ea933ddc2e3', '{"action":"logout","actor_id":"63f8e39e-edee-4884-b7af-c772cea5fcbf","actor_username":"lcrtelweb@gmail.com","actor_via_sso":false,"log_type":"account"}', '2024-10-22 07:22:56.840169+00', ''),
	('00000000-0000-0000-0000-000000000000', '09d035e3-30ba-42d9-8a5a-e17ed983bbc8', '{"action":"login","actor_id":"3c05310f-dcb2-4291-b5ba-1eb7a5a2303c","actor_username":"executive1@sales.lcrtel.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-22 07:23:10.776659+00', ''),
	('00000000-0000-0000-0000-000000000000', '54ee1d79-2185-4249-a0e8-45ca6e80ddfb', '{"action":"login","actor_id":"3c05310f-dcb2-4291-b5ba-1eb7a5a2303c","actor_username":"executive1@sales.lcrtel.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-22 07:23:26.171287+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd33a56f-d789-4f69-9f46-47d0b86e7e06', '{"action":"logout","actor_id":"3c05310f-dcb2-4291-b5ba-1eb7a5a2303c","actor_username":"executive1@sales.lcrtel.com","actor_via_sso":false,"log_type":"account"}', '2024-10-22 07:24:08.626426+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae70e62a-d566-4aab-963c-a9c1e82fcdbe', '{"action":"login","actor_id":"3c05310f-dcb2-4291-b5ba-1eb7a5a2303c","actor_username":"executive1@sales.lcrtel.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-22 07:24:35.262323+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b05789f-9c56-4715-9028-61f85f4f8b2b', '{"action":"login","actor_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","actor_username":"manager@sales.lcrtel.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-10-22 07:24:44.38365+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e8ced03a-ccc5-4837-9416-25e9841bcdb0', '{"action":"token_refreshed","actor_id":"3c05310f-dcb2-4291-b5ba-1eb7a5a2303c","actor_username":"executive1@sales.lcrtel.com","actor_via_sso":false,"log_type":"token"}', '2024-10-22 08:32:52.223674+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8ac696e-5591-4d79-a8c3-79d44c2562d6', '{"action":"token_revoked","actor_id":"3c05310f-dcb2-4291-b5ba-1eb7a5a2303c","actor_username":"executive1@sales.lcrtel.com","actor_via_sso":false,"log_type":"token"}', '2024-10-22 08:32:52.228729+00', ''),
	('00000000-0000-0000-0000-000000000000', '90185bd7-3204-4e30-a9b3-de597b76091d', '{"action":"token_refreshed","actor_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","actor_username":"manager@sales.lcrtel.com","actor_via_sso":false,"log_type":"token"}', '2024-10-22 08:36:59.820968+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ae7f51ac-6f66-4228-9a90-c7ec7da28cd5', '{"action":"token_revoked","actor_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","actor_username":"manager@sales.lcrtel.com","actor_via_sso":false,"log_type":"token"}', '2024-10-22 08:36:59.821633+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e31acdce-9eaa-44d4-9ae4-67c6b337a19c', '{"action":"token_refreshed","actor_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","actor_username":"manager@sales.lcrtel.com","actor_via_sso":false,"log_type":"token"}', '2024-10-22 08:37:00.021358+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bf38d1c-63a0-40fd-8644-e688a1fd27b3', '{"action":"token_refreshed","actor_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","actor_username":"manager@sales.lcrtel.com","actor_via_sso":false,"log_type":"token"}', '2024-10-22 08:37:00.076098+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd13a34f7-5d3b-4fc1-9f92-6ce864a3bd43', '{"action":"token_refreshed","actor_id":"82a0feb6-89df-4841-b2bb-7b8505e57697","actor_username":"manager@sales.lcrtel.com","actor_via_sso":false,"log_type":"token"}', '2024-10-22 08:37:00.117166+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'authenticated', 'authenticated', 'pkmymoongd@gmail.com', '$2a$10$CfmCkOn3qM7M/hVkIlQWGuBk8bZ85p.8XZjakFzYpqE0NSPMu5U.2', '2024-08-17 07:14:32.835474+00', NULL, '', NULL, '', NULL, '', '', '2024-08-17 14:22:23.656695+00', '2024-08-17 14:23:42.709496+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "8a777b71-e825-4754-9f06-21b2ad83d9af", "name": "Mymoon P K Muhammad", "email": "pkmymoonpk@gmail.com", "phone": "9539941964", "skype_id": "mymoonpk", "company_name": "PKM", "email_verified": false, "phone_verified": false}', NULL, '2024-08-17 07:12:38.064415+00', '2024-08-17 14:23:42.713761+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'authenticated', 'authenticated', 'pkmymoonpk@gmail.com', '$2a$10$A23L/EJ45Cg7N40L5VY9.uPFIw30zwb2dUcFqS8IR2IjT8cg9Z1sy', '2024-08-17 14:32:07.983644+00', NULL, '', '2024-08-17 14:31:47.300211+00', 'pkce_9458da9fa614713794df18c0714b15f07c6186b2ced3730fb0d86c34', '2024-08-18 06:28:02.298938+00', '', '', NULL, '2024-08-17 15:34:16.151507+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "8e518fc5-f963-400e-b4cc-e8af108077bf", "email": "pkmymoonpk@gmail.com", "email_verified": false, "phone_verified": false}', NULL, '2024-08-17 14:29:19.645681+00', '2024-08-18 06:28:05.990565+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', 'authenticated', 'authenticated', 'executive1@sales.lcrtel.com', '$2a$10$RrJULZq2jUilclY23NHex.sIlq5mcekwKhFx9MK4dnp.p3Y1.UCtu', '2024-10-22 07:22:38.509337+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-10-22 07:24:35.263259+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Sales Executive 1", "email": "executive1@sales.lcrtel.com", "phone": "1234567890", "company_name": "LCRTel"}', NULL, '2024-10-22 07:22:38.50209+00', '2024-10-22 08:32:52.231335+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '63f8e39e-edee-4884-b7af-c772cea5fcbf', 'authenticated', 'authenticated', 'lcrtelweb@gmail.com', '$2a$10$NIF1mnCr5Z0zywFwiQLziOYo2PAJIW5ib.uIQ454gNXXVIv5URMv2', '2023-11-06 09:12:56.600872+00', NULL, '', '2023-11-06 09:11:55.615147+00', '', '2023-11-06 10:11:06.315338+00', '', '', NULL, '2024-10-22 07:18:14.253019+00', '{"provider": "email", "providers": ["email"]}', '{"name": "LCRTel", "role": "admin", "email": "lcrtelweb@gmail.com", "phone": "9539941964", "agent_id": "", "skype_id": "", "company_name": "LCRTel", "noc_department": {"name": "Mymoon", "email": "nihalshafi09@gmail.com"}, "noc_dipartment": {"name": "NICETALK NOC", "email": "noc@nicetalk.com"}, "sales_dipartment": {"name": "NICETALK Sales", "email": "sales@nicetalk.com"}, "finance_department": {"name": "aman", "email": "finance@aa.com", "phone": "9539941964", "skype_id": "asdfadsfds"}}', NULL, '2023-11-06 09:11:55.610867+00', '2024-10-22 07:18:14.255365+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '82a0feb6-89df-4841-b2bb-7b8505e57697', 'authenticated', 'authenticated', 'manager@sales.lcrtel.com', '$2a$10$DrTJI7WWnixfmW6POVlRQe0s9lypCSrKAPs6nijoqTO3j.7naA6zu', '2024-10-22 07:14:25.485182+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-10-22 07:24:44.385777+00', '{"provider": "email", "providers": ["email"]}', '{"name": "Sales Manager", "email": "manager@sales.lcrtel.com", "phone": "1234567890", "company_name": "LCRTel"}', NULL, '2024-10-22 07:14:25.478679+00', '2024-10-22 08:36:59.823679+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('63f8e39e-edee-4884-b7af-c772cea5fcbf', '63f8e39e-edee-4884-b7af-c772cea5fcbf', '{"sub": "63f8e39e-edee-4884-b7af-c772cea5fcbf", "email": "lcrtelweb@gmail.com"}', 'email', '2023-11-06 09:11:55.613177+00', '2023-11-06 09:11:55.613211+00', '2023-11-06 09:11:55.613211+00', 'bdfcfa52-a800-4e10-881f-84c7d77ad8f3'),
	('8a777b71-e825-4754-9f06-21b2ad83d9af', '8a777b71-e825-4754-9f06-21b2ad83d9af', '{"sub": "8a777b71-e825-4754-9f06-21b2ad83d9af", "name": "Mymoon P K Muhammad", "email": "pkmymoongd@gmail.com", "phone": "9539941964", "skype_id": "mymoonpk", "company_name": "PKM", "email_verified": true, "phone_verified": false}', 'email', '2024-08-17 07:12:38.091242+00', '2024-08-17 07:12:38.091313+00', '2024-08-17 14:23:42.706241+00', '33e55130-43b0-4364-8b04-de7cc8608c9b'),
	('8e518fc5-f963-400e-b4cc-e8af108077bf', '8e518fc5-f963-400e-b4cc-e8af108077bf', '{"sub": "8e518fc5-f963-400e-b4cc-e8af108077bf", "email": "pkmymoonpk@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2024-08-17 14:29:19.652195+00', '2024-08-17 14:29:19.652245+00', '2024-08-17 14:29:19.652245+00', '71be3c14-9f3c-4574-9541-1bef0953b6b8'),
	('82a0feb6-89df-4841-b2bb-7b8505e57697', '82a0feb6-89df-4841-b2bb-7b8505e57697', '{"sub": "82a0feb6-89df-4841-b2bb-7b8505e57697", "email": "manager@sales.lcrtel.com", "email_verified": false, "phone_verified": false}', 'email', '2024-10-22 07:14:25.483552+00', '2024-10-22 07:14:25.483585+00', '2024-10-22 07:14:25.483585+00', '69528100-ce5b-4014-aba9-c3a73ba4343d'),
	('3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', '{"sub": "3c05310f-dcb2-4291-b5ba-1eb7a5a2303c", "email": "executive1@sales.lcrtel.com", "email_verified": false, "phone_verified": false}', 'email', '2024-10-22 07:22:38.506789+00', '2024-10-22 07:22:38.506822+00', '2024-10-22 07:22:38.506822+00', '9fa83430-c2c1-46f1-ae1e-6e8f75d3331b');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('df5d5a27-ae82-46cd-93a5-330db8a83a8a', '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', '2024-10-22 07:24:35.263295+00', '2024-10-22 08:32:52.232553+00', NULL, 'aal1', NULL, '2024-10-22 08:32:52.232502', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15', '192.168.65.1', NULL),
	('c99df14b-5c5d-43ef-be93-dc529eb45511', '82a0feb6-89df-4841-b2bb-7b8505e57697', '2024-10-22 07:24:44.38584+00', '2024-10-22 08:37:00.117861+00', NULL, 'aal1', NULL, '2024-10-22 08:37:00.117821', 'Next.js Middleware', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('df5d5a27-ae82-46cd-93a5-330db8a83a8a', '2024-10-22 07:24:35.265895+00', '2024-10-22 07:24:35.265895+00', 'password', '754e20a3-0a25-47bd-8cd7-fd5287736db9'),
	('c99df14b-5c5d-43ef-be93-dc529eb45511', '2024-10-22 07:24:44.387454+00', '2024-10-22 07:24:44.387454+00', 'password', '522fc516-49a4-4054-b8f9-8f270e6ae7db');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 1868, 'CNLRtbzl3ldK1qZU52cwag', '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', true, '2024-10-22 07:24:35.264317+00', '2024-10-22 08:32:52.229195+00', NULL, 'df5d5a27-ae82-46cd-93a5-330db8a83a8a'),
	('00000000-0000-0000-0000-000000000000', 1870, 'h1pPfaWm-ajIzI7kn-CAhg', '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', false, '2024-10-22 08:32:52.230375+00', '2024-10-22 08:32:52.230375+00', 'CNLRtbzl3ldK1qZU52cwag', 'df5d5a27-ae82-46cd-93a5-330db8a83a8a'),
	('00000000-0000-0000-0000-000000000000', 1869, '0lgvUpbQjh7ejLrAbz0CuQ', '82a0feb6-89df-4841-b2bb-7b8505e57697', true, '2024-10-22 07:24:44.386672+00', '2024-10-22 08:36:59.82214+00', NULL, 'c99df14b-5c5d-43ef-be93-dc529eb45511'),
	('00000000-0000-0000-0000-000000000000', 1871, 'g3MFWAuJg0k_18UjXyZwVA', '82a0feb6-89df-4841-b2bb-7b8505e57697', false, '2024-10-22 08:36:59.822701+00', '2024-10-22 08:36:59.822701+00', '0lgvUpbQjh7ejLrAbz0CuQ', 'c99df14b-5c5d-43ef-be93-dc529eb45511');


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
-- Data for Name: config; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."departments" ("id", "created_at", "name", "slug") VALUES
	(1, '2024-08-27 17:15:24.066911+00', 'Sales', 'sales'),
	(2, '2024-08-27 17:15:41.014924+00', 'Purchases', 'purchases'),
	(3, '2024-08-27 17:15:52.914888+00', 'Tech', 'tech'),
	(4, '2024-08-27 17:16:13.894834+00', 'NOC', 'noc'),
	(5, '2024-08-27 17:16:25.636409+00', 'Finance', 'finance');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profiles" ("id", "name", "company_name", "email", "phone", "skype_id", "finance_department", "noc_department", "sales_department", "user_type") VALUES
	('8e518fc5-f963-400e-b4cc-e8af108077bf', 'Mymoon P K Muhammad', 'PKM', 'pkmymoonpk@gmail.com', '9539941964', 'mymoonpk', '{}', '{}', '{}', 'CLIENT'),
	('8a777b71-e825-4754-9f06-21b2ad83d9af', 'Mymoon P K', 'PKM', 'pkmymoongd@gmail.com', '9539941964', 'mymoonpk', '{"name":"Minhaal"}', '{}', '{}', 'CLIENT'),
	('63f8e39e-edee-4884-b7af-c772cea5fcbf', 'LCRTel', 'LCRTel', 'lcrtelweb@gmail.com', '9539941964', '', NULL, NULL, NULL, 'CLIENT'),
	('82a0feb6-89df-4841-b2bb-7b8505e57697', 'Sales Manager', 'LCRTel', 'manager@sales.lcrtel.com', '1234567890', NULL, '{}', '{}', '{}', 'CLIENT'),
	('3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', 'Sales Executive 1', 'LCRTel', 'executive1@sales.lcrtel.com', '1234567890', NULL, '{}', '{}', '{}', 'CLIENT');


--
-- Data for Name: executives; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."executives" ("id", "created_at", "user_id", "department") VALUES
	(1, '2024-10-22 07:22:38.529718+00', '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', 'sales');


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."routes" ("id", "vendor_id", "destination", "rate", "route_type", "asr", "acd", "ports", "verification", "verification_by", "verified_at", "created_at", "updated_at", "destination_code", "pdd", "selling_rate", "new_id", "remarks") VALUES
	('7b6b0a2a-2fe8-4d86-9fca-975d77f77158', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('91f6d213-4457-490a-9d8b-c408aabb8b6e', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('967df5e0-b791-4610-9315-83656f1fbaec', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('fb26d98b-5569-472a-a140-03aab02ab8f2', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('e62405bd-7274-4030-a848-1eb72becc356', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('bcf485dd-4843-47ad-b9ca-de2f3cb03b1b', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('da403034-f832-4445-835e-be17e3d9de98', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('20292eb1-4f78-48e6-ae71-6976479a8c4f', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('16295542-2185-498d-af6e-480a195c98bd', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('c4a29594-6684-4fb1-b6ae-b57382882944', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('2d0586ea-b6b2-4649-b0b7-222e7e8c887e', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('d795d993-e3d4-49fa-978b-2d6c5acfaccc', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('3f15c168-99db-4a39-98b9-93e97b384e36', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('6c154a94-ba1f-4307-aca3-edc891bbf757', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('9d0b9024-1c1b-4e94-a5e9-6a59a6ceb9b9', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('b32f54a3-82e3-45bf-aa17-411296a13611', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('ca19261a-3483-4843-9425-fede9a755faa', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('63795321-f9f2-46a0-952e-7fb6e46c1dec', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('59a49f72-2977-48a3-8c78-5e5a080dea8c', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('3881fca6-63f9-48b5-a636-dfe50221f447', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel'),
	('72a3fc3f-8b14-49f4-97b5-3982b7cd6157', '8e518fc5-f963-400e-b4cc-e8af108077bf', 'India', '0.018', 'cli', '39', '09', '876', 'verified', NULL, NULL, '2024-10-22 07:19:12.817709+00', NULL, '91', '87', '0.02160', NULL, 'Airtel');


--
-- Data for Name: gateways; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: managers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."managers" ("id", "created_at", "user_id", "department") VALUES
	(1, '2024-10-22 07:14:25.527323+00', '82a0feb6-89df-4841-b2bb-7b8505e57697', 'sales');


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: phone_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."phone_codes" ("code", "name", "value") VALUES
	(90, 'TURKEY', '90 (TURKEY) '),
	(91, 'INDIA', '91 (INDIA) '),
	(92, 'PAKISTAN', '92 (PAKISTAN) '),
	(93, 'AFGHANISTAN', '93 (AFGHANISTAN) '),
	(94, 'SRI LANKA', '94 (SRI LANKA) '),
	(95, 'MYANMAR', '95 (MYANMAR) '),
	(98, 'IRAN', '98 (IRAN) '),
	(905, 'TURKEY-MOBILE', '905 (TURKEY-MOBILE) '),
	(919, 'INDIA-MOBILE-OTHER', '919 (INDIA-MOBILE-OTHER) '),
	(923, 'PAKISTAN-MOBILE', '923 (PAKISTAN-MOBILE) '),
	(947, 'SRI LANKA MOBILE', '947 (SRI LANKA MOBILE) '),
	(959, 'MYANMAR-MOBILE', '959 (MYANMAR-MOBILE) '),
	(960, 'MALDIVES', '960 (MALDIVES) '),
	(961, 'LEBANON', '961 (LEBANON) '),
	(962, 'JORDAN', '962 (JORDAN) '),
	(963, 'SYRIA', '963 (SYRIA) '),
	(964, 'IRAQ', '964 (IRAQ) '),
	(965, 'KUWAIT', '965 (KUWAIT) '),
	(966, 'SAUDI ARABIA', '966 (SAUDI ARABIA) '),
	(967, 'YEMEN', '967 (YEMEN) '),
	(968, 'OMAN', '968 (OMAN) '),
	(970, 'PALESTINE', '970 (PALESTINE) '),
	(971, 'UNITED ARAB EMIRATES', '971 (UNITED ARAB EMIRATES) '),
	(972, 'ISRAEL', '972 (ISRAEL) '),
	(973, 'BAHRAIN', '973 (BAHRAIN) '),
	(974, 'QATAR', '974 (QATAR) '),
	(975, 'BHUTAN', '975 (BHUTAN) '),
	(976, 'MONGOLIA', '976 (MONGOLIA) '),
	(977, 'NEPAL', '977 (NEPAL) '),
	(989, 'IRAN-MOBILE', '989 (IRAN-MOBILE) '),
	(992, 'TAJIKISTAN', '992 (TAJIKISTAN) '),
	(993, 'TURKMENISTAN', '993 (TURKMENISTAN) '),
	(994, 'AZERBAIJAN', '994 (AZERBAIJAN) '),
	(995, 'GEORGIA', '995 (GEORGIA) '),
	(996, 'KYRGYZSTAN', '996 (KYRGYZSTAN) '),
	(998, 'UZBEKISTAN', '998 (UZBEKISTAN) '),
	(9050, 'TURKEY AVEA MOBILE', '9050 (TURKEY AVEA MOBILE) '),
	(9051, 'TURKEY-MOBILE OTHERS', '9051 (TURKEY-MOBILE OTHERS) '),
	(9053, 'TURKEY-MOBILE-TURKCELL', '9053 (TURKEY-MOBILE-TURKCELL) '),
	(9054, 'TURKEY-MOBILE-VODAFONE', '9054 (TURKEY-MOBILE-VODAFONE) '),
	(9055, 'TURKEY AVEA MOBILE', '9055 (TURKEY AVEA MOBILE) '),
	(9111, 'INDIA NEW DELHI', '9111 (INDIA NEW DELHI) '),
	(9116, 'INDIA-PUNJAB', '9116 (INDIA-PUNJAB) '),
	(9117, 'INDIA-PUNJAB', '9117 (INDIA-PUNJAB) '),
	(9118, 'INDIA-PUNJAB', '9118 (INDIA-PUNJAB) '),
	(9120, 'INDIA PUNE', '9120 (INDIA PUNE) '),
	(9122, 'INDIA MUMBAI', '9122 (INDIA MUMBAI) '),
	(9126, 'INDIA GUJRAT', '9126 (INDIA GUJRAT) '),
	(9127, 'INDIA GUJRAT', '9127 (INDIA GUJRAT) '),
	(9128, 'INDIA-GUJARAT', '9128 (INDIA-GUJARAT) '),
	(9133, 'INDIA KOLKATA', '9133 (INDIA KOLKATA) '),
	(9140, 'INDIA HYDERABAD', '9140 (INDIA HYDERABAD) '),
	(9141, 'INDIA TAMIL NADU', '9141 (INDIA TAMIL NADU) '),
	(9142, 'INDIA-TAMIL NADU', '9142 (INDIA-TAMIL NADU) '),
	(9143, 'INDIA TAMIL NADU', '9143 (INDIA TAMIL NADU) '),
	(9144, 'INDIA CHENNAI', '9144 (INDIA CHENNAI) '),
	(9145, 'INDIA TAMIL NADU', '9145 (INDIA TAMIL NADU) '),
	(9146, 'INDIA TAMIL NADU', '9146 (INDIA TAMIL NADU) '),
	(9147, 'INDIA KERALA', '9147 (INDIA KERALA) '),
	(9148, 'INDIA-KERALA', '9148 (INDIA-KERALA) '),
	(9149, 'INDIA KERALA', '9149 (INDIA KERALA) '),
	(9160, 'INDIA CELLULAR', '9160 (INDIA CELLULAR) '),
	(9162, 'INDIA MOBILE', '9162 (INDIA MOBILE) '),
	(9163, 'INDIA MOBILE', '9163 (INDIA MOBILE) '),
	(9169, 'INDIA CELLULAR', '9169 (INDIA CELLULAR) '),
	(9170, 'INDIA-MOBILE-AIRTEL', '9170 (INDIA-MOBILE-AIRTEL) '),
	(9179, 'INDIA AHMEDABAD', '9179 (INDIA AHMEDABAD) '),
	(9180, 'INDIA-BANGALORE', '9180 (INDIA-BANGALORE) '),
	(9181, 'INDIA, KARNATAKA', '9181 (INDIA, KARNATAKA) '),
	(9182, 'INDIA, KARNATAKA', '9182 (INDIA, KARNATAKA) '),
	(9184, 'INDIA-ANDRAH PRADESH', '9184 (INDIA-ANDRAH PRADESH) '),
	(9185, 'INDIA-ANDRAH PRADESH', '9185 (INDIA-ANDRAH PRADESH) '),
	(9186, 'INDIA-MOBILE-BSNL', '9186 (INDIA-MOBILE-BSNL) '),
	(9187, 'INDIA-ANDRAH PRADESH', '9187 (INDIA-ANDRAH PRADESH) '),
	(9188, 'INDIA-ANDRAH PRADESH', '9188 (INDIA-ANDRAH PRADESH) '),
	(9189, 'INDIA-ANDRAH PRADESH', '9189 (INDIA-ANDRAH PRADESH) '),
	(9190, 'INDIA-MOBILE-PRIVATELY RUN', '9190 (INDIA-MOBILE-PRIVATELY RUN) '),
	(9191, 'INDIA-MOBILE OTHERS', '9191 (INDIA-MOBILE OTHERS) '),
	(9192, 'INDIA OTHER MOBILE', '9192 (INDIA OTHER MOBILE) '),
	(9193, 'INDIA OTHER MOBILE', '9193 (INDIA OTHER MOBILE) '),
	(9194, 'INDIA BSNL MOBILE', '9194 (INDIA BSNL MOBILE) '),
	(9195, 'INDIA-MOBILE-PRIVATELY RUN', '9195 (INDIA-MOBILE-PRIVATELY RUN) '),
	(9196, 'INDIA-MOBILE-PRIVATELY RUN', '9196 (INDIA-MOBILE-PRIVATELY RUN) '),
	(9197, 'INDIA-MOBILE-PRIVATELY RUN', '9197 (INDIA-MOBILE-PRIVATELY RUN) '),
	(9198, 'INDIA-MOBILE-PRIVATELY RUN', '9198 (INDIA-MOBILE-PRIVATELY RUN) '),
	(9199, 'INDIA-MOBILE-PRIVATELY RUN', '9199 (INDIA-MOBILE-PRIVATELY RUN) '),
	(9221, 'PAKISTAN KARACHI', '9221 (PAKISTAN KARACHI) '),
	(9230, 'PAKISTAN MOBILINK MOBILE', '9230 (PAKISTAN MOBILINK MOBILE) '),
	(9231, 'PAKISTAN MOBILE', '9231 (PAKISTAN MOBILE) '),
	(9232, 'PAKISTAN MOBILE', '9232 (PAKISTAN MOBILE) '),
	(9233, 'PAKISTAN MOBILE', '9233 (PAKISTAN MOBILE) '),
	(9234, 'PAKISTAN TELENOR MOBILE', '9234 (PAKISTAN TELENOR MOBILE) '),
	(9235, 'PAKISTAN SCO', '9235 (PAKISTAN SCO) '),
	(9236, 'PAKISTAN MOBILE', '9236 (PAKISTAN MOBILE) '),
	(9242, 'PAKISTAN LAHORE', '9242 (PAKISTAN LAHORE) '),
	(9251, 'PAKISTAN ISLAMABAD', '9251 (PAKISTAN ISLAMABAD) '),
	(9258, 'PAKISTAN SCO', '9258 (PAKISTAN SCO) '),
	(9370, 'AFGHANISTAN MOBILE', '9370 (AFGHANISTAN MOBILE) '),
	(9371, 'AFGHANISTAN-AWCC MOBILE', '9371 (AFGHANISTAN-AWCC MOBILE) '),
	(9372, 'AFGHANISTAN ROSHAN MOBILE', '9372 (AFGHANISTAN ROSHAN MOBILE) '),
	(81, 'JAPAN', '81 (JAPAN) '),
	(82, 'KOREA SOUTH', '82 (KOREA SOUTH) '),
	(84, 'VIETNAM', '84 (VIETNAM) '),
	(86, 'CHINA', '86 (CHINA) '),
	(813, 'JAPAN-TOKYO', '813 (JAPAN-TOKYO) '),
	(821, 'KOREA (SOUTH)-MOBILE', '821 (KOREA (SOUTH)-MOBILE) '),
	(822, 'KOREA (SOUTH)-SEOUL', '822 (KOREA (SOUTH)-SEOUL) '),
	(827, 'SOUTH KOREA-IP PHONE', '827 (SOUTH KOREA-IP PHONE) '),
	(843, 'VIET NAM MOBILE VIETTEL', '843 (VIET NAM MOBILE VIETTEL) '),
	(849, 'VIETNAM-MOBILE-OTHERS', '849 (VIETNAM-MOBILE-OTHERS) '),
	(850, 'KOREA NORTH', '850 (KOREA NORTH) '),
	(852, 'HONG KONG', '852 (HONG KONG) '),
	(853, 'MACAO', '853 (MACAO) '),
	(855, 'CAMBODIA', '855 (CAMBODIA) '),
	(856, 'LAOS', '856 (LAOS) '),
	(870, 'INMARSAT', '870 (INMARSAT) '),
	(878, 'UNIVERSAL PERSONAL TELECOMMUNI', '878 (UNIVERSAL PERSONAL TELECOMMUNI) '),
	(880, 'BANGLADESH', '880 (BANGLADESH) '),
	(881, 'IRIDIUM', '881 (IRIDIUM) '),
	(882, 'THURAYA', '882 (THURAYA) '),
	(883, 'INMARSAT GLOBAL', '883 (INMARSAT GLOBAL) '),
	(886, 'TAIWAN', '886 (TAIWAN) '),
	(888, 'UNITED NATIONS OCH', '888 (UNITED NATIONS OCH) '),
	(8150, 'JAPAN IP PHONE', '8150 (JAPAN IP PHONE) '),
	(8170, 'JAPAN MOBILE', '8170 (JAPAN MOBILE) '),
	(8180, 'JAPAN MOBILE', '8180 (JAPAN MOBILE) '),
	(8190, 'JAPAN MOBILE', '8190 (JAPAN MOBILE) '),
	(8201, 'SOUTH KOREA-MOBILE', '8201 (SOUTH KOREA-MOBILE) '),
	(8207, 'SOUTH KOREA-IP PHONE', '8207 (SOUTH KOREA-IP PHONE) '),
	(8211, 'KOREA SK TELINK MOBILE', '8211 (KOREA SK TELINK MOBILE) '),
	(8215, 'KOREA SOUTH MOBILE', '8215 (KOREA SOUTH MOBILE) '),
	(8216, 'KOREA SOUTH MOBILE', '8216 (KOREA SOUTH MOBILE) '),
	(8217, 'KOREA SK TELINK MOBILE', '8217 (KOREA SK TELINK MOBILE) '),
	(8218, 'KOREA SOUTH MOBILE', '8218 (KOREA SOUTH MOBILE) '),
	(8219, 'KOREA SOUTH MOBILE', '8219 (KOREA SOUTH MOBILE) '),
	(8412, 'VIETNAM MOBILE', '8412 (VIETNAM MOBILE) '),
	(8416, 'VIET NAM MOBILE', '8416 (VIET NAM MOBILE) '),
	(8431, 'VIETNAM-MOBILE-VIETTEL', '8431 (VIETNAM-MOBILE-VIETTEL) '),
	(8432, 'VIETNAM-MOBILE-VIETTEL', '8432 (VIETNAM-MOBILE-VIETTEL) '),
	(8433, 'VIETNAM-MOBILE-VIETTEL', '8433 (VIETNAM-MOBILE-VIETTEL) '),
	(8434, 'VIETNAM-MOBILE-VIETTEL', '8434 (VIETNAM-MOBILE-VIETTEL) '),
	(8435, 'VIETNAM-MOBILE-VIETTEL', '8435 (VIETNAM-MOBILE-VIETTEL) '),
	(8436, 'VIETNAM-MOBILE-VIETTEL', '8436 (VIETNAM-MOBILE-VIETTEL) '),
	(8437, 'VIETNAM-MOBILE-VIETTEL', '8437 (VIETNAM-MOBILE-VIETTEL) '),
	(8438, 'VIETNAM-MOBILE-VIETTEL', '8438 (VIETNAM-MOBILE-VIETTEL) '),
	(8439, 'VIETNAM-MOBILE-VIETTEL', '8439 (VIETNAM-MOBILE-VIETTEL) '),
	(8442, 'VIETNAM-VIETTEL FIXED', '8442 (VIETNAM-VIETTEL FIXED) '),
	(8446, 'VIETNAM-VIETTEL FIXED', '8446 (VIETNAM-VIETTEL FIXED) '),
	(8452, 'VIET NAM MOBILE', '8452 (VIET NAM MOBILE) '),
	(8456, 'VIETNAM-MOBILE-OTHERS', '8456 (VIETNAM-MOBILE-OTHERS) '),
	(8458, 'VIETNAM-MOBILE-OTHERS', '8458 (VIETNAM-MOBILE-OTHERS) '),
	(8459, 'VIETNAM-MOBILE-OTHERS', '8459 (VIETNAM-MOBILE-OTHERS) '),
	(8470, 'VIETNAM-MOBILE-MOBIFONE', '8470 (VIETNAM-MOBILE-MOBIFONE) '),
	(8476, 'VIETNAM-MOBILE-MOBIFONE', '8476 (VIETNAM-MOBILE-MOBIFONE) '),
	(8477, 'VIETNAM-MOBILE-MOBIFONE', '8477 (VIETNAM-MOBILE-MOBIFONE) '),
	(8478, 'VIETNAM-MOBILE', '8478 (VIETNAM-MOBILE) '),
	(8479, 'VIETNAM-MOBILE-MOBIFONE', '8479 (VIETNAM-MOBILE-MOBIFONE) '),
	(8481, 'VIET NAM MOBILE', '8481 (VIET NAM MOBILE) '),
	(8482, 'VIETNAM HO CHI MIN', '8482 (VIETNAM HO CHI MIN) '),
	(8483, 'VIET NAM MOBILE', '8483 (VIET NAM MOBILE) '),
	(8484, 'VIET NAM MOBILE', '8484 (VIET NAM MOBILE) '),
	(8485, 'VIET NAM MOBILE', '8485 (VIET NAM MOBILE) '),
	(8486, 'VIET NAM MOBILE VIETTEL', '8486 (VIET NAM MOBILE VIETTEL) '),
	(8487, 'VIET NAM MOBILE', '8487 (VIET NAM MOBILE) '),
	(8488, 'VIETNAM HO CHI MIN', '8488 (VIETNAM HO CHI MIN) '),
	(8489, 'VIETNAM HO CHI MIN', '8489 (VIETNAM HO CHI MIN) '),
	(8490, 'VIETNAM MOBILE', '8490 (VIETNAM MOBILE) '),
	(8491, 'VIETNAM MOBILE', '8491 (VIETNAM MOBILE) '),
	(8492, 'VIETNAM MOBILE', '8492 (VIETNAM MOBILE) '),
	(8493, 'VIETNAM MOBILE', '8493 (VIETNAM MOBILE) '),
	(8494, 'VIETNAM MOBILE', '8494 (VIETNAM MOBILE) '),
	(8495, 'VIETNAM MOBILE', '8495 (VIETNAM MOBILE) '),
	(8496, 'VIETNAM VIETTEL MOBILE', '8496 (VIETNAM VIETTEL MOBILE) '),
	(8497, 'VIETNAM VIETTEL MOBILE', '8497 (VIETNAM VIETTEL MOBILE) '),
	(8498, 'VIETNAM VIETTEL MOBILE', '8498 (VIETNAM VIETTEL MOBILE) '),
	(8526, 'HONG KONG MOBILE', '8526 (HONG KONG MOBILE) '),
	(8527, 'HONG KONG CELLULAR', '8527 (HONG KONG CELLULAR) '),
	(8529, 'HONG KONG-MOBILE', '8529 (HONG KONG-MOBILE) '),
	(8536, 'MACAO MOBILE', '8536 (MACAO MOBILE) '),
	(8551, 'CAMBODIA MOBILE', '8551 (CAMBODIA MOBILE) '),
	(8558, 'CAMBODIA MOBILE', '8558 (CAMBODIA MOBILE) '),
	(8559, 'CAMBODIA MOBILE', '8559 (CAMBODIA MOBILE) '),
	(8610, 'CHINA-BEIJING', '8610 (CHINA-BEIJING) '),
	(8613, 'CHINA-MOBILE', '8613 (CHINA-MOBILE) '),
	(8705, 'INMARSAT INMARSAT SNAC SKY', '8705 (INMARSAT INMARSAT SNAC SKY) '),
	(8801, 'BANGLADESH-MOBILE', '8801 (BANGLADESH-MOBILE) '),
	(8802, 'BANGLADESH DHAKA', '8802 (BANGLADESH DHAKA) '),
	(8812, 'GLOBAL MOBILE SATELLITE SYSTEM', '8812 (GLOBAL MOBILE SATELLITE SYSTEM) '),
	(8813, 'GLOBAL MOBILE SATELLITE SYSTEM', '8813 (GLOBAL MOBILE SATELLITE SYSTEM) '),
	(8816, 'IRIDIUM', '8816 (IRIDIUM) '),
	(8817, 'IRIDIUM', '8817 (IRIDIUM) '),
	(8818, 'IRIDIUM-GLOBALSTAR', '8818 (IRIDIUM-GLOBALSTAR) '),
	(8819, 'IRIDIUM-GLOBALSTAR', '8819 (IRIDIUM-GLOBALSTAR) '),
	(8869, 'TAIWAN-MOBILE', '8869 (TAIWAN-MOBILE) '),
	(81801, 'JAPAN-MOBILE DOCOMO', '81801 (JAPAN-MOBILE DOCOMO) '),
	(81802, 'JAPAN-MOBILE DOCOMO', '81802 (JAPAN-MOBILE DOCOMO) '),
	(81808, 'JAPAN-MOBILE DOCOMO', '81808 (JAPAN-MOBILE DOCOMO) '),
	(81905, 'JAPAN-MOBILE DOCOMO', '81905 (JAPAN-MOBILE DOCOMO) '),
	(82010, 'SOUTH KOREA MOBILE-OTHER', '82010 (SOUTH KOREA MOBILE-OTHER) '),
	(82011, 'SOUTH KOREA MOBILE-OTHER', '82011 (SOUTH KOREA MOBILE-OTHER) ');


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."purchases" ("created_at", "route_id", "status", "id", "payment_type", "communication_status", "whatsapp_no", "ip", "vos_status", "buying_rate", "user_id") VALUES
	('2024-10-22 07:20:46.144942+00', '7b6b0a2a-2fe8-4d86-9fca-975d77f77158', 'approved', '3452fde5-bece-4aa2-a045-1952255c1fd4', 'prepaid', 'deal_settled_successfully', '9539941964', '3405982345', 'added', '0.02160', '8a777b71-e825-4754-9f06-21b2ad83d9af');


--
-- Data for Name: rate_hikes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."roles" ("id", "name", "slug") VALUES
	(1, 'Director', 'director'),
	(2, 'Company Manager', 'company_manager'),
	(3, 'Finance Executive', 'finance_executive'),
	(4, 'Finance Manager', 'finance_manager'),
	(5, 'NOC Executive', 'noc_executive'),
	(6, 'NOC Manager', 'noc_manager'),
	(7, 'Purchase Executive', 'purchase_executive'),
	(8, 'Purchase Manager', 'purchase_manager'),
	(9, 'Sales Executive', 'sales_executive'),
	(10, 'Sales Manager', 'sales_manager'),
	(11, 'User', 'user');


--
-- Data for Name: routes_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."routes_history" ("id", "destination", "rate", "route_type", "asr", "acd", "ports", "destination_code", "pdd", "selling_rate", "effective_date", "route_id", "remarks") VALUES
	('2850beb1-3e58-4fbf-8fe1-4590cb99c840', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '7b6b0a2a-2fe8-4d86-9fca-975d77f77158', 'Airtel'),
	('d75537b5-894b-4157-a52c-827681d131cf', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '91f6d213-4457-490a-9d8b-c408aabb8b6e', 'Airtel'),
	('a085a347-13f0-45fd-b035-d098bd59becb', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '967df5e0-b791-4610-9315-83656f1fbaec', 'Airtel'),
	('b4924417-e60a-497b-93f4-dfd78af1327b', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', 'fb26d98b-5569-472a-a140-03aab02ab8f2', 'Airtel'),
	('aae12344-2a58-406e-92f8-a84b55d5c9ab', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', 'e62405bd-7274-4030-a848-1eb72becc356', 'Airtel'),
	('2a0a3f69-cfbc-4f0e-9569-213397147fac', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', 'bcf485dd-4843-47ad-b9ca-de2f3cb03b1b', 'Airtel'),
	('8e3e8f2d-6784-450f-af1e-b2aeb69b1a16', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', 'da403034-f832-4445-835e-be17e3d9de98', 'Airtel'),
	('6c24e0a8-5d17-4712-833e-eb81c50c646d', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '20292eb1-4f78-48e6-ae71-6976479a8c4f', 'Airtel'),
	('244e4143-d610-49d6-bdda-cbeaca860c80', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '16295542-2185-498d-af6e-480a195c98bd', 'Airtel'),
	('b46bd14b-5171-4d15-86ba-6109b8b11d8d', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', 'c4a29594-6684-4fb1-b6ae-b57382882944', 'Airtel'),
	('d78a14e0-82e5-4124-84e4-5d00cd7a5ea4', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '2d0586ea-b6b2-4649-b0b7-222e7e8c887e', 'Airtel'),
	('420d2eda-b53d-4df1-b585-c0f3735a22b9', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', 'd795d993-e3d4-49fa-978b-2d6c5acfaccc', 'Airtel'),
	('7115183c-9319-434d-8148-a816024c8267', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '3f15c168-99db-4a39-98b9-93e97b384e36', 'Airtel'),
	('37ac5829-1f2e-4f32-af7f-e95006a21e99', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '6c154a94-ba1f-4307-aca3-edc891bbf757', 'Airtel'),
	('8e9af3ed-cba7-41d9-b1ef-647bbc436277', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '9d0b9024-1c1b-4e94-a5e9-6a59a6ceb9b9', 'Airtel'),
	('73d1dfff-8960-413f-957e-db75a54e11fd', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', 'b32f54a3-82e3-45bf-aa17-411296a13611', 'Airtel'),
	('a0e8d58c-7126-4321-8262-b4e7b0445229', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', 'ca19261a-3483-4843-9425-fede9a755faa', 'Airtel'),
	('058a597d-08c1-4085-acf7-b3eae4c606b7', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '63795321-f9f2-46a0-952e-7fb6e46c1dec', 'Airtel'),
	('8df2ce09-a85b-487f-82b0-ffb7ee6f0d01', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '59a49f72-2977-48a3-8c78-5e5a080dea8c', 'Airtel'),
	('1fcdc197-260c-4d22-a5af-d1aaecd5ea93', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '3881fca6-63f9-48b5-a636-dfe50221f447', 'Airtel'),
	('a48ac164-eb91-4674-9370-06f1dc080706', 'India', '0.018', 'cli', '39', '09', '876', '91', '87', '0.02160', '2024-10-22 07:19:12.817709+00', '72a3fc3f-8b14-49f4-97b5-3982b7cd6157', 'Airtel');


--
-- Data for Name: selected_routes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: support_chat; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: targets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."targets" ("id", "client_id", "destination", "rate", "route_type", "asr", "acd", "ports", "created_at", "updated_at", "destination_code", "pdd", "buying_rate", "remarks") VALUES
	('a4cf004a-b038-4990-b6d2-a518d041a232', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('b9bcc72a-5b58-4d7d-9a0f-c60d62283c69', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('198e8a6f-a71d-46e6-b6bb-19bcba0b2b6a', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('dca49be0-23da-49ac-ae8b-b029c482ed1b', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('40e08ada-414c-4d47-acec-69b6e6dc80d5', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('2304c9b2-71fc-4071-9061-564e75187f8b', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('7d500953-f818-4779-ad88-bbde75416e76', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('f34cb7a0-e620-4b8b-99c6-f3b163c8623c', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('75ef9134-5bd5-4957-ab2d-378db2783ed2', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('b3129957-43f9-45f0-b366-b45e9d328f50', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('d9bcd157-4dc4-4fb0-96d7-e200083edee0', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('b8e9b5e4-f346-42fc-842f-cd33bd4677b4', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('6ff78ae5-e111-4e3f-867c-2f01f8ef6687', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('07e45927-ead6-457f-9578-dcda2f955bd9', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('8169c5d6-1904-4332-9fc3-aa883aefc7d1', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel'),
	('cbf72952-3baf-4dac-be2a-2a7779bdcdad', '8a777b71-e825-4754-9f06-21b2ad83d9af', 'India', '0.018', 'cli', '39', '9', '876', '2024-10-22 07:20:04.589725+00', NULL, '91', '8', '0.01440', 'airtel');


--
-- Data for Name: targets_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."targets_history" ("id", "destination", "rate", "route_type", "asr", "acd", "ports", "destination_code", "pdd", "buying_rate", "effective_date", "target_id", "remarks") VALUES
	('ecf3ea4d-7e6c-4cd4-a5a6-3fc876f822a0', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, 'a4cf004a-b038-4990-b6d2-a518d041a232', 'airtel'),
	('d763179d-d08b-400b-b08f-f9f53f207701', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, 'b9bcc72a-5b58-4d7d-9a0f-c60d62283c69', 'airtel'),
	('9276b8c2-d70d-470d-8198-c70f913831d5', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, '198e8a6f-a71d-46e6-b6bb-19bcba0b2b6a', 'airtel'),
	('e1187c24-223b-4259-9638-351a35be38b5', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, 'dca49be0-23da-49ac-ae8b-b029c482ed1b', 'airtel'),
	('d2fe646d-4c78-4e5b-8988-4d4158b6bf9d', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, '40e08ada-414c-4d47-acec-69b6e6dc80d5', 'airtel'),
	('f66680f5-667d-401c-80df-e0a01780187f', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, '2304c9b2-71fc-4071-9061-564e75187f8b', 'airtel'),
	('79acd3c2-70dc-407c-8c85-52559d7792c4', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, '7d500953-f818-4779-ad88-bbde75416e76', 'airtel'),
	('6f7d08ce-a8ad-4991-98e4-79f345be3619', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, 'f34cb7a0-e620-4b8b-99c6-f3b163c8623c', 'airtel'),
	('de587249-db65-4dd3-b933-5c23fb43ce3c', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, '75ef9134-5bd5-4957-ab2d-378db2783ed2', 'airtel'),
	('e514e2ce-0ef0-4b2e-8c67-54183ca61586', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, 'b3129957-43f9-45f0-b366-b45e9d328f50', 'airtel'),
	('26dfbbc7-e619-4baa-a501-2499cba4af59', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, 'd9bcd157-4dc4-4fb0-96d7-e200083edee0', 'airtel'),
	('8365e4e0-a499-483c-b4b7-5a0222ff3c78', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, 'b8e9b5e4-f346-42fc-842f-cd33bd4677b4', 'airtel'),
	('110fb97e-2978-4ef8-b09c-8cb9b80f7c3b', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, '6ff78ae5-e111-4e3f-867c-2f01f8ef6687', 'airtel'),
	('c4d9a2c5-1793-4e03-ae9d-3cb02c882099', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, '07e45927-ead6-457f-9578-dcda2f955bd9', 'airtel'),
	('b4553949-942d-44a2-ac82-f5c21e4a0513', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, '8169c5d6-1904-4332-9fc3-aa883aefc7d1', 'airtel'),
	('a73b7110-15e5-4cce-afc4-dbb8e279779c', 'India', '0.018', 'cli', '39', '9', '876', '91', '8', '0.01440', NULL, 'cbf72952-3baf-4dac-be2a-2a7779bdcdad', 'airtel');


--
-- Data for Name: tr_verifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: tr_communication; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_durations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_durations" ("id", "user_id", "duration", "created_at") VALUES
	(6, '82a0feb6-89df-4841-b2bb-7b8505e57697', 35, '2024-10-22 08:37:35.553507+00'),
	(7, '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', 20, '2024-10-22 08:38:39.98992+00'),
	(8, '82a0feb6-89df-4841-b2bb-7b8505e57697', 20, '2024-10-22 08:39:04.545743+00'),
	(9, '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', 20, '2024-10-22 08:40:21.167352+00'),
	(10, '3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', 20, '2024-10-22 08:47:12.632111+00'),
	(11, '82a0feb6-89df-4841-b2bb-7b8505e57697', 323, '2024-10-22 08:53:13.552595+00'),
	(13, '82a0feb6-89df-4841-b2bb-7b8505e57697', 22, '2024-10-22 09:06:17.556672+00');


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_roles" ("user_id", "role_slug") VALUES
	('8a777b71-e825-4754-9f06-21b2ad83d9af', 'user'),
	('8e518fc5-f963-400e-b4cc-e8af108077bf', 'user'),
	('63f8e39e-edee-4884-b7af-c772cea5fcbf', 'director'),
	('82a0feb6-89df-4841-b2bb-7b8505e57697', 'sales_manager'),
	('3c05310f-dcb2-4291-b5ba-1eb7a5a2303c', 'sales_executive');


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

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1871, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: bank_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."bank_accounts_id_seq"', 17, true);


--
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."departments_id_seq"', 5, true);


--
-- Name: executives_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."executives_id_seq"', 1, true);


--
-- Name: id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."id_seq"', 1, false);


--
-- Name: invoices_invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."invoices_invoice_id_seq"', 562, true);


--
-- Name: managers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."managers_id_seq"', 1, true);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."notifications_notification_id_seq"', 1, false);


--
-- Name: payments_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."payments_payment_id_seq"', 30, true);


--
-- Name: rate_hikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."rate_hikes_id_seq"', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."roles_id_seq"', 11, true);


--
-- Name: support_chat_chat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."support_chat_chat_id_seq"', 1, false);


--
-- Name: tr_communication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tr_communication_id_seq"', 1, false);


--
-- Name: tr_verifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."tr_verifications_id_seq"', 1, false);


--
-- Name: user_durations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."user_durations_id_seq"', 13, true);


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
