# URL-Shortener

## Getting started

Recommended node version: v14.16.1

#### With SQL installed

1. Clone the repository
2. Create a database in MySQL called `url_shortener_dev`
3. Run `npm i` to install dependencies
4. To run the project in development run `npm run start:dev`

#### With docker-compose for MySQL

1. Run the command `docker-compose up --build` and wait for image to install and container to run
2. Go to `localhost:8080`
3. Select MySQL as system

   Server: db

   Username: root

   Password: password

4. Using the interface create table `url_shortener_dev`
5. Follow instructions in previous section

## Usage

### POST /shorten

Example payload

```
{
   original_url: "https://raw.githubusercontent.com/adam-osu/mysql-adminer-docker-compose/main/docker-compose.yml"
}
```

Example response

```
{
    "shortenedUrl": "http://localhost:4000/earlAJoZXK"
}
```

### GET /:short_id

Example request:

http://localhost:4000/earlAJoZXK
