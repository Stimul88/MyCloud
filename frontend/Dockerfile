#FROM ubuntu:latest
#LABEL authors="StimUL"
#
#ENTRYPOINT ["top", "-b"]

FROM node:18-alpine as build
WORKDIR /usr/src
#RUN npm install
#ADD ./public ./public
#ADD ./src ./src


COPY ./ ./
RUN npm install
CMD ["npm", "start"]