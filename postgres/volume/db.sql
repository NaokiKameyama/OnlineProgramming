--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10
-- Dumped by pg_dump version 11.10

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

SET default_with_oids = false;

--
-- Name: lessun; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.lessun (
    category_id integer,
    theme_id integer,
    lessun_id integer,
    question_sentence text,
    answer_output text,
    answer_script text,
    ispremium boolean
);


ALTER TABLE public.lessun OWNER TO admin;

--
-- Name: lessun_status; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.lessun_status (
    id integer NOT NULL,
    user_id text,
    category_id integer,
    theme_id integer,
    lessun_id integer,
    result boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.lessun_status OWNER TO admin;

--
-- Name: lessun_status_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.lessun_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lessun_status_id_seq OWNER TO admin;

--
-- Name: lessun_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.lessun_status_id_seq OWNED BY public.lessun_status.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    user_id text,
    email text,
    displayname text,
    photourl text,
    subscription_id text,
    subscription_status text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public."user" OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO admin;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: lessun_status id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lessun_status ALTER COLUMN id SET DEFAULT nextval('public.lessun_status_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: lessun; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.lessun (category_id, theme_id, lessun_id, question_sentence, answer_output, answer_script, ispremium) FROM stdin;
1	1	1	hello worldを出力してみよう！	hello world	package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Printf("hello world")\n}	f
1	1	2	for文を実行してみよう！	0\n1\n2\n3\n4\n赤\n黄\n青	package main\nimport "fmt"\n\nfunc main(){\n\tfor i := 0; i < 5; i++ {\n\t\t\tfmt.Println(i) // 0 1 2 3 4が出力される\n\t}\n\n\tcolor1 := []string{"赤","黄","青"}\n\tfor i := 0; i < len(color1); i++ {\n\t\tfmt.Println(color1[i]) // 赤 黄 青が出力される\n\t}\n}	f
\.


--
-- Data for Name: lessun_status; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.lessun_status (id, user_id, category_id, theme_id, lessun_id, result, created_at, updated_at) FROM stdin;
1	user01	1	1	1	t	2021-01-06 16:02:47.060314	2021-01-06 16:03:24.735515
4	user01	1	1	2	f	2021-01-06 16:04:09.677912	2021-01-07 14:11:02.448608
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."user" (id, user_id, email, displayname, photourl, subscription_id, subscription_status, created_at, updated_at) FROM stdin;
4	9vHMOPvHJTZTJ9lKrPsMaE3Bnvv1	js.pro98016@gmail.com	JS- Pro.	https://lh4.googleusercontent.com/-yrvJbZZ3spM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckHVqo6CRf05lJzGlAdM770hGPPDQ/s96-c/photo.jpg	\N	\N	2021-01-07 14:15:22.758321	2021-01-07 14:15:23.598432
1	oO9kr84U5wfTJ9j23IiGVbQoUFU2	atukan0930@gmail.com	亀山直起	https://lh3.googleusercontent.com/a-/AOh14GiWAhaarf3jQ7DBPdvoGFA0NgpG7HwF7aG_YOEfrg=s96-c	\N	\N	2021-01-07 14:14:31.694166	2021-01-07 14:17:40.107923
\.


--
-- Name: lessun_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.lessun_status_id_seq', 22, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.user_id_seq', 8, true);


--
-- Name: lessun_status lessun_status_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lessun_status
    ADD CONSTRAINT lessun_status_unique UNIQUE (user_id, category_id, theme_id, lessun_id);


--
-- Name: user user_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_unique UNIQUE (user_id);


--
-- PostgreSQL database dump complete
--

