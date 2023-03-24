import { SDK_VERSION } from './constants';

declare global {
  interface Window {
    Sentry: any;
  }
}

export type ReportingOptions = {
  env: string;
  sentryPublicKey?: string;
};

const loadSentry = (publicKey: string) => {
  const script = document.createElement('script');

  script.src = `https://js.sentry-cdn.com/${publicKey}.min.js`;
  document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => resolve(window.Sentry);
    script.onerror = reject;
  });
};

export class Reporting {
  private sentry?: any;
  private setReady = () => {};
  private isReady = new Promise<void>((resolve) => {
    this.setReady = resolve;
  });

  constructor(private options: ReportingOptions) {}

  async init() {
    if (!this.options.sentryPublicKey) {
      return;
    }

    try {
      this.sentry = await loadSentry(this.options.sentryPublicKey);

      this.sentry.init({
        release: `cere-games-sdk@${SDK_VERSION}`,
        environment: this.options.env,
      });

      this.setReady();
    } catch (error) {
      console.error('Problem in ErrorReporting initialization', error);
    }
  }

  error = async (error: any) => {
    console.error(error);

    await this.isReady;
    this.sentry?.captureException(error);
  };

  message = async (message: string) => {
    console.log(message);

    await this.isReady;
    this.sentry?.captureMessage(message);
  };
}
