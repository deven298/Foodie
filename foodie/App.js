import React from 'react';
import { AuthProvider } from './src/auth';
import Navigation from './src/Navigation';

export default function App(props) {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
