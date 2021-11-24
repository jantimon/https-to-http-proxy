#!/usr/bin/env node

'use strict';

const express = require("express");
const app = express();
const proxy = require("express-http-proxy");
const argv = require("yargs-parser")(
  process.argv.slice(2),
  {
    boolean: ['insecure'],
    number: ['port']
  },
  { default: { port: 3030, insecure: false } }
);

const target = argv._[0];
console.assert(target, "Please specify a target e.g. https-to-http-proxy https://google.com");
const port = argv.port;
const insecure = Boolean(argv.insecure);

app.listen(port, () => {
  console.log(`Forwarding ${target} to http://localhost:${port}${insecure?' ignoring ssl errors': ''}`);
});

app.use(
  "/",
  proxy(target, {
    https: true,
    proxyReqOptDecorator: function (proxyReqOpts, originalReq) {
      if (insecure) {
        proxyReqOpts.rejectUnauthorized = false;
      }
      return proxyReqOpts;
    },
  })
);
