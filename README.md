# dcuba-jam-01
https://itch.io/jam/dcuba-jam-01

```sh
source ~/.nvm/nvm.sh
npm ci
npm run dev
```

## Exporting for itch.io

> https://itch.io/docs/creators/html5

To generate a ZIP package ready for upload to itch.io:

```sh
npm run build:itch
```

This will create `itch-upload.zip` in the project root containing the built application with relative asset paths.