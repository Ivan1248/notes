---
title: Forbidden characters in file names as Obsidian titles
---
If a title should contain a colon character (:), it cannot be a filename of a markdown file.

The convention here is to replace ":" with ";;" in the filename and add the correct title as a property in YAML to the beginning of the file:
```
---
title: "Title with colon: cannot be a filename"
---
```

## Potential notes with forbidden filename characters in titles that have no title property

```dataview
LIST
WHERE contains(file.name, ";;") and title = NULL
```
