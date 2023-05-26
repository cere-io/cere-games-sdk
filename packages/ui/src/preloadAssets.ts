import { Context } from './createContext';

const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.onerror = img.onabort = function () {
      reject(src);
    };

    img.src = src;
  });
};

export const preloadAssets = async ({ config }: Context) => {
  const { staticAssets } = config;

  await Promise.allSettled(Object.values(staticAssets).map(preloadImage));
};
