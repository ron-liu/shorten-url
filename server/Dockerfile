FROM keymetrics/pm2

WORKDIR /shorten
COPY src /shorten/src
COPY package.json pm2.json yarn.lock /shorten/

RUN yarn build

EXPOSE 3001

CMD [ "pm2-docker", "start", "pm2.json" ]

# docker build -t shorten-server .