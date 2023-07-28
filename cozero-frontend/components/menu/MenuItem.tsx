import { Box, Text } from '@chakra-ui/react'

import { useLocation, useNavigate, useRoutes } from 'react-router';
import React from 'react';

interface Props {
    title: string;
    href: string
}

export default function MenuItem({ title, href }: Props) {
  const navigate = useNavigate()
  const router = useLocation()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <Box as='a' href={href} onClick={handleClick} color={router.pathname === href ? 'black.700' : 'gray.500'}>
      <Text fontWeight='bold'>
        {title}
      </Text>
    </Box>
  )
}