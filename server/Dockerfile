FROM keymetrics/pm2:6

WORKDIR /shorten
COPY src /shorten/src
COPY pm2.json package.json package-lock.json /shorten/

RUN npm install --production

EXPOSE 3001

CMD [ "pm2-docker", "start", "pm2.json" ]

# docker build -t shorten-server .