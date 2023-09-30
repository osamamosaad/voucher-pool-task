# Target for building and then running the Docker Compose services.
setup:
	sh ./setup.sh

# Target for stopping and removing the Docker Compose services with its volumes.
down:
	@docker compose down

# Command to run migrations.
run-migration:
	@docker exec -it voucher-service npm run migration:run

run-tests:
	@docker exec -it voucher-service npm run test

