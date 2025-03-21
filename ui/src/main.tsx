import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {initializeGA} from './utils/firebase.ts'
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {BrowserRouter} from "react-router-dom";
import {theme} from "./theme";

initializeGA()

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <MantineProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <App/>
                    <Notifications/>
                </QueryClientProvider>
            </MantineProvider>
        </BrowserRouter>
    </StrictMode>,
)
