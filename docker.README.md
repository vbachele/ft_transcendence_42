Beforehand, you need an env file for the docker to work.
Create a .env file at the same level as the docker-compose file, containing the following information :

SERVER_PORT=YOUR_BACKEND_PORT</br>
FRONTEND_PORT=YOUR_FRONTEND_PORT

POSTGRES_USER=DATABASE_USER</br>
POSTGRES_PASSWORD=DATABASE_PASSWORD</br>
POSTGRES_DB=DATABASE_NAME

To launch the website, use <make>.
On the first launch, you'll be asked to enter the Postgres volume location.
Postgres directory is created at the specified location, and the <POSTGRES_DIR> variable is added to the .env file.

Newly installed npm packages need a docker reboot for the local changes to be reflected in the container. Just kill the running docker instance using CTRL^C, then <make> to start the docker.

Change on rebuild is activated on both the frontend and backend side, your local code will be compiled and run by docker.

To completely clean the docker containers, please use <make clean>. Postgres volume will be deleted as well as the POSTGRES_DIR variable located in the .env
