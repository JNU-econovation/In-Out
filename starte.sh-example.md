# react - build

cd client && npm install
echo password | sudo rm -rf ./build/_ && npm run build
cd ../server && echo password | sudo rm -rf ./public/_
cd ..
cp -a ./client/build/. server/public

# express 실행

cd server && npm install
SET DEBUG=server:\* & npm start
