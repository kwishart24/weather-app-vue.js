#/usr/bin/env sh
set -e

npm run build

cd dist

git init
git add -A
git commit -m 'New Deployment'
git push -f git@github.com:kwishart24/weather-app-vue.js.git main:gh-pages3

cd -
