import { FC, useState } from 'react'
import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack
} from '@chakra-ui/react'
import {
	formatCardNumber,
	getNumberFromCard
} from '../../../../utils/format-card-number'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ITransferData } from './transfer.interface'
import { useProfile } from '../../../../hooks/useProfile'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ITransferMoney, UserService } from '../../../../services/user.service'
import SuccessAlert from './SuccessAlert'

interface ITransferModal {
	isOpen: boolean
	onClose: () => void
}
const TransferModal: FC<ITransferModal> = ({ isOpen, onClose }) => {
	const { user } = useProfile()
	const [isSuccess, setIsSuccess] = useState(false)

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<ITransferData>({
		mode: 'onChange',
		defaultValues: {
			amount: 0
		}
	})

	const queryClient = useQueryClient()

	const { mutate, isLoading } = useMutation(
		['transfer money'],
		(data: ITransferMoney) => UserService.transferMoney(data),
		{
			async onSuccess() {
				setIsSuccess(true)
				reset()

				await queryClient.invalidateQueries(['profile'])

				setTimeout(() => {
					setIsSuccess(false)
				}, 2000)
			}
		}
	)

	const onSubmit: SubmitHandler<ITransferData> = data => {
		if (!user?.card) return
		mutate({
			card: getNumberFromCard(data.card),
			amount: Number(data.amount),
			fromCard: user.card
		})
	}

	// @ts-ignore
	// @ts-ignore
	// @ts-ignore
	// @ts-ignore
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="full"
			motionPreset="slideInBottom"
		>
			<ModalOverlay />
			<ModalContent bg="#171717" pos="relative">
				<SuccessAlert isSuccess={isSuccess} />
				<ModalHeader>Transfer your money</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							<Input
								placeholder="From card"
								size="md"
								defaultValue={formatCardNumber(user?.card || 0)}
								disabled
							/>
							<Controller
								control={control}
								name="card"
								render={({ field: { onChange, name, value } }) => (
									<FormControl isInvalid={!!errors.card?.message}>
										<Input
											id={name}
											size="md"
											placeholder="To card"
											type="tel"
											value={formatCardNumber(value)}
											onChange={e => onChange(e.target.value)}
											maxLength={19}
										/>
										<FormErrorMessage>{errors.card?.message}</FormErrorMessage>
									</FormControl>
								)}
								rules={{
									required: 'This is required',
									minLength: {
										value: 16,
										message: 'Length should be 16'
									}
								}}
							/>

							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									color="gray.300"
									fontSize="1.2em"
									children="$"
								/>
								<Input
									placeholder="Enter amount"
									{...register('amount', {
										required: 'This is required'
									})}
								/>
							</InputGroup>
							<Button
								colorScheme="green"
								variant="outline"
								isLoading={isLoading}
								loadingText="Sending money..."
								type="submit"
							>
								Send money
							</Button>
						</Stack>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default TransferModal
