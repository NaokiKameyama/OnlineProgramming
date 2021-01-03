# HOW TO USE
# - ENVを設定する
#   - POSTGRES_USER
#   - POSTGRES_HOST
#   - POSTGRES_DB
#   - POSTGRES_PASSWORD

# FROM docker:stable-dinda
FROM docker:dind
WORKDIR /app
Add ./myapp .
# git   npmの依存関係解決のため
# bash  コンテナ内でBashシェルを起動するため    (only develop)
# vim   コンテナ内でVimを利用するため          (only develop)
# --no-cache = "--update add" + "rm -rf /var/cache/apk/*"
RUN apk add --no-cache npm git bash vim && \
    npm install --no-progress