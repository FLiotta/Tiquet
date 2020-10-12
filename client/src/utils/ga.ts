// Packages
import ReactGA, { EventArgs } from 'react-ga';
import Cookies from 'universal-cookie';

// Declarations
const cookies = new Cookies();

export const trackEvent = (event: EventArgs): void => {
  if (cookies.get('allowAnalytics')) {
    ReactGA.event(event);
  }
};

export const trackPageView = (pagePath: string): void => {
  if (cookies.get('allowAnalytics')) {
    ReactGA.pageview(pagePath);
  }
};