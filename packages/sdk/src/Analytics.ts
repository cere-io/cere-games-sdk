import TagManager, { TagManagerArgs } from 'react-gtm-module';

export { ANALYTICS_EVENTS } from './constants';
export type AnalyticsOptions = Pick<TagManagerArgs, 'gtmId'>;

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export class Analytics {
  async init({ gtmId }: AnalyticsOptions) {
    TagManager.initialize({ gtmId });
  }

  trackEvent(eventName: string, metaData?: any) {
    const dataLayer = window.dataLayer || [];

    dataLayer.push({ event: eventName, ...metaData });
  }
}
