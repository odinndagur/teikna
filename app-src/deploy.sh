# npm run build
npx vite build --base=/teikna/ --mode=production
cp -r ./dist/* ../
git add --all
git commit -am deploy
git push
