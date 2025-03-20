FROM postgres:17-alpine

RUN apk add --no-cache dcron

RUN ln -sf /usr/share/zoneinfo/Asia/Kuala_Lumpur /etc/localtime && \
    echo "Asia/Kuala_Lumpur" > /etc/timezone

WORKDIR /app

COPY . .

RUN chmod +x ./scripts/docker-entrypoint.sh

# backups
RUN chmod +x ./scripts/backup.sh
RUN chmod +x ./scripts/backup_clear.sh

CMD ["sh", "./scripts/docker-entrypoint.sh"]
