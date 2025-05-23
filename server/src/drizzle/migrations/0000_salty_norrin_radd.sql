CREATE TABLE "google_file" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"mimetype" varchar(255) NOT NULL,
	"size" integer NOT NULL,
	"location" varchar(255) NOT NULL,
	"destination" varchar(255) NOT NULL
);
