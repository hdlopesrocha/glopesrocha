#!/usr/bin/env bash
set -euo pipefail

# Rebuild the production site for the GitHub Pages project URL, then publish the
# compiled output to the gh-pages branch without committing dist/ to master.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

REMOTE_URL="$(git remote get-url origin 2>/dev/null || true)"
if [[ -z "$REMOTE_URL" ]]; then
  REMOTE_URL="git@github.com:hdlopesrocha/glopesrocha.git"
fi

GIT_NAME="$(git config user.name || echo 'Portfolio deploy')"
GIT_EMAIL="$(git config user.email || echo 'noreply@localhost')"

npm run build:pages

DEPLOY_DIR="$(mktemp -d "${TMPDIR:-/tmp}/glopesrocha-pages.XXXXXX")"
cleanup() {
  rm -rf "$DEPLOY_DIR"
}
trap cleanup EXIT

cp -a dist/. "$DEPLOY_DIR"/
cd "$DEPLOY_DIR"
git init -b gh-pages >/dev/null
git add -A
git -c user.name="$GIT_NAME" -c user.email="$GIT_EMAIL" commit -m "Deploy portfolio to GitHub Pages" >/dev/null
git remote add origin "$REMOTE_URL"
git push -f origin gh-pages

echo "Published gh-pages from $REMOTE_URL"
echo "Site: https://hdlopesrocha.github.io/glopesrocha/"
