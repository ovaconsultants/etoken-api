


TRUNCATE TABLE etoken.tbl_token RESTART IDENTITY CASCADE;
TRUNCATE TABLE etoken.tbl_advertisement_payment_details RESTART IDENTITY CASCADE;
truncate table etoken.tbl_advertisements  RESTART IDENTITY CASCADE;
TRUNCATE TABLE etoken.tbl_doctor_clinic_schedule RESTART IDENTITY CASCADE;
TRUNCATE TABLE etoken.tbl_clinic RESTART IDENTITY CASCADE;
TRUNCATE TABLE etoken.tbl_doctor RESTART IDENTITY CASCADE;

select * from  etoken.tbl_account ;
select * from  etoken.tbl_token ;
select * from etoken.tbl_doctor_clinic_schedule;
select * from etoken.tbl_advertisement_payment_details;
select * from etoken.tbl_advertisements;
select * from etoken.tbl_clinic;
select * from etoken.tbl_doctor;
select * from etoken.tbl_patient;
select * from etoken.tbl_roles;
select * from etoken.tbl_specialization;
select * from etoken.tbl_token_status;