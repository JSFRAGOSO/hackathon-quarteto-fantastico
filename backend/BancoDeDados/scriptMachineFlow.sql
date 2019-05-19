-- Database: machineworkflow

-- DROP DATABASE machineworkflow;

CREATE DATABASE machineworkflow
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
    
    
    CREATE TABLE machine(
        idmachine int PRIMARY KEY NOT NULL,
        code VARCHAR,
        name varchar(30),
        manufactureYear date 
    ) 
    
    CREATE TABLE limits(
        idlimits int PRIMARY KEY NOT NULL,
        minimum numeric,
        maximum numeric,
        txtype varchar(25),
        measurementUnit varchar(15)
    )
    
    CREATE TABLE machine_limits (
    	idmachine int not null,
        CONSTRAINT fkmachine FOREIGN KEY (idmachine) REFERENCES machine (idmachine),
    	idlimit int not null,
        CONSTRAINT fklimit FOREIGN KEY (idlimit) REFERENCES limits (idlimits),
        actionplan varchar(300)
    )


    
    CREATE TABLE LOG (
        id int PRIMARY KEY NOT NULL,
        idmachine int not null,
        CONSTRAINT fkmachine FOREIGN KEY (idmachine) REFERENCES machine (idmachine),
        dhcreated TIMESTAMP,
        vibration numeric,
        vibrationmessege varchar,
        temperature int,
        temperaturemessege varchar,
        timecicle time,
        timeciclemessege varchar
    )
    
    ALTER TABLE machine ADD status varchar; 