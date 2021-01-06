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
-- Data for Name: lessun; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.lessun (category_id, theme_id, lessun_id, question_sentence, answer_output, answer_script, ispremium) FROM stdin;
1	1	1	hello worldを出力してみよう！	hello world	package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Printf("hello world")\n}	f
1	1	2	for文を実行してみよう！	0\n1\n2\n3\n4\n赤\n黄\n青	package main\nimport "fmt"\n\nfunc main(){\n\tfor i := 0; i < 5; i++ {\n\t\t\tfmt.Println(i) // 0 1 2 3 4が出力される\n\t}\n\n\tcolor1 := []string{"赤","黄","青"}\n\tfor i := 0; i < len(color1); i++ {\n\t\tfmt.Println(color1[i]) // 赤 黄 青が出力される\n\t}\n}	f
\.


--
-- PostgreSQL database dump complete
--

