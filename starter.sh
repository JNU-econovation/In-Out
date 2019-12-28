# react - build
cd client && npm install
rm -rf ./build/* && npm run build
cd ../server && rm -rf ./public/*
cd ..
cp -a ./client/build/. server/public

# express 실행
cd server && npm install
SET DEBUG=server:* & npm start
