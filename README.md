# @everestate/serverless-router-event

> [Serverless Router](https://github.com/everestate/serverless-router) plugin to handle events at AWS λ

## Installation

```
npm install @everestate/serverless-router @everestate/serverless-router-event --save
```

## Usage

```javascript
const Router = require('@everestate/serverless-router');
const { Event } = require('@everestate/serverless-router-event');

function dispatch(event) {
  const router = new Router([Event]);

  router.event
    .on('steam:listing:created:1', (ctx, event) => ({ ctx, event }))
    .on('steam:listing:updated:1', (ctx, event) => ({ ctx, event }))
    .on('steam:listing:*:1', (ctx, event) => ({ ctx, event }));

  router.mismatch(() => Promise.reject(new Error('Boom!')));

  return router.dispatch(event);
}

function myLambdaHandler(event, context, callback) {
  return dispatch(event)
    .then(result => callback(null, result))
    .catch(error => callback(error));
}
```
