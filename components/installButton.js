/** @jsx jsx */
import { jsx, Flex, Image } from 'theme-ui'

const InstallButton = ({ url }) => (
  <Flex sx={{ justifyContent: 'flex-end' }}>
    <a href={url}>
      <Image
        alt='Add to Slack'
        src='https://platform.slack-edge.com/img/add_to_slack.png@2x.png'
        srcSet='https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x'
      />
    </a>
  </Flex>
)

export default InstallButton
