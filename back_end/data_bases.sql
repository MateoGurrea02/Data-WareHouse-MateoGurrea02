create database datawarehouse

use datawarehouse

create table regions(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null
);
create table profile(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null
);
create table country(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	regions_id int not null,
	foreign key (regions_id) references regions(id)
);
create table cities(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	country_id int not null,
	foreign key (country_id) references country(id)
);
create table preferences(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null
);
create table contact_channel(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	information varchar(255),
	preference_id int not null,
	foreign key (preference_id) references preferences(id)
);
create table contacts(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	surname varchar(255) not null,
	email varchar(255) not null,
	position_company varchar(255) not null,
	country_id int not null,
	contact_channel_id int not null,
	foreign key (contact_channel_id) references contact_channel(id),
	foreign key (country_id) references country(id)
);
create table users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	surname varchar(255) not null,
	email varchar(255) not null,
	profile_id int not null,
	password varchar(255) not null,
	foreign key (profile_id) references profile(id)
);
create table companies(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	direction varchar(255),
	phone varchar(19) not null,
	country_id int not null,
	foreign key (country_id) references country(id)
);

insert into profile values (null, "Admin");
insert into profile values (null, "Básico");

insert into	preferences values (null, "Sin preferencia");
insert into	preferences values (null, "Canal Favorito");
insert into	preferences values (null, "No molestar");

insert into contact_channel values(null,"WhatsApp", null,1);
insert into contact_channel values(null,"Twitter", null, 1);
insert into contact_channel values(null,"Facebook", null, 1);
insert into contact_channel values(null,"Telefono", null, 1);

insert into regions values(null, "Sudamérica");
insert into regions values(null, "Norteamérica");
insert into country values(null, "Argentina", 1);
insert into country values(null, "Colombia", 1);
insert into country values(null, "Chile", 1);
insert into country values(null, "Uruguay", 1);
insert into country values(null, "Mexico", 2);
insert into country values(null, "Estados Unidos", 2);
insert into cities values(null, "Córdoba", 1);
insert into cities values(null, "Buenos Aires", 1);
insert into cities values(null, "Bogtá", 2);
insert into cities values(null, "Cúcuta", 2);
insert into cities values(null, "Medellín", 2);
insert into cities values(null, "Atacama", 3);
insert into cities values(null, "Santiago", 3);
insert into cities values(null, "Valparaíso", 3);
insert into cities values(null, "Canelones", 4);
insert into cities values(null, "Maldonado", 4);
insert into cities values(null, "Montevideo", 4);
insert into cities values(null, "Ciudad de México", 5);
insert into cities values(null, "Tijuana", 5);
insert into cities values(null, "Florida", 6);
insert into cities values(null, "Texas", 6);
