# OS X

## react - build

cd client && npm install
echo password | sudo -S rm -rf ./build/_ && npm run build
cd ../server && echo password | sudo -S rm -rf ./public/_
cd ..
cp -a ./client/build/. server/public

## express 실행

cd server && npm install
SET DEBUG=server:\* & npm start

# window

## react - build

cd client && npm install
rmdir /s /q build && npm run build
cd ../server && rmdir /s /q public
cd ..
cp -a ./client/build/. server/public

## express 실행

cd server && npm install
SET DEBUG=server:\* & npm start
