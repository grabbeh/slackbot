/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import theme from '../theme-ui/theme'

const Layout = props => {
  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width' />
        <title>Water fountain chat</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Box>{props.children}</Box>
      </ThemeProvider>
    </div>
  )
}

export default Layout
