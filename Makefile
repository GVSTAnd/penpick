
include .env

APP_NAME := penpick


create_env_file: 
	@if [ ! -f .env ]; then cp -n .env.example .env; fi 

build-image: create_env_file
	docker build --tag ${APP_NAME} . 


