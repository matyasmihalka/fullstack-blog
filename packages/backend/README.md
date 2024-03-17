## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start
$ docker-compose up -d

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Useful commands

```bash
# run migration when using docker compose
$ docker-compose exec nest-api npx prisma migrate dev

# rebuilding changed containers
$ docker-compose up --build

$ docker-compose up -d
```

## Repo ready to be used with Google Oauth2.0 on commit:

1dfd7dea67874379a43c9598b93706004517bcc8
