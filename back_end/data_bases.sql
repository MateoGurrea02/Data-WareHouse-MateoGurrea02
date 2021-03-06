create database datawarehouse;

use datawarehouse;

create table regions(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null
);

create table profiles(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null
);
create table countries(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	region_id int not null,
	foreign key (region_id) references regions(id)
);
create table cities(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	country_id int not null,
	foreign key (country_id) references countries(id)
);
create table preferences(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null
);
create table contact_channels(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null
);

create table users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	surname varchar(255) not null,
	email varchar(255) not null,
	profile_id int not null,
	password varchar(255) not null,
	foreign key (profile_id) references profiles(id)
);
create table companies(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	direction varchar(255),
	phone varchar(19) not null,
	email varchar(255) not null,
	city_id int not null,
	foreign key (city_id) references cities(id)
);
create table contacts(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	name varchar(255) not null,
	surname varchar(255) not null,
	email varchar(255) not null,
	direction varchar(255),
	interest int not null default 0,
	company_id int not null,
	position_company varchar(255) not null,
	city_id int not null,
	foreign key (company_id) references companies(id),
	foreign key (city_id) references cities(id)
);



create table contact_channel_lines(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	contact_id int not null,
	contact_channel_id int not null,
	information varchar(255) not null,
	preference_id int not null,
	foreign key (preference_id) references preferences(id),
	foreign key (contact_id) references contacts(id),
	foreign key (contact_channel_id) references contact_channels(id)
);




insert into profiles values (null, "Admin");
insert into profiles values (null, "B??sico");

insert into	preferences values (null, "Sin preferencia");
insert into	preferences values (null, "Canal Favorito");
insert into	preferences values (null, "No molestar");

insert into contact_channels values(null,"WhatsApp");
insert into contact_channels values(null,"Twitter");
insert into contact_channels values(null,"Facebook");
insert into contact_channels values(null,"Telefono");

insert into regions values(null, "Sudam??rica");
insert into regions values(null, "Norteam??rica");
insert into countries values(null, "Argentina", 1);
insert into countries values(null, "Colombia", 1);
insert into countries values(null, "Chile", 1);
insert into countries values(null, "Uruguay", 1);
insert into countries values(null, "Mexico", 2);
insert into countries values(null, "Estados Unidos", 2);
insert into cities values(null, "C??rdoba", 1);
insert into cities values(null, "Buenos Aires", 1);
insert into cities values(null, "Bogt??", 2);
insert into cities values(null, "C??cuta", 2);
insert into cities values(null, "Medell??n", 2);
insert into cities values(null, "Atacama", 3);
insert into cities values(null, "Santiago", 3);
insert into cities values(null, "Valpara??so", 3);
insert into cities values(null, "Canelones", 4);
insert into cities values(null, "Maldonado", 4);
insert into cities values(null, "Montevideo", 4);
insert into cities values(null, "Ciudad de M??xico", 5);
insert into cities values(null, "Tijuana", 5);
insert into cities values(null, "Florida", 6);
insert into cities values(null, "Texas", 6);

insert into companies values(null, "company", "compa 213", "222333884", "company@gmail.com", 2);

insert into contacts values(null, "Prueba", "Probando", "Prueba@gmail.com", "prueba 556", 75, 1,"Developer", 1);

insert into contact_channel_lines values(null, 1, 1,"33854098900", 2);

insert into users values(null,"admin", "admin", "admin@gmail.com", 1, "123");
insert into users values(null,"basico", "basico", "basico@gmail.com", 2, "123");