'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRadiologyStore } from '@/lib/store';
import { ImageCard } from '@/components/ImageCard';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, images } = useRadiologyStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Mes images de radiologie
        </h1>
        <p className="text-gray-600">
          Gérez et consultez vos examens radiologiques
        </p>
      </div>

      {/* Info Patient */}
      <div className="card mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations du patient</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Nom complet</p>
            <p className="text-lg font-semibold text-gray-900">
              {user.patient.firstName} {user.patient.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">E-mail</p>
            <p className="text-lg font-semibold text-gray-900">{user.patient.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Date de naissance</p>
            <p className="text-lg font-semibold text-gray-900">{user.patient.dateOfBirth}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Numéro de dossier</p>
            <p className="text-lg font-semibold text-gray-900">{user.patient.medicalRecordNumber}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-6">
          <p className="text-sm text-gray-600 mb-1">Nombre d'images</p>
          <p className="text-3xl font-bold text-primary">{images.length}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-600 mb-1">Dernière image</p>
          <p className="text-lg font-semibold text-gray-900">
            {images.length > 0 ? images[0].type : '—'}
          </p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-gray-600 mb-1">Statut</p>
          <p className="text-lg font-semibold text-green-600">✓ Actif</p>
        </div>
      </div>

      {/* Images Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Aucune image</h3>
          <p className="text-gray-600">Aucune image de radiologie n'est disponible</p>
        </div>
      )}
    </div>
  );
}
