# @everestate/serverless-router-event

> [Serverless Router](https://github.com/everestate/serverless-router) plugin to handle events at AWS λ

## Installation

```
npm install @everestate/serverless-router @everestate/serverless-router-event --save
```

## Usage

Each routing subject (event object) is expected to to include at least:
  * `emitter` (string) - who published event
  * `subject` (string) - what's the domain of event
  * `action` (string) - what's happen in scope of the domain
  * `version` (string) - event payload version

The routing path looks like `"emitter:subject:action:version"`.

It's fine to use mask to match any part: `"emitter:subject:*:version"`.

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
