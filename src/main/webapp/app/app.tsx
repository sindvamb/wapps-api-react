import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import ErrorBoundary from './error/error-boundary';
import AppRoutes from './routes';
import { LayoutProvider } from './layout/context/layoutcontext';
import Layout from './layout/layout';

import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './layout/styles/layout.css';


/**
 * Provide the app layout and some general functionality.
 */
export default function App() {
    return (
        <PrimeReactProvider>
            <LayoutProvider>
                <Layout>
                    <ErrorBoundary>
                        <AppRoutes />
                    </ErrorBoundary>
                </Layout>
            </LayoutProvider>
        </PrimeReactProvider>
    );
}
