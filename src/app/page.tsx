'use client';

import React from 'react';
import Link from 'next/link';
import { useRadiologyStore } from '@/lib/store';
import { Button } from '@/components/Button';

export default function HomePage() {
  const { isAuthenticated } = useRadiologyStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">ClickRadio</h1>
          <p className="text-xl text-gray-600">
            Plateforme sécurisée de consultation de vos images de radiologie
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Accès 24/7</h3>
            <p className="text-sm text-gray-600">Consultez vos images quand vous le voulez</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sécurisé</h3>
            <p className="text-sm text-gray-600">Données protégées et chiffrées</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 mx-auto">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Contrôle Total</h3>
            <p className="text-sm text-gray-600">Gérez et supprimez vos images</p>
          </div>
        </div>

        {/* CTA */}
        {isAuthenticated ? (
          <Link href="/dashboard">
            <Button variant="primary">
              Accéder à mon espace
            </Button>
          </Link>
        ) : (
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button variant="primary">
                Se connecter
              </Button>
            </Link>
          </div>
        )}

       
      </div>
    </div>
  );
}
