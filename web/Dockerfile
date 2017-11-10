FROM keymetrics/pm2:6

RUN mkdir -p /shorten
WORKDIR /shorten

COPY static-server /shorten

EXPOSE 3000

CMD [ "pm2-docker", "start", "pm2.json" ]
