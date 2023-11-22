import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

/**
 * Get JSX layout containers for displaying Header, Footer and outlet components to render for page.
 * @returns JSX elements with Header, Outlet and Footer containers to render.
 */
function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export { MainLayout };
