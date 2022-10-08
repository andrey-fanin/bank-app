import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './components/screens/home/Home'
import { ChakraProvider } from '@chakra-ui/react'
import ThemeProvider from './providers/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<Home />
				</QueryClientProvider>
			</ThemeProvider>
		</ChakraProvider>
	</React.StrictMode>
)
