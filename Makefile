install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-frontend:
	npx webpack serve --config webpack.dev.config.cjs

install-deps:
	npm ci

refresh-deps:
	rm package-lock.json
	rm -rf node_modules
	npm install

build:
	npm run build

test:
	npm test -s

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

.PHONY: test
