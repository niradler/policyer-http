const fetch = require("node-fetch");
const { Provider } = require("policyer");

class TodoProvider extends Provider {
  constructor(name = "http-provider") {
    super(name);
  }

  async collect(configuration) {
    const options = {};
    if (configuration.http) options.method = configuration.http;
    if (configuration.payload)
      options.body = JSON.stringify(configuration.payload);
    if (configuration.headers) options.headers = configuration.headers;

    const data = await fetch(configuration.url, options);

    return data.json();
  }

  async evaluate({ configuration, checks }) {
    console.log(process.env);
    const data = await this.collect(configuration);
    const report = this.evaluateChecks(data, checks);

    return report;
  }
}

module.exports = TodoProvider;
