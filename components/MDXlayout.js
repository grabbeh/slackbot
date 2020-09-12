/** @jsx jsx */
import Layout from '../components/layout'
import { jsx, Box, Flex, BaseStyles } from 'theme-ui'
import Header from '../components/header'

const MDXLayout = ({ children }) => {
  return (
    <Layout>
      <Header />
      <BaseStyles>
        <Flex sx={{ justifyContent: 'center' }}>
          <Box sx={{ mt: 4, mx: 3, width: ['100%', '600px'] }}>{children}</Box>
        </Flex>
      </BaseStyles>
    </Layout>
  )
}

export default MDXLayout
