/** @jsx jsx */
import { jsx } from 'theme-ui'
import Link from 'next/link'

const InternalLink = props => {
  return (
    <Link href={props.href}>
      <a sx={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}>
        {props.children}
      </a>
    </Link>
  )
}

export default InternalLink
