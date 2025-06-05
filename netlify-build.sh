#!/bin/bash
npm install --force --platform=linux --arch=x64 sharp
npm run build:icons
npm run build 