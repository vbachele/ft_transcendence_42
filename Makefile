# ENV_CONTENT := $(shell cat .env)
DIR_CHECK := $(shell grep POSTGRES_DIR .env; echo $$?)

all: 
ifeq ($(DIR_CHECK), 1)
	@read -p "Enter Postgres folder path: " POSTGRES_DIR; \
	sudo mkdir -p $$POSTGRES_DIR/postgres_vol; \
	echo "POSTGRES_DIR=$$POSTGRES_DIR/postgres_vol" >> .env
endif
	docker compose up --build -V

clean: 
	docker system prune -a 
	sudo rm -rf $${POSTGRES_DIR}
	sed -i "$(cat .env | grep -n POSTGRES_DIR | cut -f1 -d:)d" .env

.PHONY: all clean