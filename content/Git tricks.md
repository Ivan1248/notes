---
tags:
  - todo/finish
creation date: 2025-09-21
---
In every commit, in every file, remove all carriage return (`\r`) characters:
```git filter-repo --force --replace-text <(echo "regex:\r==")```