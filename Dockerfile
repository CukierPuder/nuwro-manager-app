### Stage 1: build ###

FROM node:11.4.0-alpine as builder

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY nuwro-manager-app/package.json nuwro-manager-app/package-lock.json /app/nuwro-manager-app/

# Install app dependencies.
RUN npm install --prefix nuwro-manager-app

# Copy app files.
COPY . /app

# Build app
RUN npm run build --configuration="production" --prefix nuwro-manager-app -- --output-path=./dist/out


### Stage 2: delivery ###

FROM nginx:1.15.7-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=builder /app/nuwro-manager-app/dist/out /usr/share/nginx/html

# Copy nginx configuration file.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
