#!/bin/bash

mkdir -p .cert

if ! command -v mkcert &> /dev/null; then
  echo "❌ mkcert not found. Please install it first:"
  echo "https://github.com/FiloSottile/mkcert"
  exit 1
fi

echo "✅ Installing local CA (if not already)"
mkcert -install

echo "🔐 Generating certificate for tg-mini-app.local"
mkcert -key-file .cert/localhost-key.pem -cert-file .cert/localhost.pem tg-mini-app.local

echo "✅ Certificate ready: .cert/localhost.pem"
