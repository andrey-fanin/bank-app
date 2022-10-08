import { FC } from 'react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Heading, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import Balance from './Balance'
import TransferModal from './transfer-money/TransferModal'
import { useProfile } from '../../../hooks/useProfile'

const Home: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { user } = useProfile()

	return (
		<Box bg="black" p="6" minH={'100vh'}>
			<Box>
				<Text fontSize="xl" color="whiteAlpha.500">
					Good morning!
				</Text>
				<Heading fontSize="2xl">{user?.name}</Heading>
			</Box>
			<Balance />

			<IconButton
				variant="outline"
				display="block"
				m="auto"
				mt="7"
				colorScheme="white"
				aria-label="Transfer"
				fontSize="18px"
				icon={<ArrowRightIcon />}
				onClick={onOpen}
			/>
			<TransferModal isOpen={isOpen} onClose={onClose} />
		</Box>
	)
}

export default Home
