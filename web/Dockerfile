FROM keymetrics/pm2

RUN mkdir -p /shorten
WORKDIR /shorten

COPY . /shorten

RUN yarn build

EXPOSE 3000

CMD [ "pm2-docker", "start", "pm2.json" ]
