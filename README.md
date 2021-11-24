# https-to-http-proxy

Allows to access an insecure HTTPS page over http

## Usage:

```
npx https-to-http-proxy google.com
```

## Options:

### Port

Run the proxy on the given port default 3030

```
npx https-to-http-proxy --port 8080 google.com
```

### Insecure

Ignore invalid HTTPS SSL Certificate

```
npx https-to-http-proxy --insecure google.com
```
