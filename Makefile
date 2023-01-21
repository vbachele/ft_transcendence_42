# ENV_CONTENT := $(shell cat .env)

DIR_CHECK := $(shell grep POSTGRES_DIR .env > /dev/null; echo $$?)
# DIR_ENV_LINE := $(shell cut -f1 -d: $(grep -n POSTGRES_DIR .env))

all: 
ifeq ($(DIR_CHECK), 1)
	@read -p "Enter Postgres folder path: " POSTGRES_DIR; \
	sudo mkdir -p $$POSTGRES_DIR/postgres_vol; \
	echo "POSTGRES_DIR=$$POSTGRES_DIR/postgres_vol" >> .env
endif
	docker compose up --build -V

clean: 
ifeq ($(DIR_CHECK), 0)
	@sed -i "$$(grep -n POSTGRES_DIR .env | cut -f1 -d:)d" .env
	@echo POSTGRES_DIR var removed from .env
endif
	docker system prune -a 
	sudo rm -rf $${POSTGRES_DIR}

.PHONY: all clean