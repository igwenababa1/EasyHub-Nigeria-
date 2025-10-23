import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { UserProvider } from './contexts/UserContext';
import { RatingProvider } from './contexts/RatingContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <RatingProvider>
            <App />
          </RatingProvider>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);