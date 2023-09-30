#!/bin/sh
#!/bin/sh
cd app/
# load .env variables
echo "\nLoad '.env'."
if [ -f .env ]
then
  export $(cat .env | xargs)
fi

cd -

echo "\nDocker Containers build start."
docker-compose build \
&& docker-compose up -d\

echo "\n\033[43m\033[1;30mWaiting for mysql connection...\033[0m"
echo "Note: this operation is to make sure that mysql is ready to can run the database migrations."
while ! docker exec db-voucher mysql --user=root --password=root -e "SELECT 1" >/dev/null 2>&1; do
    sleep 1
done
echo "\e[32mMySQL is ready.\033[0m"

echo "Docker Containers build completed.\n"

echo "\nMigration start."
docker exec -it voucher-service npm run migration:run
echo "Migration completed.\n"

echo "\n\n"
echo "\t\t\t\033[43m\033[1;30mApp Domain: \033[0m \033[1;33m http://localhost:$VOUCHER_SERVICE_PORT \033[0m"
echo "\n\n"