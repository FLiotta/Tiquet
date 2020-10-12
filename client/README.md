## Client

#### Config file

Create a config.ts file on the src folder.

```ts
interface IOAuth {
    ENABLED: boolean,
    CLIENT_ID: string,
    STRATEGY: string,
};

export const OAUTH_GITHUB: IOAuth = {
    ENABLED: true,
    CLIENT_ID: GITHUB OAUTH CLIENT ID,
    STRATEGY: "GITHUB",
};

export const API_URL: string = API BASE PATH
//example: "http://localhost:5000/api" or "https://example-domain.com/api"

export const GOOGLE_ANALYTICS_ID: string = GOOGLE ANALYTICS PROJECT ID;
```

#### Start server

```
../project_dir/client

$ npm start
```

#### Build

```
../project_dir/client

$ npm run bundle
```
