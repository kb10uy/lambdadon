#!/bin/sh

rm -rf dist

echo "Building TypeScript sources..."
npx tsc -P ./tsconfig.json

echo "Installing dependencies..."
cp package.json dist
cd dist
npm install --only=production
zip -R "../dist.zip" "./**/*"
