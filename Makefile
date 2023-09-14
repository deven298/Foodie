
prettier:
	black .
	black backend/
	cd foodie && yarn format:write

build_backend_migrations:
	black backend/
	cd backend && python manage.py makemigrations && python manage.py migrate

build_backend:
	black backend/
	cd backend && python manage.py runserver

run_foodie_local:
	@echo "Running Foodie locally"
	@cd foodie && react-native run-ios