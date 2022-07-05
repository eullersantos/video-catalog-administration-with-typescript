FROM node:18.4.0-slim

USER node

WORKDIR /home/node/catalog-videos

CMD [ "sh", "-c", "npm i && tail -f /dev/null" ]