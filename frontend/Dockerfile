FROM node:18-alpine as build

# Set env variable
ARG REACT_APP_DEBUG
ENV REACT_APP_DEBUG=$REACT_APP_DEBUG

# that will be empty
RUN echo "DEBUG": $REACT_APP_DEBUG

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]