export const specs: WebdriverIO.Config['specs'] = ['./**/*.e2e.ts'];
export const suites: WebdriverIO.Config['suites'] = {
  simulation: ['./NewUserFlow.e2e.ts'],
};
