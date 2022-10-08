import { FC, PropsWithChildren, useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'

const ThemeProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const { setColorMode } = useColorMode()
	useEffect(() => {
		setColorMode('dark')
	}, [])
	return <>{children}</>
}

export default ThemeProvider
