import { FC } from 'react'
import logo from '~/assets/logo.svg'
import logoLight from '~/assets/logo-light.svg'
import Box, { BoxProps } from '@mui/material/Box'
import { ComponentEnum } from '~/types'
import HashLink from '~/components/hash-link/HashLink'
import { guestRoutes } from '~/router/constants/guestRoutes'

interface LogoProps extends BoxProps {
  light?: boolean
}

const Logo: FC<LogoProps> = ({ light = false, ...props }) => (
  <HashLink to={guestRoutes.welcome.path}>
    <Box
      alt='logo'
      component={ComponentEnum.Img}
      src={light ? logoLight : logo}
      {...props}
    />
  </HashLink>
)

export default Logo
