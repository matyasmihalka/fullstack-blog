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
$ docker-compose up

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

## Next steps

- [ ] Implement Postgres DB with Prisma and add Articles model
- [ ] Add mutation to feature to Articles trough GraphGL
- [ ] Add user registration with Oauth 2 and Google
- [ ] Restrict the Articles mutation to logged in users
- [ ] Add for each user a custom domain where they can add their blog Articles
