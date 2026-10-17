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
  # Another run saved first. Keep both: our files win where the same lines changed, then the
  # website list (SITES.md) is rebuilt from every site's reports so no one's latest result is lost.
  if git pull -q --rebase -X theirs; then
    if [ -f qa/site.mjs ]; then node qa/site.mjs index >/dev/null && git add -A -- SITES.md && { git diff --cached --quiet || git commit -q --amend --no-edit; }; fi
  else
    git rebase --abort || true
  fi
  sleep $((RANDOM % 5 + 1))
done
echo "::error::Couldn't save the results to the repository (they're still attached to this run)."
exit 1
