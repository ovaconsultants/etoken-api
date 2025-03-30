-- DROP SCHEMA etoken;

CREATE SCHEMA etoken AUTHORIZATION postgres;

-- DROP SEQUENCE etoken.tbl_account_account_id_seq;

CREATE SEQUENCE etoken.tbl_account_account_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_advertisement_payment_details_payment_id_seq;

CREATE SEQUENCE etoken.tbl_advertisement_payment_details_payment_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_advertisements_ad_id_seq;

CREATE SEQUENCE etoken.tbl_advertisements_ad_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_category_category_id_seq;

CREATE SEQUENCE etoken.tbl_category_category_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_clinic_clinic_id_seq;

CREATE SEQUENCE etoken.tbl_clinic_clinic_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_doctor_clinic_schedule_schedule_id_seq;

CREATE SEQUENCE etoken.tbl_doctor_clinic_schedule_schedule_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_doctor_doctor_id_seq;

CREATE SEQUENCE etoken.tbl_doctor_doctor_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_exception_log_exception_id_seq;

CREATE SEQUENCE etoken.tbl_exception_log_exception_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_patient_patient_id_seq;

CREATE SEQUENCE etoken.tbl_patient_patient_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_provider_registration_provider_registration_id_seq;

CREATE SEQUENCE etoken.tbl_provider_registration_provider_registration_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_roles_role_id_seq;

CREATE SEQUENCE etoken.tbl_roles_role_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_specialization_specialization_id_seq;

CREATE SEQUENCE etoken.tbl_specialization_specialization_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_subcategory_subcategory_id_seq;

CREATE SEQUENCE etoken.tbl_subcategory_subcategory_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_token_status_status_id_seq;

CREATE SEQUENCE etoken.tbl_token_status_status_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE etoken.tbl_token_token_id_seq;

CREATE SEQUENCE etoken.tbl_token_token_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- etoken.tbl_account definition

-- Drop table

-- DROP TABLE etoken.tbl_account;

CREATE TABLE etoken.tbl_account (
	account_id serial4 NOT NULL,
	account_name varchar(100) NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_account_account_name_key UNIQUE (account_name),
	CONSTRAINT tbl_account_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_account_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_account_pkey PRIMARY KEY (account_id)
);

-- Table Triggers

create trigger trg_update_account_modified before
update
    on
    etoken.tbl_account for each row execute function etoken.update_modified_timestamp();


-- etoken.tbl_advertisement_payment_details definition

-- Drop table

-- DROP TABLE etoken.tbl_advertisement_payment_details;

CREATE TABLE etoken.tbl_advertisement_payment_details (
	payment_id serial4 NOT NULL,
	ad_id int4 NULL,
	amount numeric(10, 2) NOT NULL,
	payment_date date NOT NULL,
	is_paid bool DEFAULT false NULL,
	effective_date date NOT NULL,
	end_date date NOT NULL,
	company_name varchar(255) NOT NULL,
	payment_method varchar(100) NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	created_by varchar(100) DEFAULT 'system'::character varying NOT NULL,
	modified_by varchar(100) NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	CONSTRAINT tbl_advertisement_payment_details_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_advertisement_payment_details_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_advertisement_payment_details_pkey PRIMARY KEY (payment_id)
);


-- etoken.tbl_category definition

-- Drop table

-- DROP TABLE etoken.tbl_category;

CREATE TABLE etoken.tbl_category (
	category_id serial4 NOT NULL,
	category_name varchar(100) NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_category_category_name_key UNIQUE (category_name),
	CONSTRAINT tbl_category_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_category_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_category_pkey PRIMARY KEY (category_id)
);


-- etoken.tbl_exception_log definition

-- Drop table

-- DROP TABLE etoken.tbl_exception_log;

CREATE TABLE etoken.tbl_exception_log (
	exception_id serial4 NOT NULL,
	exception_description text NOT NULL,
	platform varchar(50) NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	updated_by varchar(100) NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_exception_log_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_exception_log_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_exception_log_pkey PRIMARY KEY (exception_id)
);

-- Table Triggers

create trigger trg_update_exception_modified before
update
    on
    etoken.tbl_exception_log for each row execute function etoken.update_exception_modified_timestamp();


-- etoken.tbl_roles definition

-- Drop table

-- DROP TABLE etoken.tbl_roles;

CREATE TABLE etoken.tbl_roles (
	role_id serial4 NOT NULL,
	role_name varchar(50) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	CONSTRAINT tbl_roles_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_roles_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_roles_pkey PRIMARY KEY (role_id),
	CONSTRAINT tbl_roles_role_name_key UNIQUE (role_name)
);


-- etoken.tbl_token_status definition

-- Drop table

-- DROP TABLE etoken.tbl_token_status;

CREATE TABLE etoken.tbl_token_status (
	status_id serial4 NOT NULL,
	status_name varchar(100) NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_token_status_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_token_status_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_token_status_pkey PRIMARY KEY (status_id),
	CONSTRAINT tbl_token_status_status_name_key UNIQUE (status_name)
);

-- Table Triggers

create trigger trg_update_token_status_modified before
update
    on
    etoken.tbl_token_status for each row execute function etoken.update_token_status_modified_timestamp();


-- etoken.tbl_clinic definition

-- Drop table

-- DROP TABLE etoken.tbl_clinic;

CREATE TABLE etoken.tbl_clinic (
	clinic_id serial4 NOT NULL,
	clinic_name varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	city varchar(100) NOT NULL,
	state varchar(100) NOT NULL,
	zip_code varchar(20) NOT NULL,
	doctor_id int4 NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_clinic_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_clinic_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_clinic_pkey PRIMARY KEY (clinic_id),
	CONSTRAINT tbl_clinic_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES etoken.tbl_account(account_id) ON DELETE CASCADE
);

-- Table Triggers

create trigger trg_update_clinic_modified before
update
    on
    etoken.tbl_clinic for each row execute function etoken.update_clinic_modified_timestamp();


-- etoken.tbl_patient definition

-- Drop table

-- DROP TABLE etoken.tbl_patient;

CREATE TABLE etoken.tbl_patient (
	patient_id serial4 NOT NULL,
	patient_name varchar(255) NOT NULL,
	mobile_number varchar(20) NULL,
	email varchar(255) NULL,
	patient_profile_picture_url text NULL,
	clinic_id int4 NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	area varchar(100) NULL,
	CONSTRAINT tbl_patient_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_patient_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_patient_pkey PRIMARY KEY (patient_id),
	CONSTRAINT tbl_patient_clinic_id_fkey FOREIGN KEY (clinic_id) REFERENCES etoken.tbl_clinic(clinic_id) ON DELETE CASCADE
);

-- Table Triggers

create trigger trg_update_patient_modified before
update
    on
    etoken.tbl_patient for each row execute function etoken.update_patient_modified_timestamp();


-- etoken.tbl_specialization definition

-- Drop table

-- DROP TABLE etoken.tbl_specialization;

CREATE TABLE etoken.tbl_specialization (
	specialization_id serial4 NOT NULL,
	account_id int4 NOT NULL,
	specialization_name varchar(100) NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	specialization_description varchar(255) NULL,
	CONSTRAINT tbl_specialization_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_specialization_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_specialization_pkey PRIMARY KEY (specialization_id),
	CONSTRAINT tbl_specialization_account_id_fkey FOREIGN KEY (account_id) REFERENCES etoken.tbl_account(account_id) ON DELETE CASCADE
);

-- Table Triggers

create trigger trg_update_specialization_modified before
update
    on
    etoken.tbl_specialization for each row execute function etoken.update_modified_timestamp();


-- etoken.tbl_subcategory definition

-- Drop table

-- DROP TABLE etoken.tbl_subcategory;

CREATE TABLE etoken.tbl_subcategory (
	subcategory_id serial4 NOT NULL,
	category_id int4 NOT NULL,
	subcategory_name varchar(100) NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_subcategory_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_subcategory_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_subcategory_pkey PRIMARY KEY (subcategory_id),
	CONSTRAINT tbl_subcategory_category_id_fkey FOREIGN KEY (category_id) REFERENCES etoken.tbl_category(category_id) ON DELETE CASCADE
);


-- etoken.tbl_doctor definition

-- Drop table

-- DROP TABLE etoken.tbl_doctor;

CREATE TABLE etoken.tbl_doctor (
	doctor_id serial4 NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	specialization_id int4 NOT NULL,
	mobile_number varchar(20) NOT NULL,
	phone_number varchar(20) NULL,
	email varchar(255) NOT NULL,
	profile_picture_url text NULL,
	is_active bpchar(1) DEFAULT 'N'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	"password" text DEFAULT '1234'::text NOT NULL,
	CONSTRAINT tbl_doctor_email_key UNIQUE (email),
	CONSTRAINT tbl_doctor_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_doctor_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_doctor_mobile_number_key UNIQUE (mobile_number),
	CONSTRAINT tbl_doctor_phone_number_key UNIQUE (phone_number),
	CONSTRAINT tbl_doctor_pkey PRIMARY KEY (doctor_id),
	CONSTRAINT tbl_doctor_specialization_id_fkey FOREIGN KEY (specialization_id) REFERENCES etoken.tbl_specialization(specialization_id) ON DELETE CASCADE
);


-- etoken.tbl_doctor_clinic_schedule definition

-- Drop table

-- DROP TABLE etoken.tbl_doctor_clinic_schedule;

CREATE TABLE etoken.tbl_doctor_clinic_schedule (
	schedule_id serial4 NOT NULL,
	doctor_id int4 NOT NULL,
	clinic_id int4 NOT NULL,
	day_of_week varchar(10) NOT NULL,
	start_time time NOT NULL,
	end_time time NOT NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_doctor_clinic_schedule_day_of_week_check CHECK (((day_of_week)::text = ANY ((ARRAY['Sunday'::character varying, 'Monday'::character varying, 'Tuesday'::character varying, 'Wednesday'::character varying, 'Thursday'::character varying, 'Friday'::character varying, 'Saturday'::character varying])::text[]))),
	CONSTRAINT tbl_doctor_clinic_schedule_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_doctor_clinic_schedule_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_doctor_clinic_schedule_pkey PRIMARY KEY (schedule_id),
	CONSTRAINT tbl_doctor_clinic_schedule_clinic_id_fkey FOREIGN KEY (clinic_id) REFERENCES etoken.tbl_clinic(clinic_id) ON DELETE CASCADE,
	CONSTRAINT tbl_doctor_clinic_schedule_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES etoken.tbl_doctor(doctor_id) ON DELETE CASCADE
);

-- Table Triggers

create trigger trg_update_schedule_modified before
update
    on
    etoken.tbl_doctor_clinic_schedule for each row execute function etoken.update_schedule_modified_timestamp();


-- etoken.tbl_provider_registration definition

-- Drop table

-- DROP TABLE etoken.tbl_provider_registration;

CREATE TABLE etoken.tbl_provider_registration (
	provider_registration_id serial4 NOT NULL,
	subcategory_id int4 NOT NULL,
	first_name varchar(100) NOT NULL,
	last_name varchar(100) NOT NULL,
	email varchar(255) NOT NULL,
	password_hash text NOT NULL,
	phone_number varchar(20) NULL,
	mobile_number varchar(20) NOT NULL,
	address_1 varchar(255) NOT NULL,
	address_2 varchar(255) NULL,
	address_3 varchar(255) NULL,
	address_4 varchar(255) NULL,
	role_id int4 DEFAULT 2 NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	deleted_by varchar(100) NULL,
	deleted_date timestamp NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	profile_picture_url text NULL,
	CONSTRAINT tbl_provider_registration_email_key UNIQUE (email),
	CONSTRAINT tbl_provider_registration_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_provider_registration_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_provider_registration_mobile_number_key UNIQUE (mobile_number),
	CONSTRAINT tbl_provider_registration_phone_number_key UNIQUE (phone_number),
	CONSTRAINT tbl_provider_registration_pkey PRIMARY KEY (provider_registration_id),
	CONSTRAINT tbl_provider_registration_role_id_fkey FOREIGN KEY (role_id) REFERENCES etoken.tbl_roles(role_id),
	CONSTRAINT tbl_provider_registration_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES etoken.tbl_subcategory(subcategory_id) ON DELETE CASCADE
);

-- Table Triggers

create trigger trg_update_modified_date before
update
    on
    etoken.tbl_provider_registration for each row execute function etoken.update_modified_date();


-- etoken.tbl_token definition

-- Drop table

-- DROP TABLE etoken.tbl_token;

CREATE TABLE etoken.tbl_token (
	token_id serial4 NOT NULL,
	token_no int4 NOT NULL,
	patient_id int4 NOT NULL,
	clinic_id int4 NOT NULL,
	doctor_id int4 NOT NULL,
	schedule_id int4 NULL,
	emergency bpchar(1) DEFAULT 'N'::bpchar NULL,
	fee_amount numeric(10, 2) DEFAULT 0.00 NULL,
	fee_status varchar(10) DEFAULT 'Not Paid'::character varying NULL,
	status varchar(20) DEFAULT 'Waiting'::character varying NULL,
	is_active bpchar(1) DEFAULT 'Y'::bpchar NULL,
	is_deleted bpchar(1) DEFAULT 'N'::bpchar NULL,
	created_by varchar(100) NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	modified_by varchar(100) NULL,
	modified_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	recall bool DEFAULT false NULL,
	CONSTRAINT tbl_token_emergency_check CHECK ((emergency = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_token_fee_status_check CHECK (((fee_status)::text = ANY ((ARRAY['Paid'::character varying, 'Not Paid'::character varying])::text[]))),
	CONSTRAINT tbl_token_is_active_check CHECK ((is_active = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_token_is_deleted_check CHECK ((is_deleted = ANY (ARRAY['Y'::bpchar, 'N'::bpchar]))),
	CONSTRAINT tbl_token_pkey PRIMARY KEY (token_id),
	CONSTRAINT tbl_token_status_check CHECK (((status)::text = ANY ((ARRAY['Waiting'::character varying, 'In Progress'::character varying, 'Completed'::character varying, 'Cancelled'::character varying])::text[]))),
	CONSTRAINT tbl_token_schedule_id_fkey FOREIGN KEY (schedule_id) REFERENCES etoken.tbl_doctor_clinic_schedule(schedule_id) ON DELETE CASCADE
);

-- Table Triggers

create trigger trg_update_token_modified before
update
    on
    etoken.tbl_token for each row execute function etoken.update_token_modified_timestamp();


-- etoken.tbl_advertisements definition

-- Drop table

-- DROP TABLE etoken.tbl_advertisements;

CREATE TABLE etoken.tbl_advertisements (
	ad_id serial4 NOT NULL,
	doctor_id int4 NULL,
	clinic_id int4 NULL,
	company_name varchar(255) NOT NULL,
	content_type varchar(50) NULL,
	content_url text NOT NULL,
	display_duration int4 NULL,
	is_active bool DEFAULT true NULL,
	display_frequency interval NULL,
	start_date timestamp NULL,
	end_date timestamp NULL,
	start_time time NULL,
	end_time time NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_advertisements_content_type_check CHECK (((content_type)::text = ANY ((ARRAY['Image'::character varying, 'Video'::character varying])::text[]))),
	CONSTRAINT tbl_advertisements_display_duration_check CHECK ((display_duration > 0)),
	CONSTRAINT tbl_advertisements_pkey PRIMARY KEY (ad_id),
	CONSTRAINT tbl_advertisements_clinic_id_fkey FOREIGN KEY (clinic_id) REFERENCES etoken.tbl_clinic(clinic_id) ON DELETE CASCADE,
	CONSTRAINT tbl_advertisements_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES etoken.tbl_doctor(doctor_id) ON DELETE CASCADE
);



-- DROP FUNCTION etoken.fn_doctor_signin(varchar, varchar);

CREATE OR REPLACE FUNCTION etoken.fn_doctor_signin(p_email_or_mobile character varying, p_password character varying)
 RETURNS TABLE(doctor_id integer, doctor_name character varying, clinic_id integer, clinic_name character varying, clinic_address character varying, clinic_city character varying, clinic_state character varying, clinic_zipcode character varying, profile_picture_url character varying, specialization_name character varying, specialization_description character varying, success boolean, message character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Return all matching doctor records
    RETURN QUERY 
    SELECT 
        d.doctor_id, 
        (d.first_name || ' ' || d.last_name)::VARCHAR AS doctor_name,
        c.clinic_id, 
        c.clinic_name::VARCHAR,
        c.address AS clinic_address,
        c.city AS clinic_city,
        c.state AS clinic_state,
        c.zip_code AS clinic_zipcode,
        COALESCE(d.profile_picture_url, '')::VARCHAR AS profile_picture_url,
        s.specialization_name::VARCHAR,
        s.specialization_description::VARCHAR,
        CASE 
            WHEN d.password = p_password THEN TRUE 
            ELSE FALSE 
        END AS success,
        CASE 
            WHEN d.password = p_password THEN 'Authentication successful'::VARCHAR
            ELSE 'Incorrect password'::VARCHAR
        END AS message
    FROM etoken.tbl_doctor d
    INNER JOIN etoken.tbl_clinic c ON d.doctor_id = c.doctor_id
    LEFT JOIN etoken.tbl_specialization s 
        ON d.specialization_id = s.specialization_id AND s.is_active = 'Y'
    WHERE 
        (d.email = p_email_or_mobile OR d.mobile_number = p_email_or_mobile)
        AND d.is_active = 'Y' 
        AND d.is_deleted = 'N';

    -- If no record is found, return an error message
    IF NOT FOUND THEN
        RETURN QUERY 
        SELECT 
            NULL::INT, NULL::VARCHAR, NULL::INT, NULL::VARCHAR,
            NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR,
            NULL::VARCHAR, NULL::VARCHAR, NULL::VARCHAR,
            FALSE, 'Invalid email or mobile number'::VARCHAR;
    END IF;
END;
$function$
;

-- DROP FUNCTION etoken.fn_fetch_active_advertisements(int4, int4);

CREATE OR REPLACE FUNCTION etoken.fn_fetch_active_advertisements(p_doctor_id integer, p_clinic_id integer)
 RETURNS TABLE(ad_id integer, doctor_id integer, clinic_id integer, company_name character varying, content_type character varying, content_url text, display_duration integer, display_frequency interval, start_date timestamp without time zone, end_date timestamp without time zone, start_time time without time zone, end_time time without time zone, is_active boolean, amount numeric, payment_date date, payment_method character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        a.ad_id,
        a.doctor_id,
        c.clinic_id,
        a.company_name,
        a.content_type,
        a.content_url,
        a.display_duration,
        a.display_frequency,
        a.start_date,
        a.end_date,
        a.start_time,
        a.end_time,
        a.is_active,
        p.amount,
        p.payment_date,
        p.payment_method
    FROM etoken.tbl_advertisements a
    LEFT JOIN etoken.tbl_doctor d ON a.doctor_id = d.doctor_id
    LEFT JOIN etoken.tbl_clinic c ON d.doctor_id = c.doctor_id
    LEFT JOIN etoken.tbl_advertisement_payment_details p ON a.ad_id = p.ad_id
    WHERE a.doctor_id = p_doctor_id
    AND c.clinic_id = p_clinic_id
    -- AND p.is_paid = TRUE  -- Commented out to fetch all advertisements regardless of payment status
    -- AND p.end_date > CURRENT_DATE  -- Commented out to include expired advertisements
    AND a.is_active = TRUE  -- Commented out to include inactive advertisements
    ORDER BY a.start_date ASC;
END;
$function$
;

-- DROP FUNCTION etoken.fn_fetch_advertisement_payments_by_ad_id(int4);

CREATE OR REPLACE FUNCTION etoken.fn_fetch_advertisement_payments_by_ad_id(p_ad_id integer)
 RETURNS TABLE(payment_id integer, ad_id integer, amount numeric, payment_date date, is_paid boolean, effective_date date, end_date date, company_name character varying, payment_method character varying, is_active character, is_deleted character, created_date timestamp without time zone, modified_date timestamp without time zone, created_by character varying, modified_by character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        tapd.payment_id,
        tapd.ad_id,
        tapd.amount,
        tapd.payment_date,
        tapd.is_paid,
        tapd.effective_date,
        tapd.end_date,
        tapd.company_name,
        tapd.payment_method,
        tapd.is_active,
        tapd.is_deleted,
        tapd.created_date,
        tapd.modified_date,
        tapd.created_by,
        tapd.modified_by
    FROM etoken.tbl_advertisement_payment_details tapd
    WHERE 
        tapd.ad_id = p_ad_id
        AND tapd.is_deleted = 'N' -- Fetch only non-deleted records
    ORDER BY tapd.payment_date DESC;
END;
$function$
;

-- DROP FUNCTION etoken.fn_fetch_advertisements(int4, int4, varchar);

CREATE OR REPLACE FUNCTION etoken.fn_fetch_advertisements(p_doctor_id integer, p_clinic_id integer, p_filter_type character varying DEFAULT 'ALL'::character varying)
 RETURNS TABLE(ad_id integer, doctor_id integer, clinic_id integer, company_name character varying, content_type character varying, content_url text, display_duration integer, display_frequency interval, start_date timestamp without time zone, end_date timestamp without time zone, start_time time without time zone, end_time time without time zone, is_active boolean, amount numeric, payment_date date, payment_method character varying, days_left_to_expire integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        a.ad_id,
        a.doctor_id,
        c.clinic_id,
        a.company_name,
        a.content_type,
        a.content_url,
        a.display_duration,
        a.display_frequency,
        a.start_date,
        a.end_date,
        a.start_time,
        a.end_time,
        a.is_active,
        p.amount,
        p.payment_date,
        p.payment_method,
        CASE 
            WHEN a.end_date IS NOT NULL AND a.end_date > CURRENT_DATE 
                 AND (a.end_date::date - CURRENT_DATE) <= 15
            THEN (a.end_date::date - CURRENT_DATE)::integer
            ELSE NULL
        END AS days_left_to_expire
    FROM etoken.tbl_advertisements a
    LEFT JOIN etoken.tbl_doctor d ON a.doctor_id = d.doctor_id
    LEFT JOIN etoken.tbl_clinic c ON d.doctor_id = c.doctor_id
    LEFT JOIN etoken.tbl_advertisement_payment_details p ON a.ad_id = p.ad_id
    WHERE a.doctor_id = p_doctor_id
      AND c.clinic_id = p_clinic_id
      AND (
          LOWER(p_filter_type) = 'all'
          OR (LOWER(p_filter_type) = 'active' AND p.is_paid = TRUE AND a.end_date > CURRENT_DATE)
          OR (LOWER(p_filter_type) = 'expired' AND p.is_paid = FALSE AND a.end_date < CURRENT_DATE)
      )
    ORDER BY a.start_date ASC;
END;
$function$
;

-- DROP FUNCTION etoken.fn_fetch_all_doctors();

CREATE OR REPLACE FUNCTION etoken.fn_fetch_all_doctors()
 RETURNS TABLE(doctor_id integer, first_name character varying, last_name character varying, specialization_id integer, specialization_name character varying, mobile_number character varying, phone_number character varying, email character varying, profile_picture_url text, is_active character, created_by character varying, created_date timestamp without time zone, modified_by character varying, modified_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        d.doctor_id,
        d.first_name,
        d.last_name,
        d.specialization_id,
        s.specialization_name,
        d.mobile_number,
        d.phone_number,
        d.email,
        d.profile_picture_url,
        d.is_active,
        d.created_by,
        d.created_date,
        d.modified_by,
        d.modified_date
    FROM etoken.tbl_doctor d
    INNER JOIN etoken.tbl_specialization s ON d.specialization_id = s.specialization_id
    WHERE d.is_deleted = 'N'
    ORDER BY d.created_date DESC;
END;
$function$
;

-- DROP FUNCTION etoken.fn_fetch_all_exceptions();

CREATE OR REPLACE FUNCTION etoken.fn_fetch_all_exceptions()
 RETURNS TABLE(exception_id integer, exception_description text, platform character varying, is_active character, is_deleted character, created_by character varying, updated_by character varying, created_date timestamp without time zone, modified_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        e.exception_id,
        e.exception_description,
        e.platform,
        e.is_active,
        e.is_deleted,
        e.created_by,
        e.updated_by,
        e.created_date,
        e.modified_date
    FROM etoken.tbl_exception_log e
    WHERE e.is_deleted = 'N'
    ORDER BY e.created_date DESC;
END;
$function$
;

-- DROP FUNCTION etoken.fn_fetch_all_patients();

-- DROP FUNCTION etoken.fn_fetch_all_patients();

CREATE OR REPLACE FUNCTION etoken.fn_fetch_all_patients()
 RETURNS TABLE(patient_id integer, initials character varying, patient_name character varying, mobile_number character varying, email character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        p.patient_id,
 -- Generate initials
        CAST (UPPER(
            CASE 
                WHEN POSITION(' ' IN p.patient_name) > 0 
                THEN LEFT(p.patient_name, 1) || LEFT(SPLIT_PART(p.patient_name, ' ', 2), 1)
                ELSE LEFT(p.patient_name, 2)
            END) AS VARCHAR(10)
        ) AS initials ,
        p.patient_name,       
        p.mobile_number,
        p.email
    FROM etoken.tbl_patient p
    WHERE p.is_active = 'Y' AND p.is_deleted = 'N'
    ORDER BY p.created_date DESC;
END;
$function$
;
;

-- DROP FUNCTION etoken.fn_fetch_clinics_by_doctor_id(int4);

CREATE OR REPLACE FUNCTION etoken.fn_fetch_clinics_by_doctor_id(p_doctor_id integer)
 RETURNS TABLE(clinic_id integer, clinic_name character varying, address character varying, city character varying, state character varying, zip_code character varying, is_active character, created_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        tc.clinic_id,
        tc.clinic_name,
        tc.address,
        tc.city,
        tc.state,
        tc.zip_code,
        tc.is_active,
        tc.created_date
    FROM etoken.tbl_clinic tc
    WHERE doctor_id = p_doctor_id
    AND tc.is_active = 'Y'
    AND tc.is_deleted = 'N'
    ORDER BY created_date DESC;
END;
$function$
;

-- DROP FUNCTION etoken.fn_fetch_individual_patient_in_queue(int4, int4, int4);

CREATE OR REPLACE FUNCTION etoken.fn_fetch_individual_patient_in_queue(p_patient_id integer, p_doctor_id integer, p_clinic_id integer)
 RETURNS TABLE(token_id integer, token_no integer, patient_id integer, patient_name character varying, patient_mobile character varying, patient_email character varying, patient_profile_picture_url character varying, clinic_id integer, clinic_name character varying, doctor_id integer, doctor_name character varying, status character varying, fee_status character varying, created_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        t.token_id::INTEGER,
        t.token_no::INTEGER,
        p.patient_id::INTEGER,
        p.patient_name::VARCHAR,
        p.mobile_number::VARCHAR AS patient_mobile,
        p.email::VARCHAR AS patient_email,
        p.patient_profile_picture_url::VARCHAR,
        c.clinic_id::INTEGER,
        c.clinic_name::VARCHAR,
        d.doctor_id::INTEGER,
        (d.first_name || ' ' || d.last_name)::VARCHAR AS doctor_name,
        t.status::VARCHAR,
        t.fee_status::VARCHAR,
        t.created_date::TIMESTAMP
    FROM etoken.tbl_token t
    INNER JOIN etoken.tbl_patient p ON t.patient_id = p.patient_id
    INNER JOIN etoken.tbl_clinic c ON t.clinic_id = c.clinic_id
    INNER JOIN etoken.tbl_doctor d ON t.doctor_id = d.doctor_id
    WHERE t.patient_id = p_patient_id
    AND t.doctor_id = p_doctor_id
    AND t.clinic_id = p_clinic_id
    AND t.is_active = 'Y'
    AND t.is_deleted = 'N'
    ORDER BY t.created_date DESC
    LIMIT 1;
END;
$function$
;

-- DROP FUNCTION etoken.fn_fetch_tokens_for_patients(int4, int4);

CREATE OR REPLACE FUNCTION etoken.fn_fetch_tokens_for_patients(p_doctor_id integer, p_clinic_id integer)
 RETURNS TABLE(token_id integer, patient_id integer, patient_name character varying, mobile_number character varying, patient_profile_picture_url text, token_no integer, emergency character, fee_amount numeric, fee_status character varying, status character varying, recall boolean, created_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        t.token_id,
		p.patient_id,
        p.patient_name,
		p.mobile_number,
        p.patient_profile_picture_url,
        t.token_no,
        t.emergency,
        t.fee_amount,
        t.fee_status,
        t.status,
        t.recall,  -- ✅ Now correctly returns a BOOLEAN
        t.created_date
    FROM etoken.tbl_token t
    INNER JOIN etoken.tbl_patient p ON t.patient_id = p.patient_id
    WHERE 
        t.doctor_id = p_doctor_id
        AND t.clinic_id = p_clinic_id
        AND t.status IN ('Waiting', 'In Progress', 'On Hold')
        AND t.is_deleted = 'N'
        AND t.is_active = 'Y'
    ORDER BY t.created_date ASC;
END;
$function$
;

-- DROP FUNCTION etoken.fn_get_all_accounts();

CREATE OR REPLACE FUNCTION etoken.fn_get_all_accounts()
 RETURNS TABLE(account_id integer, account_name character varying, is_active character, is_deleted character, created_by character varying, created_date timestamp without time zone, modified_by character varying, modified_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        ta.account_id, 
        ta.account_name, 
        ta.is_active, 
        ta.is_deleted, 
        ta.created_by, 
        ta.created_date, 
        ta.modified_by, 
        ta.modified_date
    FROM etoken.tbl_account ta
    WHERE ta.is_deleted = 'N' AND ta.is_active = 'Y';
END;
$function$
;

-- DROP FUNCTION etoken.fn_get_all_categories();

CREATE OR REPLACE FUNCTION etoken.fn_get_all_categories()
 RETURNS TABLE(category_id integer, category_name character varying, is_active character, is_deleted character, created_by character varying, created_date timestamp without time zone, modified_by character varying, modified_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        tc.category_id, 
        tc.category_name, 
        tc.is_active, 
        tc.is_deleted, 
        tc.created_by, 
        tc.created_date, 
        tc.modified_by, 
        tc.modified_date
    FROM etoken.tbl_category tc
    WHERE tc.is_deleted = 'N' AND tc.is_active = 'Y';  -- Fetch only active and non-deleted categories
END;
$function$
;

-- DROP FUNCTION etoken.fn_get_next_token_no(int4);

CREATE OR REPLACE FUNCTION etoken.fn_get_next_token_no(p_clinic_id integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    next_token INT;
BEGIN
    -- Get the last token_no for today in the given clinic
    SELECT COALESCE(MAX(token_no), 0) + 1 INTO next_token
    FROM etoken.tbl_token
    WHERE clinic_id = p_clinic_id
    AND DATE(created_date) = CURRENT_DATE;

    RETURN next_token;
END;
$function$
;

-- DROP FUNCTION etoken.fn_get_specializations_by_account(int4);

CREATE OR REPLACE FUNCTION etoken.fn_get_specializations_by_account(p_account_id integer)
 RETURNS TABLE(specialization_id integer, account_id integer, specialization_name character varying, is_active character, is_deleted character, created_by character varying, created_date timestamp without time zone, modified_by character varying, modified_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        ts.specialization_id, 
        ts.account_id, 
        ts.specialization_name, 
        ts.is_active, 
        ts.is_deleted, 
        ts.created_by, 
        ts.created_date, 
        ts.modified_by, 
        ts.modified_date
    FROM etoken.tbl_specialization ts
    WHERE ts.account_id = p_account_id AND ts.is_deleted = 'N' AND ts.is_active = 'Y';
END;
$function$
;

-- DROP FUNCTION etoken.fn_get_subcategories_by_category(int4);

CREATE OR REPLACE FUNCTION etoken.fn_get_subcategories_by_category(p_category_id integer)
 RETURNS TABLE(subcategory_id integer, category_id integer, subcategory_name character varying, is_active character, is_deleted character, created_by character varying, created_date timestamp without time zone, modified_by character varying, modified_date timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY 
    SELECT 
        ts.subcategory_id, 
        ts.category_id, 
        ts.subcategory_name, 
        ts.is_active, 
        ts.is_deleted, 
        ts.created_by, 
        ts.created_date, 
        ts.modified_by, 
        ts.modified_date
    FROM etoken.tbl_subcategory ts
    WHERE ts.category_id = p_category_id 
      AND ts.is_deleted = 'N' 
      AND ts.is_active = 'Y';  -- Fetch only active and non-deleted subcategories
END;
$function$
;

-- DROP FUNCTION etoken.fn_insert_token(int4, int4, int4, varchar, int4, bpchar, numeric, varchar, varchar);

CREATE OR REPLACE FUNCTION etoken.fn_insert_token(p_patient_id integer, p_clinic_id integer, p_doctor_id integer, p_created_by character varying, p_schedule_id integer DEFAULT NULL::integer, p_emergency character DEFAULT 'N'::bpchar, p_fee_amount numeric DEFAULT 0.00, p_fee_status character varying DEFAULT 'Not Paid'::character varying, p_status character varying DEFAULT 'Waiting'::character varying)
 RETURNS TABLE(new_token_id integer, new_token_no integer, message text)
 LANGUAGE plpgsql
AS $function$
DECLARE
    existing_token_id INTEGER;
    existing_token_no INTEGER;
    new_token_id INTEGER;
    new_token_no INTEGER;
BEGIN
    -- Ensure the patient exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_patient WHERE patient_id = p_patient_id) THEN
        RETURN QUERY SELECT NULL, NULL, 'Patient ID does not exist';
        RETURN;
    END IF;

    -- Ensure the clinic exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_clinic WHERE clinic_id = p_clinic_id) THEN
        RETURN QUERY SELECT NULL, NULL, 'Clinic ID does not exist';
        RETURN;
    END IF;

    -- Ensure the doctor exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_doctor WHERE doctor_id = p_doctor_id) THEN
        RETURN QUERY SELECT NULL, NULL, 'Doctor ID does not exist';
        RETURN;
    END IF;

    -- Ensure the schedule exists if provided
    IF p_schedule_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM etoken.tbl_doctor_clinic_schedule WHERE schedule_id = p_schedule_id) THEN
        RETURN QUERY SELECT NULL, NULL, 'Schedule ID does not exist';
        RETURN;
    END IF;

    -- Check if the patient already has a token with status 'Waiting' or 'In Progress'
    SELECT token_id, token_no INTO existing_token_id, existing_token_no
    FROM etoken.tbl_token
    WHERE patient_id = p_patient_id 
    AND clinic_id = p_clinic_id 
    AND doctor_id = p_doctor_id
    AND status IN ('Waiting', 'In Progress')
    AND is_deleted = 'N'
    AND DATE(created_date) = CURRENT_DATE;

    -- If the patient already has a token, return the existing token
    IF existing_token_id IS NOT NULL THEN
        RETURN QUERY SELECT existing_token_id, existing_token_no, 'Patient already has an active token';
        RETURN;
    END IF;

    -- Get the next token_no for today in the clinic
    SELECT COALESCE(MAX(token_no), 0) + 1 INTO new_token_no
    FROM etoken.tbl_token
    WHERE clinic_id = p_clinic_id 
    AND doctor_id = p_doctor_id
    AND DATE(created_date) = CURRENT_DATE;

    -- Insert new token and return ID
    INSERT INTO etoken.tbl_token (
        patient_id, clinic_id, doctor_id, schedule_id, token_no, emergency, fee_amount, 
        fee_status, status, is_active, is_deleted, created_by, created_date
    ) 
    VALUES (
        p_patient_id, p_clinic_id, p_doctor_id, p_schedule_id, new_token_no, p_emergency, p_fee_amount, 
        p_fee_status, p_status, 'Y', 'N', p_created_by, CURRENT_TIMESTAMP
    )
    RETURNING tbl_token.token_id INTO new_token_id;

    -- Return the inserted token ID, token number, and success message
    RETURN QUERY SELECT new_token_id, new_token_no, 'Token inserted successfully';
END;
$function$
;

-- DROP FUNCTION etoken.fn_toggle_recall_status(int4, varchar);

CREATE OR REPLACE FUNCTION etoken.fn_toggle_recall_status(p_token_id integer, p_modified_by character varying)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    current_recall BOOLEAN;
    new_recall BOOLEAN;
BEGIN
    -- Check if the token exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_token WHERE token_id = p_token_id) THEN
        RETURN 'Error: Token ID ' || p_token_id || ' does not exist';
    END IF;

    -- Get the current recall value
    SELECT recall INTO current_recall FROM etoken.tbl_token WHERE token_id = p_token_id;

    -- Toggle recall value (if true, make false; if false, make true)
    new_recall := NOT current_recall;

    -- Update recall status
    UPDATE etoken.tbl_token
    SET 
        recall = new_recall,
        modified_by = p_modified_by,
        modified_date = CURRENT_TIMESTAMP
    WHERE token_id = p_token_id;

    RETURN 'Token ID ' || p_token_id || ' recall status toggled to ' || new_recall;
END;
$function$
;

-- DROP FUNCTION etoken.fn_update_patient(int4, varchar, varchar, varchar, varchar);

CREATE OR REPLACE FUNCTION etoken.fn_update_patient(p_patient_id integer, p_patient_name character varying, p_mobile_number character varying, p_email character varying, p_modified_by character varying)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- Check if the patient exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_patient WHERE patient_id = p_patient_id) THEN
        RETURN 'Error: Patient with given ID does not exist';
    END IF;

    -- Update patient details
    UPDATE etoken.tbl_patient
    SET 
        patient_name = COALESCE(p_patient_name, patient_name),
        mobile_number = COALESCE(p_mobile_number, mobile_number),
        email = COALESCE(p_email, email),
        modified_by   = p_modified_by,
        modified_date = CURRENT_TIMESTAMP
    WHERE patient_id = p_patient_id;

    RETURN 'Patient information updated successfully';
END;
$function$
;

-- DROP PROCEDURE etoken.sp_doctor_account_toggle(in int4, out bpchar, out text);

CREATE OR REPLACE PROCEDURE etoken.sp_doctor_account_toggle(IN p_doctor_id integer, OUT updated_status character, OUT message text)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
    current_status CHAR(1);
BEGIN
    -- Check if the doctor exists
    SELECT is_active INTO current_status 
    FROM etoken.tbl_doctor 
    WHERE doctor_id = p_doctor_id;

    -- If doctor does not exist, return an error
    IF current_status IS NULL THEN
        updated_status := NULL;
        message := 'Doctor ID ' || p_doctor_id || ' does not exist';
        RETURN;
    END IF;

    -- Toggle the status (Activate if inactive, deactivate if active)
    IF current_status = 'N' THEN
        updated_status := 'Y';
        message := 'Doctor ID ' || p_doctor_id || ' has been activated';
    ELSE
        updated_status := 'N';
        message := 'Doctor ID ' || p_doctor_id || ' has been deactivated';
    END IF;

    -- Update the doctor's status
    UPDATE etoken.tbl_doctor 
    SET is_active = updated_status, modified_date = CURRENT_TIMESTAMP 
    WHERE doctor_id = p_doctor_id;
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_insert_advertisement(int4, int4, varchar, varchar, text, int4, interval, timestamp, timestamp, time, time);

CREATE OR REPLACE PROCEDURE etoken.sp_insert_advertisement(IN p_doctor_id integer, IN p_clinic_id integer, IN p_company_name character varying, IN p_content_type character varying, IN p_content_url text, IN p_display_duration integer, IN p_display_frequency interval, IN p_start_date timestamp without time zone, IN p_end_date timestamp without time zone, IN p_start_time time without time zone, IN p_end_time time without time zone)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Validate Content Type
    IF p_content_type NOT IN ('Image', 'Video') THEN
        RAISE EXCEPTION 'Invalid content type. Must be Image or Video';
    END IF;

    -- Ensure the doctor exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_doctor WHERE doctor_id = p_doctor_id) THEN
        RAISE EXCEPTION 'Doctor ID % does not exist', p_doctor_id;
    END IF;

    -- Ensure the clinic exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_clinic WHERE clinic_id = p_clinic_id) THEN
        RAISE EXCEPTION 'Clinic ID % does not exist', p_clinic_id;
    END IF;

    -- Insert advertisement
    INSERT INTO etoken.tbl_advertisements (
        doctor_id, clinic_id, company_name, content_type, content_url, display_duration,
        display_frequency, start_date, end_date, start_time, end_time, is_active, created_at
    ) VALUES (
        p_doctor_id, p_clinic_id, p_company_name, p_content_type, p_content_url, p_display_duration,
        p_display_frequency, p_start_date, p_end_date, p_start_time, p_end_time, TRUE, CURRENT_TIMESTAMP
    );

    -- Return success message
    RAISE NOTICE 'Advertisement inserted successfully';
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_insert_advertisement_payment(in int4, in numeric, in date, in bool, in date, in date, in varchar, in varchar, out text);

CREATE OR REPLACE PROCEDURE etoken.sp_insert_advertisement_payment(IN p_ad_id integer, IN p_amount numeric, IN p_payment_date date, IN p_is_paid boolean, IN p_effective_date date, IN p_end_date date, IN p_company_name character varying, IN p_payment_method character varying, OUT message text)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Ensure the advertisement exists before inserting payment
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_advertisements WHERE ad_id = p_ad_id) THEN
        message := 'Error: Advertisement ID ' || p_ad_id || ' does not exist';
        RETURN;
    END IF;

    -- Check if a payment already exists for the given ad_id
    IF EXISTS (
        SELECT 1 FROM etoken.tbl_advertisement_payment_details 
        WHERE ad_id = p_ad_id
    ) THEN
        message := 'Error: Payment for Advertisement ID ' || p_ad_id || ' already exists';
        RETURN;
    END IF;

    -- Insert into payment details table
    INSERT INTO etoken.tbl_advertisement_payment_details (
        ad_id, amount, payment_date, is_paid, effective_date, 
        end_date, company_name, payment_method, created_at
    ) VALUES (
        p_ad_id, p_amount, p_payment_date, p_is_paid, p_effective_date, 
        p_end_date, p_company_name, p_payment_method, CURRENT_TIMESTAMP
    );

    -- Return success message
    message := 'Advertisement payment inserted successfully for Ad ID ' || p_ad_id;
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_insert_clinic(varchar, varchar, varchar, varchar, varchar, int4, varchar);

CREATE OR REPLACE PROCEDURE etoken.sp_insert_clinic(IN p_clinic_name character varying, IN p_address character varying, IN p_city character varying, IN p_state character varying, IN p_zip_code character varying, IN p_doctor_id integer, IN p_created_by character varying)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
    v_exists INTEGER;
BEGIN
    -- Check if a clinic with the same name and doctor_id already exists
    SELECT COUNT(*)
    INTO v_exists
    FROM etoken.tbl_clinic
    WHERE clinic_name = p_clinic_name
      AND doctor_id = p_doctor_id
      AND is_deleted = 'N';  -- Consider only active records

    -- If it exists, raise an exception
    IF v_exists > 0 THEN
        RAISE EXCEPTION 'Clinic could not be added as it already exists with the same name and doctor';
    END IF;

    -- Insert new clinic record
    INSERT INTO etoken.tbl_clinic (
        clinic_name, address, city, state, zip_code, doctor_id, is_active, is_deleted, created_by, created_date
    ) VALUES (
        p_clinic_name, p_address, p_city, p_state, p_zip_code, p_doctor_id, 'Y', 'N', p_created_by, NOW()
    );
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_insert_doctor(varchar, varchar, int4, varchar, varchar, varchar, varchar);

CREATE OR REPLACE PROCEDURE etoken.sp_insert_doctor(IN p_first_name character varying, IN p_last_name character varying, IN p_specialization_id integer, IN p_mobile_number character varying, IN p_phone_number character varying, IN p_email character varying, IN p_created_by character varying)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
    v_exists INTEGER;
BEGIN
    -- Check if a doctor with the same email or mobile number already exists
    SELECT COUNT(*)
    INTO v_exists
    FROM etoken.tbl_doctor
    WHERE (email = p_email OR mobile_number = p_mobile_number)
      AND email IS NOT NULL  -- Ensure NULL values do not cause false positives
      AND mobile_number IS NOT NULL;

    -- If a duplicate is found, raise an exception
    IF v_exists > 0 THEN
        RAISE EXCEPTION 'Doctor could not be added as a doctor with the same email or mobile number already exists';
    END IF;

    -- Insert new doctor record
    INSERT INTO etoken.tbl_doctor (
        first_name, last_name, specialization_id, mobile_number, phone_number, email,
        created_by, created_date, modified_by, modified_date
    ) VALUES (
        p_first_name, p_last_name, p_specialization_id, p_mobile_number, p_phone_number, p_email,
        p_created_by, CURRENT_TIMESTAMP, NULL, CURRENT_TIMESTAMP
    );
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_insert_doctor_clinic_schedule(int4, int4, varchar, time, time, varchar);

CREATE OR REPLACE PROCEDURE etoken.sp_insert_doctor_clinic_schedule(IN p_doctor_id integer, IN p_clinic_id integer, IN p_day_of_week character varying, IN p_start_time time without time zone, IN p_end_time time without time zone, IN p_created_by character varying)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Ensure the doctor and clinic exist
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_doctor WHERE doctor_id = p_doctor_id) THEN
        RAISE EXCEPTION 'Doctor ID % does not exist', p_doctor_id;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_clinic WHERE clinic_id = p_clinic_id) THEN
        RAISE EXCEPTION 'Clinic ID % does not exist', p_clinic_id;
    END IF;

    -- Insert new schedule
    INSERT INTO etoken.tbl_doctor_clinic_schedule (
        doctor_id, clinic_id, day_of_week, start_time, end_time,
        is_active, is_deleted, created_by, created_date
    ) VALUES (
        p_doctor_id, p_clinic_id, p_day_of_week, p_start_time, p_end_time,
        'Y', 'N', p_created_by, CURRENT_TIMESTAMP
    );

    -- Notify successful insertion
    RAISE NOTICE 'Doctor clinic schedule added successfully';
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_insert_exception_log(in text, in varchar, in varchar, out int4);

CREATE OR REPLACE PROCEDURE etoken.sp_insert_exception_log(IN p_exception_description text, IN p_platform character varying, IN p_created_by character varying, OUT new_exception_id integer)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Step 1: Delete exception logs older than 1 month
    DELETE FROM etoken.tbl_exception_log 
    WHERE created_date < NOW() - INTERVAL '1 month';

    -- Step 2: Insert new exception log
    INSERT INTO etoken.tbl_exception_log (
        exception_description, platform, is_active, is_deleted,
        created_by, created_date
    )
    VALUES (
        p_exception_description, p_platform, 'Y', 'N',
        p_created_by, CURRENT_TIMESTAMP
    )
    RETURNING exception_id INTO new_exception_id;

    -- Log the new exception ID
    RAISE NOTICE 'Exception logged with ID: %', new_exception_id;
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_insert_patient(in varchar, in varchar, in varchar, in text, in int4, in varchar, out int4, out varchar, out varchar);

CREATE OR REPLACE PROCEDURE etoken.sp_insert_patient(IN p_patient_name character varying, IN p_mobile_number character varying, IN p_email character varying, IN p_patient_profile_picture_url text, IN p_clinic_id integer, IN p_created_by character varying, OUT patient_id integer, OUT inserted_patient_name character varying, OUT message character varying)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Check if a patient already exists with the same name, mobile number, and email
    SELECT tbl_patient.patient_id, tbl_patient.patient_name 
    INTO patient_id, inserted_patient_name
    FROM etoken.tbl_patient 
    WHERE LOWER(patient_name) = LOWER(p_patient_name)
          AND mobile_number = p_mobile_number
          AND (LOWER(email) = LOWER(p_email) OR p_email IS NULL)
          AND clinic_id = p_clinic_id
          AND is_deleted = 'N'
    LIMIT 1;

    -- If patient already exists, return existing ID
    IF patient_id IS NOT NULL THEN
        message := 'Patient already exists';
        RETURN;
    END IF;

    -- Insert new patient if no match found
    INSERT INTO etoken.tbl_patient (
        patient_name, mobile_number, email, patient_profile_picture_url, clinic_id,
        is_active, is_deleted, created_by, created_date
    ) 
    VALUES (
        p_patient_name, p_mobile_number, p_email, p_patient_profile_picture_url, p_clinic_id,
        'Y', 'N', p_created_by, CURRENT_TIMESTAMP
    )
    RETURNING tbl_patient.patient_id, tbl_patient.patient_name 
    INTO patient_id, inserted_patient_name;  

    -- Assign success message
    message := 'Patient inserted successfully';

END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_insert_token_status(varchar, varchar);

CREATE OR REPLACE PROCEDURE etoken.sp_insert_token_status(IN p_status_name character varying, IN p_created_by character varying)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Ensure status does not already exist
    IF EXISTS (SELECT 1 FROM etoken.tbl_token_status WHERE status_name = p_status_name) THEN
        RAISE EXCEPTION 'Status % already exists', p_status_name;
    END IF;

    -- Insert new token status
    INSERT INTO etoken.tbl_token_status (
        status_name, is_active, is_deleted, created_by, created_date
    ) VALUES (
        p_status_name, 'Y', 'N', p_created_by, CURRENT_TIMESTAMP
    );

    -- Notify successful insertion
    RAISE NOTICE 'Token status % added successfully', p_status_name;
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_register_provider(int4, varchar, varchar, varchar, text, varchar, varchar, varchar, varchar, varchar, varchar, text, varchar);

CREATE OR REPLACE PROCEDURE etoken.sp_register_provider(IN p_subcategory_id integer, IN p_first_name character varying, IN p_last_name character varying, IN p_email character varying, IN p_password text, IN p_phone_number character varying, IN p_mobile_number character varying, IN p_address_1 character varying, IN p_address_2 character varying, IN p_address_3 character varying, IN p_address_4 character varying, IN p_profile_picture_url text, IN p_created_by character varying)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
    v_existing_email INT;
BEGIN
    -- Check if the email already exists
    SELECT COUNT(*) INTO v_existing_email FROM tbl_provider_registration WHERE email = p_email;
    
    IF v_existing_email > 0 THEN
        RAISE EXCEPTION 'Email % is already registered', p_email;
    END IF;

    -- Insert the new provider
    INSERT INTO tbl_provider_registration (
        subcategory_id, first_name, last_name, email, password_hash, 
        phone_number, mobile_number, address_1, address_2, address_3, address_4, 
        profile_picture_url, role_id, is_active, is_deleted, created_by, created_date
    ) VALUES (
        p_subcategory_id, p_first_name, p_last_name, p_email, crypt(p_password, gen_salt('bf')), 
        p_phone_number, p_mobile_number, p_address_1, p_address_2, p_address_3, p_address_4, 
        p_profile_picture_url, 2, 'Y', 'N', p_created_by, CURRENT_TIMESTAMP
    );
    
    RAISE NOTICE 'Provider % successfully registered', p_email;
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_update_advertisement(in int4, in int4, in int4, in varchar, in varchar, in text, in int4, in interval, in timestamp, in timestamp, in time, in time, out text);

CREATE OR REPLACE PROCEDURE etoken.sp_update_advertisement(IN p_ad_id integer, IN p_doctor_id integer, IN p_clinic_id integer, IN p_company_name character varying, IN p_content_type character varying, IN p_content_url text, IN p_display_duration integer, IN p_display_frequency interval, IN p_start_date timestamp without time zone, IN p_end_date timestamp without time zone, IN p_start_time time without time zone, IN p_end_time time without time zone, OUT message text)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Check if the advertisement exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_advertisements WHERE ad_id = p_ad_id) THEN
        message := 'Advertisement ID ' || p_ad_id || ' does not exist';
        RETURN;
    END IF;

    -- Update advertisement details
    UPDATE etoken.tbl_advertisements
    SET 
        doctor_id = COALESCE(p_doctor_id, doctor_id),
        clinic_id = COALESCE(p_clinic_id, clinic_id),
        company_name = COALESCE(p_company_name, company_name),
        content_type = COALESCE(p_content_type, content_type),
        content_url = COALESCE(p_content_url, content_url),
        display_duration = COALESCE(p_display_duration, display_duration),
        display_frequency = COALESCE(p_display_frequency, display_frequency),
        start_date = COALESCE(p_start_date, start_date),
        end_date = COALESCE(p_end_date, end_date),
        start_time = COALESCE(p_start_time, start_time),
        end_time = COALESCE(p_end_time, end_time),
        created_at = CURRENT_TIMESTAMP
    WHERE ad_id = p_ad_id;

    message := 'Advertisement ID ' || p_ad_id || ' updated successfully';
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_update_advertisement_payment(in int4, in int4, in numeric, in date, in bool, in date, in date, in varchar, in varchar, in bpchar, in bpchar, in varchar, out text);

CREATE OR REPLACE PROCEDURE etoken.sp_update_advertisement_payment(IN p_payment_id integer, IN p_ad_id integer, IN p_amount numeric, IN p_payment_date date, IN p_is_paid boolean, IN p_effective_date date, IN p_end_date date, IN p_company_name character varying, IN p_payment_method character varying, IN p_is_active character, IN p_is_deleted character, IN p_modified_by character varying, OUT message text)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Check if the payment record exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_advertisement_payment_details WHERE payment_id = p_payment_id) THEN
        message := 'Error: Payment ID ' || p_payment_id || ' does not exist';
        RETURN;
    END IF;

    -- Validate is_active and is_deleted
    IF p_is_active NOT IN ('Y', 'N') THEN
        message := 'Error: Invalid is_active value. Allowed values: Y, N';
        RETURN;
    END IF;

    IF p_is_deleted NOT IN ('Y', 'N') THEN
        message := 'Error: Invalid is_deleted value. Allowed values: Y, N';
        RETURN;
    END IF;

    -- Update advertisement payment details
    UPDATE etoken.tbl_advertisement_payment_details
    SET 
        ad_id = COALESCE(p_ad_id, ad_id),
        amount = COALESCE(p_amount, amount),
        payment_date = COALESCE(p_payment_date, payment_date),
        is_paid = COALESCE(p_is_paid, is_paid),
        effective_date = COALESCE(p_effective_date, effective_date),
        end_date = COALESCE(p_end_date, end_date),
        company_name = COALESCE(p_company_name, company_name),
        payment_method = COALESCE(p_payment_method, payment_method),
        is_active = p_is_active,
        is_deleted = p_is_deleted,
        modified_by = p_modified_by,
        modified_date = CURRENT_TIMESTAMP
    WHERE payment_id = p_payment_id;

    message := 'Payment ID ' || p_payment_id || ' updated successfully';
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_update_doctor_profile_picture(int4, varchar);

CREATE OR REPLACE PROCEDURE etoken.sp_update_doctor_profile_picture(IN p_doctor_id integer, IN p_profile_picture_url character varying)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Check if doctor exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_doctor WHERE doctor_id = p_doctor_id) THEN
        RAISE EXCEPTION 'Doctor with ID % does not exist', p_doctor_id;
    END IF;

    -- Update profile picture URL
    UPDATE etoken.tbl_doctor
    SET 
        profile_picture_url = p_profile_picture_url,
        modified_date = CURRENT_TIMESTAMP
    WHERE doctor_id = p_doctor_id;
    
    -- Confirm update
    RAISE NOTICE 'Profile picture updated for doctor ID %', p_doctor_id;
END;
$procedure$
;

-- DROP PROCEDURE etoken.sp_update_token(in int4, in varchar, in varchar, in bpchar, in varchar, out text);

CREATE OR REPLACE PROCEDURE etoken.sp_update_token(IN p_token_id integer, IN p_status character varying, IN p_fee_status character varying, IN p_emergency character, IN p_modified_by character varying, OUT message text)
 LANGUAGE plpgsql
AS $procedure$
BEGIN
    -- Check if token exists
    IF NOT EXISTS (SELECT 1 FROM etoken.tbl_token WHERE token_id = p_token_id) THEN
        message := 'Token ID ' || p_token_id || ' does not exist';
        RETURN;
    END IF;

    -- Validate status (allowed values: Waiting, In Progress, Completed, Cancelled, On Hold)
    IF p_status IS NOT NULL AND p_status NOT IN ('Waiting', 'In Progress', 'Completed', 'Cancelled', 'On Hold') THEN
        message := 'Invalid status: ' || p_status || '. Allowed values: Waiting, In Progress, Completed, Cancelled, On Hold';
        RETURN;
    END IF;

    -- Update token details
    UPDATE etoken.tbl_token
    SET 
        status = COALESCE(p_status, status),
        fee_status = COALESCE(p_fee_status, fee_status),
        emergency = COALESCE(p_emergency, emergency),
        modified_by = p_modified_by,
        modified_date = CURRENT_TIMESTAMP
    WHERE token_id = p_token_id;

    message := 'Token ID ' || p_token_id || ' updated successfully';
END;
$procedure$
;

-- DROP FUNCTION etoken.update_clinic_modified_timestamp();

CREATE OR REPLACE FUNCTION etoken.update_clinic_modified_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_date = NOW();
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION etoken.update_exception_modified_timestamp();

CREATE OR REPLACE FUNCTION etoken.update_exception_modified_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_date = NOW();
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION etoken.update_modified_date();

CREATE OR REPLACE FUNCTION etoken.update_modified_date()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_date = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION etoken.update_modified_timestamp();

CREATE OR REPLACE FUNCTION etoken.update_modified_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_date = NOW();
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION etoken.update_patient_modified_timestamp();

CREATE OR REPLACE FUNCTION etoken.update_patient_modified_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_date = NOW();
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION etoken.update_schedule_modified_timestamp();

CREATE OR REPLACE FUNCTION etoken.update_schedule_modified_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_date = NOW();
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION etoken.update_token_modified_timestamp();

CREATE OR REPLACE FUNCTION etoken.update_token_modified_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_date = NOW();
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION etoken.update_token_status_modified_timestamp();

CREATE OR REPLACE FUNCTION etoken.update_token_status_modified_timestamp()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.modified_date = NOW();
    RETURN NEW;
END;
$function$
;