import TagManager, { TagManagerArgs } from 'react-gtm-module';

export { ANALYTICS_EVENTS } from './constants';
export type AnalyticsOptions = Pick<TagManagerArgs, 'gtmId'>;

declare global {
  interface Window {
    dataLayer: any[];
  }
}

const waitBodyReady = () =>
  new Promise<void>((resolve) =>
    document.body ? resolve() : window.addEventListener('DOMContentLoaded', () => resolve()),
  );

export class Analytics {
  async init({ gtmId }: AnalyticsOptions) {
    await waitBodyReady();

    TagManager.initialize({ gtmId });
  }

  trackEvent(eventName: string, metaData?: any) {
    const dataLayer = window.dataLayer || [];

    dataLayer.push({ event: eventName, ...metaData });
  }
}
