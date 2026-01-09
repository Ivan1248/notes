```CSS
:root {
    /* https://bitsofco.de/the-new-system-font-stack/ */
    --font-family: ui-sans-serif, -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-monospace: "Consolas", "Fira Code", "Source Code Pro", "Roboto Mono", monospace;
    --background-color: #ffffff;
    --background-color-2: #f0f4f8;
    --wide-border-color: #e0e4e8;
    --thin-border-color: #d0d4d8;
}

body {
    background-color: var(--background-color);
    max-width: 45rem;
    margin: 0 auto;
    padding: 1rem 1rem;
    font-family: var(--font-family);
    line-height: 1.3;
}

blockquote {
    border-left: 0.2rem solid var(--wide-border-color);
    padding-left: 0.5rem;
    margin-left: 0rem;
}

code,
kbd,
pre {
    font-family: var(--font-monospace);
    font-size: 90%;
    border-radius: 0.2em;
    background-color: var(--background-color-2);
}

code,
kbd {
    padding: 0rem 0.1rem;
}

code .keyword {
    color: #038;
}

code .function {
    color: #830;
}

code .class-name {
    color: #088;
}

code .number,
code .string {
    color: #680;
}

pre {
    padding: 0.5rem 0.5rem;
}

pre code,
pre kbd {
    /*If padding-left is not 0, the first line is wrongly indented.*/
    padding: 0;
}

table, td, th {
    border: 0.05rem solid var(--thin-border-color);
    border-collapse: collapse;
    padding: 0.2rem;
}

/* callout */
/*.callout code,
.callout kbd,
.callout pre {
background-color: var(--background-color);
}*/
.callout-icon {
    flex: 0 0 auto;
    display: flex;
    align-self: center;
}

svg.svg-icon {
    height: 1em;
    width: 1em;
}

.callout {
    border: 0.15rem solid var(--wide-border-color);
    /*background-color: var(--border-color);*/
    margin: 1rem 0;
}

.callout-title {
    padding: 0.5rem 0.5rem 0 0.5rem;
    display: flex;
    gap: 0.5rem;
    font-weight: bold;
}

.callout-content {
    overflow-x: auto;
    padding: 0 0.5rem;
}

/* callout as table */
.callout-table,
.callout-table tr,
.callout-table p,
.source-table {
    width: 100%;
    padding: 0;
    border: none;
}

.callout-table td {
    width: 100%;
    padding: 0.5rem 0.5rem;
}

```

```HTML
<!DOCTYPE html><html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Title</title>
  <style type="text/css">

  </style>
</head>
<body>
</body>
</html>
```
