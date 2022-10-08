import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useProfile } from '../../../hooks/useProfile'

const Balance: FC = () => {
	const { user } = useProfile()
	return (
		<Box mt="4" pos="relative" width={'50%'} m="auto">
			<Flex
				justifyContent="center"
				alignItems="center"
				direction="column"
				zIndex={2}
				position="relative"
			>
				<Heading fontSize="5xl">$ {user?.balance}</Heading>
				<Text fontSize="xl" color="whiteAlpha.500">
					Balance
				</Text>
			</Flex>
			<Box bgGradient="radial(green.100, green.300)" pos="absolute" />
		</Box>
	)
}

export default Balance
