import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Helvetica", 'Inter'],
      },
      colors: {
        "bg-primary": "#04152d",
        "bg-footer": "#020c1b",
      },
      padding: {
        'padding': '50px',
      },
      boxShadow: {
        'boxShadow': '0 0 0.625em rgb(63 131 248)',
      },
      flex: {
        '2': '0 0 calc(100% / 2)'
      },
      gridTemplateColumns: {
        '16': 'repeat(auto-fill, minmax(200px, 1fr))',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
export default config
