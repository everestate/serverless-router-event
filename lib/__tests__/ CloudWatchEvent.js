const Router = require('@everestate/serverless-router');
const CloudWatchEvent = require('../CloudWatchEvent');

const subj = (router = new Router([CloudWatchEvent])) => {
  router.cloudwatchevent
    .on('my-schedule', (ctx, event) => ({ ctx, event }));
  router.mismatch(() => Promise.reject(new Error('Boom!')));
  return router;
};

describe('Event', () => {
  const event = {
    account: '123456789012',
    region: 'eu-central-1',
    detail: {},
    'detail-type': 'Scheduled Event',
    source: 'aws.events',
    time: '2019-03-01T01:23:45Z',
    id: 'cdc73f9d-aea9-11e3-9d5a-835b769c0d9c',
    resources: [
      'arn:aws:events:us-east-1:123456789012:rule/my-schedule',
    ],
  }

  const otherEvent = {
    account: '123456789012',
    region: 'eu-central-1',
    detail: {},
    'detail-type': 'Scheduled Event',
    source: 'aws.events',
    time: '2019-03-01T01:23:45Z',
    id: 'cdc73f9d-aea9-11e3-9d5a-835b769c0d9c',
    resources: [
      'arn:aws:events:us-east-1:123456789012:rule/another-schedule',
    ],
  }

  test('invokes matching callback #1', () =>
    expect(subj().dispatch(event)).resolves.toMatchObject({ ctx: event }));

  test('throws mismatch error', () =>
    expect(subj().dispatch(otherEvent)).rejects.toEqual(new Error('Boom!')));

  test('pluginName', () =>
    expect(CloudWatchEvent.pluginName).toEqual('cloudwatchevent'));
});
