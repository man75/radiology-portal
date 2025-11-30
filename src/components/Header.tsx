'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRadiologyStore } from '@/lib/store';
import { Button } from './Button';

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useRadiologyStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isAuthenticated ? '/dashboard' : '/'}>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary">ClickRadio</h1>
                <p className="text-xs text-gray-500">Radiologie</p>
              </div>
            </div>
          </Link>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.patient.firstName} {user.patient.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user.patient.email}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                  {user.patient.firstName[0]}
                </div>
              </div>
            )}

            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout}>
                Déconnexion
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="primary">Connexion</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
