export type SdkOptions = {};
export type InitParams = {};

export class GamesSDK {
  constructor(private options: SdkOptions = {}) {}

  async init(params: InitParams = {}) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock implementation
  }
}
