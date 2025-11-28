COMPOSE=docker compose
API_CONTAINER=lf-mailer
PROJECT_NAME=lf_mailer
BAKE=COMPOSE_BAKE=true # Use once with 'up' command
DEV_FILE=docker-compose.dev.yml

# Production
up:
	$(BAKE) $(COMPOSE) -p $(PROJECT_NAME) up -d

stop:
	$(COMPOSE) -p $(PROJECT_NAME) stop

start:
	$(COMPOSE) -p $(PROJECT_NAME) start

down:
	$(COMPOSE) -p $(PROJECT_NAME) down

rmi:
	$(COMPOSE) -p $(PROJECT_NAME) down --rmi local

logs-api:
	docker logs $(API_CONTAINER)

sh:
	docker exec -it $(API_CONTAINER) sh

# Development
up-dev:
	$(COMPOSE) -f $(DEV_FILE) -p $(PROJECT_NAME) up -d

stop-dev:
	$(COMPOSE) -f $(DEV_FILE) -p $(PROJECT_NAME) stop

rmi-dev:
	$(COMPOSE) -f $(DEV_FILE) -p $(PROJECT_NAME) down --rmi local