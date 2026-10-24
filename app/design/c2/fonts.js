import localFont from 'next/font/local'
// Newsreader (OFL) wght 400, opsz 24–72; Inter (OFL) wght 400–500. Built by fonts/README.
export const serif = localFont({ src: './fonts/newsreader-display.woff2', weight: '400', variable: '--serif', display: 'swap', adjustFontFallback: 'Times New Roman', declarations: [{ prop: 'font-variation-settings', value: 'normal' }] })
export const sans = localFont({ src: './fonts/inter-text.woff2', weight: '400 500', variable: '--sans', display: 'swap', adjustFontFallback: 'Arial' })
