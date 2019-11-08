ng build --prod --base-href https://donxd.github.io/frog-angular/
git checkout gh-pages
mv dist/frog-angular/* ./
rm -rf dist/
echo "done"