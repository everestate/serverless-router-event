const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');

class CloudWatchEvent extends BasePlugin {
  on(path, callback) {
    return this.appendRoute(path, callback);
  };

  static match(eventResourceToMatch) {
    return (event) => {
      if (event.resources[0].includes(eventResourceToMatch)) {
        return event;
      }
      return null;
    };
  }
}

module.exports = CloudWatchEvent;
