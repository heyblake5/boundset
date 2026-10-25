export default function manifest() {
  return {
    name: 'Boundset',
    short_name: 'Boundset',
    start_url: '/',
    display: 'browser',
    background_color: '#0C0C0B',
    theme_color: '#0C0C0B',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
