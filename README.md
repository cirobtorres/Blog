<h1 style="font-size:3rem;font-weight:900;text-transform:uppercase;">Blog</h1>

<h2 style="font-size:2rem;text-transform:uppercase;">Next.js</h2>

```bash
npx create-next-app web
```

```bash
# Packages

npm i react-icons

npm i lucide-react

npm i next-themes

# syntax highlight
npm i highlight.js

# markdown readers
npm i remark remark-html

# library for parsing and manipulating HTML and XML
npm i cheerio

npm i clipboardy

# tiptap
npm i @tiptap/react

# tiptap dependencies
npm i @tiptap/pm # prosemirror
npm i @tiptap/extension-text @tiptap/extension-document @tiptap/extension-paragraph @tiptap/extension-placeholder
npm i @tiptap/extension-character-count
npm i highlight.js lowlight @tiptap/extension-code-block-lowlight

npm i he

npm i shiki

npm i dompurify

npm i --save-dev @types/shiki

npm i sanitize-html

npm i --save-dev @types/sanitize-html

npm i graphql-request

npm i use-debounce # to delay the query requests sent to the server from the search bar

npm i --save-dev jest jest-axe jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node # testing
npm i --save-dev @types/jest @types/jest-axe # for typescripts

npm i @faker-js/faker --save-dev

npx shadcn@latest init -d # -d for default
```

```bash
# Subcomponents of shadcn/ui

npm i next-themes # dark mode

npm i @radix-ui/react-accordion

npm i @radix-ui/react-dialog

npm i @radix-ui/react-navigation-menu

npm i @radix-ui/react-popover

npm i @radix-ui/react-select

npm i @radix-ui/react-slot # buttons

npm i @radix-ui/react-toast

npm i @radix-ui/react-tooltip
```

<h2 style="font-size:2rem;text-transform:uppercase;">Strapi</h2>

```bash
npx create-strapi@latest strapi
```

<h2 style="font-size:2rem;text-transform:uppercase;">Starting project</h2>

<ol style="font-size:1.25rem;">
<li>Rename strapi\<span style="color:#f1a355;">.env.example</span> to <span style="color:#f1a355;">.env</span> and set local variables (Check out <a href="#strapi-secret-keys" style="text-decoration:underline">Strapi Secret Keys</a>):</li>
<ul>
<li><span style="color:#d6cc60;">APP_KEYS</span></li>
<li><span style="color:#d6cc60;">API_TOKEN_SALT</span></li>
<li><span style="color:#d6cc60;">ADMIN_JWT_SECRET</span></li>
<li><span style="color:#d6cc60;">TRANSFER_TOKEN_SALT</span></li>
<li><span style="color:#d6cc60;">JWT_SECRET</span></li>
</ul>
<li>Set up a Postgres database: <span style="color:#d6cc60;">DATABASE_NAME</span>, <span style="color:#d6cc60;">DATABASE_PASSWORD</span> and <span style="color:#d6cc60;">DATABASE_USERNAME</span>;</li>
<ul><li><span style="color:#d6cc60;">DATABASE_FILENAME</span> is optional;</li></ul>
<li>Run Strapi with:</li>

```bash
npm i;
npm run dev;
```

<li>The first time you access Strapi admin panel, it requests super admin creation.</li>
<li><span style="color:crimson">IMPORTANT</span>: navigate to <span style="color:#f1a355;">Globals</span> and define your <span style="color:#f1a355;">siteName</span>.</li>
<li>Inside the admin panel: navigate to <span style="color:#f1a355;">Settings</span> > <span style="color:#f1a355;">Tokens</span>. Create an <span style="color:#f1a355;">API Token</span> and save it to <span style="color:#d6cc60;">NEXT_PUBLIC_BACKEND_READ_ARTICLE_TOKEN</span> onto your \web\<span style="color:#f1a355;">.env.local.example</span> (frontend, the next.js side).</li>
<ul><li>in case you rename <span style="color:#d6cc60;">NEXT_PUBLIC_BACKEND_READ_ARTICLE_TOKEN</span> for whatever the reason, make sure it starts with <span style="color:#d6cc60;">NEXT_PUBLIC</span> or Next.js is going to ignore it.</li></ul></li>
<li>Rename <span style="color:#f1a355;">.env.local.example</span> to <span style="color:#f1a355;">.env.local</span>;</li>
<li>Run Next.js:</li>

```bash
npm i;
npm run dev;
```

</ol>

<h3 id="strapi-secret-keys" style="font-size:1.5rem;">Strapi Secret Keys</h3>

```bash
# Example terminal codes using node.js to follow a very similar pattern of
# base64 keys to that randomly created by strapi cli tool start up (npx create-strapi)

# APP_KEYS
node -e "console.log(Array.from({ length: 4 }, () => require('crypto').randomBytes(22).toString('base64').slice(8)).join(','))"

# API_TOKEN_SALT | ADMIN_JWT_SECRET | TRANSFER_TOKEN_SALT | JWT_SECRET
# Run it four times (one key each)
node -e "console.log(require('crypto').randomBytes(22).toString('base64').slice(8))"
```

<p style="font-size:1.25rem;">Example of how your strapi .env should look like:</p>

```bash
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=caYemHBbX3dpDp6gSs+fdA==,guiglzCv+CITEpzPLKp74Q==,/1Io0H4fnI8tZ056mk4VRA==,fRzpkD15uNOZDhit/gT5lg==
API_TOKEN_SALT=4PxtlAwvw9S9lKO+V4eyOw==
ADMIN_JWT_SECRET=JBoVXugTExVnPx02xvlOMA==
TRANSFER_TOKEN_SALT=QQ4OSyWIz/O1xxy6YCprlg==

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1 # localhost
DATABASE_PORT=5432
DATABASE_NAME=my_blog_db_name
DATABASE_USERNAME=my_username # usually postgres (owner)
DATABASE_PASSWORD=my_password # that password when you install Postgres
DATABASE_SSL=false
DATABASE_FILENAME=
JWT_SECRET=wHNNPYWZWfB0eITclKarIw==
```

<p style="font-size:1.25rem;">SQlite3 (optional)</p>

```bash
npm i better-sqlite3
```

<p style="font-size:1.25rem;">Then:</p>

```bash
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=caYemHBbX3dpDp6gSs+fdA==,guiglzCv+CITEpzPLKp74Q==,/1Io0H4fnI8tZ056mk4VRA==,fRzpkD15uNOZDhit/gT5lg==
API_TOKEN_SALT=4PxtlAwvw9S9lKO+V4eyOw==
ADMIN_JWT_SECRET=JBoVXugTExVnPx02xvlOMA==
TRANSFER_TOKEN_SALT=QQ4OSyWIz/O1xxy6YCprlg==

# Database (sqlite)
DATABASE_FILENAME=databaseName
JWT_SECRET=vwmaL8YcK72EXmajQnoQSA==
```

<p style="font-size:1.25rem;color:crimson;text-transform:uppercase">do not forget to comment Postgres variables!</p>
