import React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from '@emotion/styled'

const ScrollAnimation = ({ children, threshold = 0 }) => {
  const [ref, inView] = useInView({
    //rootMargin: '-50px',
    triggerOnce: true
  })

  return (
    <AnimatedBox inView={inView} ref={ref}>
      {children}
    </AnimatedBox>
  )
}

export default ScrollAnimation

const AnimatedBox = styled('div')`
  overflow: hidden;
  transform: translateY(${props => (props.inView ? '0px' : '100px')});
  opacity: ${props => (props.inView ? 1 : 0)};
  transition: all 0.75s ease-out;
`
