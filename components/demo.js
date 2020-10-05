/** @jsx jsx */
import { jsx, Box, Text, Flex } from 'theme-ui'

const Demo = () => (
  <Box>
    <Box sx={{ mb: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Text
          sx={{
            fontWeight: 'bold',
            fontSize: 5,
            color: 'light-gray',
            fontFamily: 'sansSerif'
          }}
        >
          HOW IT WORKS
        </Text>
      </Box>

      <Text sx={{ fontSize: 4, color: 'light-gray', fontFamily: 'sansSerif' }}>
        1. If you get randomly selected or paired with someone who's also taking
        a walk, you'll both get a direct message that looks like this:
      </Text>
    </Box>
    <Box sx={{ mb: 4, p: 3, bg: 'white', borderRadius: '5px' }}>
      <Text sx={{ fontSize: 4, fontFamily: 'sansSerif' }}>
        Hey there Barack Obama! Vladimir Putin walks past you in the corridor
      </Text>
      <Flex sx={{ mt: 3, justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <OptionBox>
          <Text
            sx={{ fontFamily: 'sansSerif', fontSize: 3, fontWeight: 'bold' }}
          >
            Say hi
          </Text>
        </OptionBox>
        <OptionBox>
          <Text
            sx={{ fontFamily: 'sansSerif', fontSize: 3, fontWeight: 'bold' }}
          >
            Nod and smile
          </Text>
        </OptionBox>
        <OptionBox>
          <Text
            sx={{ fontFamily: 'sansSerif', fontSize: 3, fontWeight: 'bold' }}
          >
            Walk on by - busy busy
          </Text>
        </OptionBox>
      </Flex>
    </Box>
    <Text sx={{ fontSize: 4, color: 'light-gray', fontFamily: 'sansSerif' }}>
      2. If you both respond positively you'll get a DM and you can catch up
      about the creeping sense of despondency you feel about the future. Or
      potentially other topics.
    </Text>
  </Box>
)

export default Demo

const OptionBox = ({ children }) => (
  <Box
    as='button'
    sx={{
      bg: 'white',
      cursor: 'pointer',
      p: 2,
      border: '1px solid black',
      borderRadius: '5px'
    }}
  >
    {children}
  </Box>
)
