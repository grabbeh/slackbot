/** @jsx jsx */
import Layout from '../components/layout'
import { jsx, Box, Flex, BaseStyles } from 'theme-ui'
import ScrollAnimation from '../components/animations/scrollAnimation'
import Header from '../components/header'
import { server } from '../config/server.js'
import InstallButton from '../components/installButton'
import Intro from '../components/intro.mdx'
import Demo from '../components/demo'

const Index = props => {
  return (
    <Layout>
      <Box className='gradient'>
        <Header />
        <BaseStyles>
          <ScrollAnimation>
            <Flex sx={{ justifyContent: 'center' }}>
              <Box sx={{ my: 4, mx: 3, width: 600 }}>
                <Intro />

                <InstallButton url={props.data} />
              </Box>
            </Flex>
            <Box sx={{ bg: 'dark-gray' }}>
              <Flex sx={{ justifyContent: 'center' }}>
                <Box sx={{ my: 4, mx: 3, width: 600 }}>
                  <Demo />
                </Box>
              </Flex>
            </Box>
          </ScrollAnimation>
        </BaseStyles>
      </Box>
    </Layout>
  )
}

export default Index

export async function getServerSideProps () {
  const data = await fetch(`${server}/install`).then(r => r.json())
  return { props: { data } }
}
