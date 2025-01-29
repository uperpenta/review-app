FROM node:22
WORKDIR /home/node/api
COPY api /home/node/api
RUN npm install
CMD npm run start