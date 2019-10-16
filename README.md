# yougioh-market


## Summary
ite
This is an application to monitor and track the prices of yugioh cards on ebay (uk).
The idea is to have a database of all current cards, data will be provided from
[ygoprodeck](https://db.ygoprodeck.com/api-guide/). They have an api with all cards and sets

In conjunction with Ebay developer API, the thought process is to make calls using card
set ids in order to search to find the lowest,average,highest price. This data will be stored
so that an analytics interface can be built. This will enable a better in depth analysis of the market
price for Yugioh cards

## Getting Started

The main tech stack that will be used for this project is Node, Lambda, SQL, ElasticSearch, Docker.
The application is wrapped within a docker container to allow all for a basic micorservice approach.
In order to get started run `docker-compose up` within the root of the directory.
This will spin up each service and exposing them to local ports.

The containers that will be set up are the following

| Container     | Port |
| ------------- | ---- |
| lambda        | 3100 |
| mysql         | 3309 |
| elasticsearch | 9200 |
| kibana        | 5601 |

## DB

Migrations make use of [knex](https://knexjs.org) migration files and are maintained within the `migrations` directory.

To create or run a migration, you can use the following helper scripts,

```bash
# Create a migration file
$ ./bin/create create-mytable

# Run the migrations
$ ./bin/migrate
```

N.B. The migration scripts are run during `docker-compose up`

## Endpoints

Currently only a status page in created just to ensure the app is up. and that can be found at

```js
GET localhost:3100/status
```
