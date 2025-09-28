up:
	docker compose -f platform/docker/compose.dev.yml up -d

down:
	docker compose -f platform/docker/compose.dev.yml down -v

restart:
	docker compose -f platform/docker/compose.dev.yml down
	docker compose -f platform/docker/compose.dev.yml up -d

ps:
	docker compose -f platform/docker/compose.dev.yml ps

web:
	cd apps/web && pnpm dev

api:
	cd apps/api && uv run python manage.py runserver 0.0.0.0:8000

worker:
	cd apps/api && uv run celery -A core.celery worker -l INFO

beat:
	cd apps/api && uv run celery -A core.celery beat -l INFO
