import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import './index.css'
import { store } from './redux/store.ts'
import {ThemeProvider} from "next-themes";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider attribute={"class"}>
				<App />
			</ThemeProvider>
		</Provider>
	</StrictMode>
)
