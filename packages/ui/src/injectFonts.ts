export function injectFonts() {
  const fontUrls = [
    'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
  ];

  fontUrls.forEach((url) => {
    const font = document.createElement('link');
    font.href = url;
    font.rel = 'stylesheet';
    document.head.appendChild(font);
  });
}

export async function injectLocalFonts(fontUrl: string) {
    const font = new FontFace(
      'Yapari-SemiBold',
      `url(${fontUrl}/assets/Yapari-SemiBold.ttf)`
    )
    await font.load()
    document.fonts.add(font)
}
