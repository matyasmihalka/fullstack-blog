# Use the specific Node.js version
FROM node:21.4.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json, yarn.lock file, and any other necessary configuration files like .yarnrc.yml
COPY package.json yarn.lock .yarnrc.yml ./
COPY packages/backend/prisma ./packages/backend/prisma/

# Copy Yarn packages directories if they exist
COPY .yarn ./.yarn
COPY packages/backend ./packages/backend
COPY packages/types ./packages/types

# Install dependencies using Yarn
RUN yarn install

# Map port 3001 to the outside world
EXPOSE 3001

# Define the command to run your app
CMD ["yarn", "start:backend"]
