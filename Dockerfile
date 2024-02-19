# Use the specific Node.js version
FROM node:21.4.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json, yarn.lock file, and any other necessary configuration files like .yarnrc.yml
COPY package.json yarn.lock .yarnrc.yml ./

# Copy Yarn packages directories if they exist
COPY .yarn ./.yarn

# Install dependencies using Yarn
RUN yarn install --immutable

# Copy the rest of your application's source code
COPY . .

# Build your app (if necessary)
RUN yarn build

# Map port 3000 to the outside world
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "dist/main" ]
