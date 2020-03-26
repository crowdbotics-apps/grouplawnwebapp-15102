FROM node:10

ENV NODE_VERSION 13.7.0
RUN apt update

ADD ./ /app/webapp/
WORKDIR /app/webapp/
RUN npm install && cd react/ && npm install && npm install --only=dev --no-shrinkwrap && npm run build
CMD ["npm", "start"]
