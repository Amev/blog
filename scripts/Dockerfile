FROM node

MAINTAINER Amev

RUN apt-get update && npm install -g babel gulp

WORKDIR /home/app

EXPOSE 81

CMD ["sh", "./scripts/run.sh"]
