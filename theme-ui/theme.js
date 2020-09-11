const Heading = {
  fontWeight: 'bold',
  fontFamily: 'sansSerif',
  my: 0
}

const theme = {
  breakpoints: ['32em', '48em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [8, 12, 16, 20, 24, 36, 48, 80, 96],
  fontWeights: { bold: 700 },
  borderWidths: [0, 1, 2, 4, 8, 16, 32],
  radii: [0, 2, 4, 16, 9999, '100%'],
  fonts: {
    serif: 'athelas, georgia, times, serif',
    sansSerif:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  },
  boxShadows: [
    ` -5px 5px 0px 0px rgba(0,0,0,0.1)`,
    `0 0 2px 0 rgba(0,0,0,.08),0 2px 8px 0 rgba(0,0,0,.16)`,
    `0 0 2px 0 rgba(0,0,0,.08),0 4px 16px 0 rgba(0,0,0,.16)`,
    `0 0 2px 0 rgba(0,0,0,.08),0 8px 32px 0 rgba(0,0,0,.16)`
  ],
  duration: {
    fast: `150ms`,
    normal: `300ms`,
    slow: `450ms`,
    slowest: `600ms`
  },
  timingFunctions: {
    easeInOut: 'cubic-bezier(0.5, 0, 0.25, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.25, 1)',
    easeIn: 'cubic-bezier(0.5, 0, 1, 1)'
  },
  transitionDelays: {
    small: `60ms`,
    medium: `160ms`,
    large: `260ms`,
    xLarge: `360ms`
  },
  colors: {
    'g-pink': '#F0DBBC',
    'g-red': '#FF6A56',
    katie: 'papayawhip',
    black: '#000',
    'near-black': '#111',
    'dark-gray': '#333',
    'mid-gray': '#555',
    gray: ' #777',
    silver: '#999',
    'light-silver': '#aaa',
    'moon-gray': '#ccc',
    'light-gray': '#eee',
    'near-white': '#f4f4f4',
    white: '#fff',
    transparent: 'transparent',
    'black-90': 'rgba(0,0,0,.9)',
    'black-80': 'rgba(0,0,0,.8)',
    'black-70': 'rgba(0,0,0,.7)',
    'black-60': 'rgba(0,0,0,.6)',
    'black-50': 'rgba(0,0,0,.5)',
    'black-40': 'rgba(0,0,0,.4)',
    'black-30': 'rgba(0,0,0,.3)',
    'black-20': 'rgba(0,0,0,.2)',
    'black-10': 'rgba(0,0,0,.1)',
    'black-05': 'rgba(0,0,0,.05)',
    'black-025': 'rgba(0,0,0,.025)',
    'black-0125': 'rgba(0,0,0,.0125)',
    'white-90': 'rgba(255,255,255,.9)',
    'white-80': 'rgba(255,255,255,.8)',
    'white-70': 'rgba(255,255,255,.7)',
    'white-60': 'rgba(255,255,255,.6)',
    'white-50': 'rgba(255,255,255,.5)',
    'white-40': 'rgba(255,255,255,.4)',
    'white-30': 'rgba(255,255,255,.3)',
    'white-20': 'rgba(255,255,255,.2)',
    'white-10': 'rgba(255,255,255,.1)',
    'white-05': 'rgba(255,255,255,.05)',
    'white-025': 'rgba(255,255,255,.025)',
    'white-0125': 'rgba(255,255,255,.0125)',
    'dark-red': '#e7040f',
    red: '#ff4136',
    'light-red': '#ff725c',
    orange: '#ff6300',
    gold: '#ffb700',
    yellow: '#ffd700',
    'light-yellow': '#fbf1a9',
    purple: '#5e2ca5',
    'light-purple': '#a463f2',
    'dark-pink': '#d5008f',
    'hot-pink': ' #ff41b4',
    pink: '#ff80cc',
    'light-pink': '#ffa3d7',
    'dark-green': '#137752',
    green: '#19a974',
    'light-green': '#9eebcf',
    navy: '#001b44',
    'dark-blue': '#00449e',
    blue: '#357edd',
    'light-blue': '#96ccff',
    'lightest-blue': '#cdecff',
    'washed-blue': '#f6fffe',
    'washed-green': '#e8fdf5',
    'washed-yellow': '#fffceb',
    'washed-red': '#ffdfdf'
  },
  styles: {
    a: {
      color: 'black',
      cursor: 'pointer',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      },
      transition: 'all 0.3s'
    },
    div: {},
    p: {
      fontFamily: 'sansSerif',
      fontSize: 5,
      color: 'black'
    },
    h1: {
      ...Heading,
      fontSize: 6
    },
    h2: {
      ...Heading
    },
    h3: {
      ...Heading,
      fontSize: 6
    },
    code: {
      p: 2,
      bg: 'white',
      borderRadius: '10px',
      overflowX: 'auto',
      fontSize: 3
    }
  }
}

export default theme
