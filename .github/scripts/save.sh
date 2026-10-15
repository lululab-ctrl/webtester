#!/usr/bin/env bash
# Commit whatever changed in the given paths and push, retrying if another run pushed first.
set -euo pipefail
msg="$1"; shift
git config user.name "site-qa[bot]"
git config user.email "site-qa-bot@users.noreply.github.com"
git add -A -- "$@"
if git diff --cached --quiet; then echo "Nothing to save."; exit 0; fi
git commit -q -m "$msg"
for i in 1 2 3 4 5; do
  if git push -q; then echo "Saved."; exit 0; fi
  git pull -q --rebase || { git rebase --abort || true; sleep 3; }
done
echo "::warning::Couldn't save the results to the repository (they're still attached to this run)."
