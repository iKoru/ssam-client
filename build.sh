export NODE_ENV=production
mv public/attach ../
yarn build
mv ../attach public/
export NODE_ENV=development

