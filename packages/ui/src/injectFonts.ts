type Font = {
  name: string;
  src: string
}

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


export function injectLocalFonts(fonts: Font[]) {
  return fonts.map( async ({ src, name }: Font) => {
    const font = new FontFace(`${name}`, `url(${src})`)
    await font.load()
    document.fonts.add(font)
  })
}
