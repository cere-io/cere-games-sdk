declare global {
  interface Window {
    Sentry: any;
  }
}

export type ReportingOptions = {
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

  constructor(private options: ReportingOptions = {}) {}

  async init() {
    if (!this.options.sentryPublicKey) {
      return;
    }

    try {
      this.sentry = await loadSentry(this.options.sentryPublicKey);
    } catch (error) {
      console.error('Problem in ErrorReporting initialization', error);
    }
  }

  error = (error: any) => {
    console.error(error);

    this.sentry?.captureException(error);
  };

  message = (message: string) => {
    console.log(message);

    this.sentry?.captureMessage(message);
  };
}
