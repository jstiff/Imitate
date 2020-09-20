
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (80), 
    "email" VARCHAR (320)
);
CREATE TABLE "metrics"(
	"id" SERIAL PRIMARY KEY,
	"percent_correct" INT NOT NULL,
	"time_stamp" VARCHAR(128),
	"user_id" integer REFERENCES "user",
	"file_id" integer REFERENCES "chosen_file"
);
CREATE TABLE "fav_coders"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80),
	"user_name" VARCHAR(80),
	"avatar_url" VARCHAR(1200)

);
CREATE TABLE "repos"(
	"id" SERIAL PRIMARY KEY,
	"repo_name" VARCHAR(120),
	"repo_url" VARCHAR(1200),
	"repo_owner" integers REFERENCES "fav_coders" 

);
CREATE TABLE "chosen_file"(
	"id" SERIAL PRIMARY KEY,
	"file_name" VARCHAR(120),
	"file_url" VARCHAR(1200),
	"repo_id" integer REFERENCES "repos"
);
CREATE TABLE "user_favCoder"(
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "user",
	"fav_coder_id" integer REFERENCES "fav_coders"  
	
);