#!/bin/sh

cd ../
mkdir -p output
cp -R ./lpick-frontend/* ./output
cp -R ./output ./lpick-frontend/
