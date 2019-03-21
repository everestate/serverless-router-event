const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');

class Event extends BasePlugin {
  on(path, callback) {
    return this.appendRoute(path, callback);
  }

  static match(eventPathToMatch) {
    const is = (a, b) => a === b || b === '*';
    const [emitter, subject, action, version] = eventPathToMatch.split(':');
    return (event) => {
      if (is(event.emitter, emitter)
       && is(event.subject, subject)
       && is(event.action, action)
       && is(event.version, version)) {
        return { path: eventPathToMatch };
      }
      return null;
    };
  }
}

module.exports = Event;
