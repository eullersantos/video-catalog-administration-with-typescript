FROM node:18.4.0-slim

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm i && tall -f /dev/null" ]