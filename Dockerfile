# Use the official Node.js image as a base
FROM node:22.5-alpine as builder

# Accept build arguments
ARG REACT_APP_API_BASE_URL


# Set environment variables
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./

# Configure npm authentication for GitHub Packages
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_PAT}" > ~/.npmrc

RUN npm install

# Copy the rest of the application code
COPY . .

#kclee
RUN npm run build

## Expose the port the app runs on
#EXPOSE 3000
#
## Start the React app
#CMD ["npm", "start"]

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]