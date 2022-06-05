## 부모 이미지 지정
#FROM node:14
## 작업 디렉토리 생성
#WORKDIR /usr/src/app
## 의존성 설치
#COPY package*.json ./
#RUN yarn
## 소스 추가
#COPY . .
## 포트 매핑
#EXPOSE 8080
## 실행 명령
#CMD [ "node", "server.js" ]

# Dockerfile for node.js

FROM node:14.19.3

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN npm install -g nodemon
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh

EXPOSE 8080
