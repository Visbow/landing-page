/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      unstable_serializeCssVarsMode: true,
      unstable_parseCSSVarsMode: true,
    },
  },
}

export default config