# be-blog-engine

# Containerization

In BE Dockerfile is set up in a way that it has to be built form to monorepo root. Why? In the monorepo there is a `types` package that introduces shared types between BE and FE. To include this package in the built Docker image, we have to provide the full monorepo context to the `build` command. In the Dockerfile then we copy the `backend` and the `types` packages only. This prevents using the `--immutable` flag on `yarn install` as the `lock.file` contains the dependencies for the FE also. However until now I see no issue with this. If you have other thoughts, let me know.

```
docker build -f packages/backend/Dockerfile . -t your-backend-service-tag
```

## Development

To run the backend in Docker:

```
docker-compose up --build
```

To run frontend, in a standalone terminal run the command below from root:

```
yarn start:frontend
```
