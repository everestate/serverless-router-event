const Router = require('@everestate/serverless-router');
const Event = require('../Event');

const subj = (router = new Router([Event])) => {
  router.event
    .on('steam:listing:created:1', (ctx, event) => ({ ctx, event }))
    .on('steam:listing:updated:1', (ctx, event) => ({ ctx, event }))
    .on('steam:listing:*:1', (ctx, event) => ({ ctx, event }));
  router.mismatch(() => Promise.reject(new Error('Boom!')));
  return router;
};

describe('Event', () => {
  const emitter = 'steam';
  const subject = 'listing';
  const version = '1';

  test('invokes matching callback #1', () =>
    expect(subj().dispatch({ emitter, subject, action: 'created', version })) // eslint-disable-line object-curly-newline
      .resolves.toMatchObject({ ctx: { path: 'steam:listing:created:1' } }));

  test('invokes matching callback #2', () =>
    expect(subj().dispatch({ emitter, subject, action: 'updated', version })) // eslint-disable-line object-curly-newline
      .resolves.toMatchObject({ ctx: { path: 'steam:listing:updated:1' } }));

  test('invokes matching callback #3', () =>
    expect(subj().dispatch({ emitter, subject, action: 'deleted', version })) // eslint-disable-line object-curly-newline
      .resolves.toMatchObject({ ctx: { path: 'steam:listing:*:1' } }));

  test('invokes matching callback #4', () =>
    expect(subj().dispatch({ emitter, subject, action: 'deleted', version: '2' })) // eslint-disable-line object-curly-newline
      .rejects.toEqual(new Error('Boom!')));

  test('pluginName', () =>
    expect(Event.pluginName).toEqual('event'));
});
