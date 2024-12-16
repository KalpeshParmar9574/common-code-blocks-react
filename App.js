import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authModule/AuthProvider';
import AuthenticatedRoute from './authModule/AuthenticatedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloClient, ApolloProvider } from '@apollo/client';
// Lazy-loaded Components
const LoginPage = lazy(() => import('./authModule/LoginPage'));
const RegisterPage = lazy(() => import('./authModule/RegisterPage'));
const KanabaBoard = lazy(() => import('./components/KanabaBoard'));

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <GoogleOAuthProvider clientId='49010950592-3tfsss7du44kjo7ot4m54hlc265b8p63.apps.googleusercontent.com'>
        <ApolloProvider client={ApolloClient}>
        <Router>
          {/* Add Suspense to handle lazy-loaded components */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <AuthenticatedRoute>
                    <KanabaBoard />
                  </AuthenticatedRoute>
                }
              />
            </Routes>
          </Suspense>
        </Router> 
        </ApolloProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
