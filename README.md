# express-authoparser
The Express.js Middleware that parses query, body, params and removes HTML tags in all string

# How's it work
From this:
```json
  {
    "a":"<script>console.log(\"bad code\");</script>",
    "b":"[1,2,3,4,5,6]",
    "c":"{\"a\":\"string property\", \"b\":\"[1,3,4,5, \"true\"]\""
  }
```

Mades this:
```json
  {
    "a":"console.log('bad code');",
    "b":[1,2,3,4,5,6],
    "c":{
      "a":"string property",
      "b":[1,2,3,4,5, true]
    }
  }
```

In `req.query`, `req.body` (if you use [body-parser](https://www.npmjs.com/package/body-parser)), `req.params`


# Usage
```js
  let express = require('express');
  let app = express();
  
  let authoparser = require('express-authoparser');
  app.use(authoparser);
```
