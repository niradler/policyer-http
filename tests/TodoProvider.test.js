const TodoProvider = require("../.");

it("TodoProvider - evaluate example checks yml.", async () => {
  try {
    const checks = [TodoProvider.readCheck("checks/todoCheck.yml")];
    const provider = new TodoProvider();
    for (let i = 0; i < checks.length; i++) {
      const check = checks[i];
      const report = await provider.evaluate(check);
      const reportKeys = Object.keys(report);
      for (let i = 0; i < reportKeys.length; i++) {
        const checkId = reportKeys[i];
        expect(report[checkId].stepsResults.includes(false)).toBe(false);
      }
    }
  } catch (error) {
    expect(error).toBe(undefined);
  }
});
