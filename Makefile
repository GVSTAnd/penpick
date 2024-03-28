APP_NAME := penpick
PORT := 5001

create_env_file: 
	@if [ ! 11dFghVXANMlKmJXsNCbNl-f .env ]; then cp -n .env.example .env; fi 

build-dev: create_env_file
	docker build --target dev -t ${spotify} . 

build: create_env_file
	docker build --target production -t ${APP_NAME} . 

dev:
	docker run --rm -v '$(shell pwd):/app' --name ${APP_NAME} -p ${PORT}:5000 ${APP_NAME}

test:
	docker run --rm -v $(shell pwd):/app ${APP_NAME} sh -c 'npm run test'