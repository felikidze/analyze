--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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
-- Name: analyze; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "analyze" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';


ALTER DATABASE "analyze" OWNER TO postgres;

\connect "analyze"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bi_for_domains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bi_for_domains (
    id integer NOT NULL,
    domain_id integer NOT NULL,
    url character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT '2024-05-07 14:27:34.363205'::timestamp without time zone,
    author_id integer
);


ALTER TABLE public.bi_for_domains OWNER TO postgres;

--
-- Name: bi_for_domains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bi_for_domains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bi_for_domains_id_seq OWNER TO postgres;

--
-- Name: bi_for_domains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bi_for_domains_id_seq OWNED BY public.bi_for_domains.id;


--
-- Name: bi_for_scans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bi_for_scans (
    id integer NOT NULL,
    scan_id integer NOT NULL,
    url character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT '2024-05-07 14:27:34.363205'::timestamp without time zone,
    author_id integer
);


ALTER TABLE public.bi_for_scans OWNER TO postgres;

--
-- Name: bi_for_scans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bi_for_scans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bi_for_scans_id_seq OWNER TO postgres;

--
-- Name: bi_for_scans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bi_for_scans_id_seq OWNED BY public.bi_for_scans.id;


--
-- Name: domains; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.domains (
    id integer NOT NULL,
    url text NOT NULL,
    created_at timestamp without time zone DEFAULT '2024-05-07 14:27:34.363205'::timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.domains OWNER TO postgres;

--
-- Name: domains_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.domains_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.domains_id_seq OWNER TO postgres;

--
-- Name: domains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.domains_id_seq OWNED BY public.domains.id;


--
-- Name: refresh_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    refresh_token character varying(256) NOT NULL,
    finger_print character varying(256) NOT NULL
);


ALTER TABLE public.refresh_sessions OWNER TO postgres;

--
-- Name: refresh_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.refresh_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_sessions_id_seq OWNER TO postgres;

--
-- Name: refresh_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.refresh_sessions_id_seq OWNED BY public.refresh_sessions.id;


--
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id integer NOT NULL,
    description text NOT NULL,
    author_id integer NOT NULL,
    rating smallint NOT NULL,
    domain_id integer NOT NULL
);


ALTER TABLE public.review OWNER TO postgres;

--
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_id_seq OWNER TO postgres;

--
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: scan_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scan_tags (
    scan_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.scan_tags OWNER TO postgres;

--
-- Name: scans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scans (
    id integer NOT NULL,
    url text NOT NULL,
    description text,
    result boolean,
    author_id integer NOT NULL,
    domain_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT '2024-05-07 14:27:34.363205'::timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.scans OWNER TO postgres;

--
-- Name: scans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.scans_id_seq OWNER TO postgres;

--
-- Name: scans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scans_id_seq OWNED BY public.scans.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(32) NOT NULL,
    color character varying(7) NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: telegram_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.telegram_settings (
    user_id integer NOT NULL,
    telegram_id integer NOT NULL,
    enabled boolean NOT NULL
);


ALTER TABLE public.telegram_settings OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password character varying(256) NOT NULL,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT '2024-05-07 14:27:34.363205'::timestamp without time zone,
    email character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bi_for_domains id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bi_for_domains ALTER COLUMN id SET DEFAULT nextval('public.bi_for_domains_id_seq'::regclass);


--
-- Name: bi_for_scans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bi_for_scans ALTER COLUMN id SET DEFAULT nextval('public.bi_for_scans_id_seq'::regclass);


--
-- Name: domains id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains ALTER COLUMN id SET DEFAULT nextval('public.domains_id_seq'::regclass);


--
-- Name: refresh_sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_sessions ALTER COLUMN id SET DEFAULT nextval('public.refresh_sessions_id_seq'::regclass);


--
-- Name: review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);


--
-- Name: scans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans ALTER COLUMN id SET DEFAULT nextval('public.scans_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: bi_for_domains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bi_for_domains_id_seq', 1, false);


--
-- Name: bi_for_scans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bi_for_scans_id_seq', 1, false);


--
-- Name: domains_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.domains_id_seq', 90, true);


--
-- Name: refresh_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.refresh_sessions_id_seq', 128, true);


--
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_id_seq', 8, true);


--
-- Name: scans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scans_id_seq', 239, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 37, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 17, true);


--
-- Name: bi_for_domains bi_for_domains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bi_for_domains
    ADD CONSTRAINT bi_for_domains_pkey PRIMARY KEY (id);


--
-- Name: bi_for_scans bi_for_scans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bi_for_scans
    ADD CONSTRAINT bi_for_scans_pkey PRIMARY KEY (id);


--
-- Name: domains domains_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_pkey PRIMARY KEY (id);


--
-- Name: domains domains_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.domains
    ADD CONSTRAINT domains_url_key UNIQUE (url);


--
-- Name: refresh_sessions refresh_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_sessions
    ADD CONSTRAINT refresh_sessions_pkey PRIMARY KEY (id);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: scans scans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_pkey PRIMARY KEY (id);


--
-- Name: scans scans_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_url_key UNIQUE (url);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: telegram_settings telegram_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telegram_settings
    ADD CONSTRAINT telegram_settings_pkey PRIMARY KEY (user_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: bi_for_domains bi_for_domains_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bi_for_domains
    ADD CONSTRAINT bi_for_domains_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: bi_for_domains bi_for_domains_domain_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bi_for_domains
    ADD CONSTRAINT bi_for_domains_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES public.domains(id);


--
-- Name: bi_for_scans bi_for_scans_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bi_for_scans
    ADD CONSTRAINT bi_for_scans_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: bi_for_scans bi_for_scans_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bi_for_scans
    ADD CONSTRAINT bi_for_scans_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


--
-- Name: refresh_sessions refresh_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_sessions
    ADD CONSTRAINT refresh_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: review review_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: review review_domain_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES public.domains(id);


--
-- Name: scan_tags scan_tags_scan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_tags
    ADD CONSTRAINT scan_tags_scan_id_fkey FOREIGN KEY (scan_id) REFERENCES public.scans(id);


--
-- Name: scan_tags scan_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scan_tags
    ADD CONSTRAINT scan_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- Name: scans scans_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- Name: scans scans_domain_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scans
    ADD CONSTRAINT scans_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES public.domains(id);


--
-- Name: telegram_settings telegram_settings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.telegram_settings
    ADD CONSTRAINT telegram_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

