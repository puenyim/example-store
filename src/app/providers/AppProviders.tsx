import { BrowserRouter } from 'react-router-dom';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

/**
 * AppProviders wraps the app with BrowserRouter and any future providers
 * (e.g. ThemeProvider, QueryClientProvider, etc.)
 */
const AppProviders = ({ children }: Props) => {
    return <BrowserRouter>{children}</BrowserRouter>;
};

export default AppProviders;
