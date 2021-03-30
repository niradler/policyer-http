#!/usr/bin/env node
const { Cli } = require("policyer");
const Provider = require(".");

const cli = new Cli(Provider, { description: "Scan todo checks." });

const cliReport = ({ configuration, report }) => {
  if (configuration.description) console.log(configuration.description);
  for (const key in report) {
    if (Object.hasOwnProperty.call(report, key)) {
      const check = report[key];
      delete check.stepsResults;
      delete check.inspectedValues;
      check.status = check.hasError ? "Fail" : "success";
      check.severity = check.check.severity;
      check.check = check.check.name;
    }
  }
  console.table(report);
};

cli.run(cliReport);

module.exports = cli;
