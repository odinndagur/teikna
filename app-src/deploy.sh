# npm run build
npx vite build
cp -r ./dist/* ../
git add --all
git commit -am deploy
git push
