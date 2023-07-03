# npm run build
npx vite build --base=/
cp -r ./dist/* ../
git add --all
git commit -am deploy
git push
