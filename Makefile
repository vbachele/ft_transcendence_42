include ./.env

all:
ifneq ($(shell cat ./frontend/.env > /dev/null 2>&1; echo $$?), 0)
	echo VITE_PORT=${FRONTEND_PORT} >> ./frontend/.env
	echo VITE_SERVER_PORT=${SERVER_PORT} >> ./frontend/.env
endif
ifneq ($(shell cat ./backend/.env > /dev/null 2>&1; echo $$?), 0)
	echo DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}?schema=public" >> ./backend/.env
	echo PORT=${SERVER_PORT} >> ./backend/.env
endif
	docker compose up --build -V

clean:
	docker system prune -a
	docker volume prune
	rm -rf ./backend/.env
	rm -rf ./frontend/.env
	rm -rf ./backend/dist
	rm -rf ./backend/node_modules
	rm -rf ./frontend/node_modules

re: clean all

.PHONY: all clean re
