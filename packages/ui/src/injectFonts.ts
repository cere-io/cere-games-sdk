import { Context } from './createContext';

export function injectFonts(context: Context) {
  const { sdkUrl } = context.config;

  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
    `${sdkUrl}/assets/fonts.css`,
  ];

  fontUrls.forEach((url) => {
    const font = document.createElement('link');
    font.href = url;
    font.rel = 'stylesheet';
    document.head.appendChild(font);
  });
}
