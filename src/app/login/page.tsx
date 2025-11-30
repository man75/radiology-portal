'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useRadiologyStore } from '@/lib/store';
import { Button } from '@/components/Button';

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useRadiologyStore();

  const [userName, setUserName] = useState('akarim134@gmail.com');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');

    try {
      await login(userName, password);
      
      // Récupérer les rôles et router selon le rôle
      const { userRoles } = useRadiologyStore.getState();
      
      if (userRoles.includes('DOCTOR')) {
        router.push('/doctor-dashboard');
      } else if (userRoles.includes('PATIENT')) {
        router.push('/dashboard');
      } else {
        setLocalError('Rôle utilisateur non reconnu');
      }
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">ClickRadio</h1>
          <p className="text-gray-600 mt-2">Connexion à votre espace</p>
        </div>

        {/* Form Card */}
        <div className="card">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {(localError || error) && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {localError || error}
                </div>
              )}

              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom d'utilisateur ou email
                </label>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="votre.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={loading}
                disabled={!userName || !password}
                className="w-full"
              >
                Se connecter
              </Button>
            </form>

           
          </div>
        </div>
      </div>
    </div>
  );
}
