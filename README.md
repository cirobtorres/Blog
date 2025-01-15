<h1 style="font-size:3rem;font-weight:900;text-transform:uppercase;">Blog</h1>

<h2 style="font-size:2rem;text-transform:uppercase;">Next.js</h2>

```bash
npx create-next-app web
```

```bash
# Packages

npm i react-icons

npm i highlight.js # syntax highlight

npm i remark remark-html # markdown readers

npm i cheerio # library for parsing and manipulating HTML and XML

npx shadcn@latest init -d # -d for default
```

```bash
# Subcomponents of shadcn/ui

npm i next-themes # dark mode

npm i @radix-ui/react-accordion

npm i @radix-ui/react-tooltip # floating info baloon

npm i @radix-ui/react-slot # buttons
```

<h2 style="font-size:2rem;text-transform:uppercase;">Strapi</h2>

```bash
npx create-strapi@latest strapi
```

<p style="font-size:1.25rem;">HTTP request follows this URL format: https://<span style="color:#d6cc60;">&lt;YOUR_DOMAIN&gt;</span>/api/<span style="color:#d6cc60;">&lt;YOUR_CT&gt;</span> with the header: Authorization: bearer <span style="color:#d6cc60;">&lt;YOUR_API_TOKEN&gt;</span></p>

<p style="font-size:1.25rem;">Example:</p>

```bash
curl.exe -X GET http://127.0.0.1:1337/api/articles?populate=* -H "Authorization: Bearer <TOKEN>"

# or (PowerShell only)
$headers = @{ Authorization = "Bearer <TOKEN>" }; Invoke-WebRequest -Uri "http://127.0.0.1:1337/api/articles?populate=*" -Headers $headers -Method GET
```

<a href="https://docs.strapi.io/dev-docs/api/rest#api-parameters" style="font-size:1.25rem;color:#f1a355;">API reference</a>

<h2 style="font-size:2rem;text-transform:uppercase;">Starting project</h2>

<ol style="font-size:1.25rem;">
<li>Rename strapi\<span style="color:#d6cc60;">.env.example</span> to <span style="color:#d6cc60;">.env</span>;</li>
<li>Set local variables for Strapi;</li>
<ul>
<li>Keep Server variables untouched since you probably won't run it anyware else except locally.</li>
<li><span style="color:crimson;">VERY IMPORTANT!</span> For secret keys, see <a href="#strapi-secret-keys" style="color:#f1a355;">Strapi Secret Keys</a> below;</li>
<li>This project make use of Postgres. Set up a database and pass these informations to Strapi: <span style="color:#d6cc60;">DATABASE_NAME</span>, <span style="color:#d6cc60;">DATABASE_PASSWORD</span> and <span style="color:#d6cc60;">DATABASE_USERNAME</span> in case you're using a different one. For <span style="color:#d6cc60;">JWT_SECRET</span> I recommend the algorithms below (<a href="#strapi-secret-keys" style="color:#f1a355;">Strapi Secret Keys</a>). <span style="color:#d6cc60;">DATABASE_FILENAME</span> is an optional field.</li>
</ul>
<li>Run Strapi with <span style="color:#d6cc60;">npm run dev</span>. The first time you enter it, Strapi will request the creation of an user. By standard this user is created as a superadmin.</li>
<li>Inside the admin panel, navigate to settings. Create an <span style="color:#d6cc60;">API Token</span> and save it to <span style="color:#d6cc60;">NEXT_PUBLIC_STRAPI_TOKEN</span> onto your \web\<span style="color:#d6cc60;">.env.local.example</span>. This Token won't be revealed again. 
<ul><li>in case you rename NEXT_PUBLIC_STRAPI_TOKEN for whatever the reason, make sure it starts with NEXT_PUBLIC or Next.js will ignore it.</li></ul></li>
<li>Rename <span style="color:#d6cc60;">.env.local.example</span> to <span style="color:#d6cc60;">.env.local</span>;</li>
<li>Run Next.js with <span style="color:#d6cc60;">npm run dev</span>.</li>
</ol>

<h3 id="strapi-secret-keys" style="font-size:1.5rem;text-transform:uppercase;">Strapi Secret Keys</h3>

```bash
# Example terminal codes using node.js to follow a very similar format of base64 keys to that randomly created by strapi cli tool: npx create-strapi

# APP_KEYS
node -e "console.log(Array.from({ length: 4 }, () => require('crypto').randomBytes(22).toString('base64').slice(8)).join(','))"

# API_TOKEN_SALT, ADMIN_JWT_SECRET, TRANSFER_TOKEN_SALT and JWT_SECRET (run it four times!)
node -e "console.log(require('crypto').randomBytes(22).toString('base64').slice(8))"
```

<p style="font-size:1.25rem;">Example of how your strapi .env running locally should look: <span style="color:crimson;">DO NOT USE THESE VARIABLES!</span></p>

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
DATABASE_USERNAME=my_username # usually is postgres (the owner)
DATABASE_PASSWORD=my_password # that password when you install Postgres
DATABASE_SSL=false
DATABASE_FILENAME=
JWT_SECRET=wHNNPYWZWfB0eITclKarIw==
```

<h2 style="font-size:2rem;text-transform:uppercase;">Links</h2>

<ul style="font-size:1.25rem;">
<li><a style="color:#f1a355;" href="https://nextjs.org/">Next.js</a></li>
<li><a style="color:#f1a355;" href="https://strapi.io/">Strapi</a></li>
<li><a style="color:#f1a355;" href="https://ui.shadcn.com/docs/installation/next">Shadcn/ui</a></li>
<li><a style="color:#f1a355;" href="https://highlightjs.org/">Highlight.js</a></li>
<li><a style="color:#f1a355;" href="https://github.com/remarkjs/remark">Remark</a></li>
<li><a style="color:#f1a355;" href="https://cheerio.js.org/">Cheerio</a></li>
</ul>
