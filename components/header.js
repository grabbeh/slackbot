/** @jsx jsx */
import { jsx, Text, Box } from 'theme-ui'
import Link from './link'

const Header = () => (
  <Box sx={{ p: 3 }} as='header'>
    <Link href='/'>
      <Text
        sx={{ fontFamily: 'sansSerif', cursor: 'pointer', fontWeight: 'bold' }}
      >
        🏠 WATERFOUNTAINCHAT
      </Text>
    </Link>
  </Box>
)

export default Header
