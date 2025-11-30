'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRadiologyStore } from '@/lib/store';
import { useConsultationStore } from '@/lib/consultationStore';
import { Button } from '@/components/Button';
import { ConsultationTable } from '@/components/ConsultationTable';
import { PaginationComponent } from '@/components/Pagination';

export default function DoctorDashboard() {
  const router = useRouter();
  const { isAuthenticated, user, logout, hasRole } = useRadiologyStore();
  const { consultations, loading, currentPage, totalPages, fetchConsultations, setCurrentPage } = useConsultationStore();

  // Vérifier l'authentification et le rôle
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!hasRole('DOCTOR')) {
      router.push('/dashboard');
      return;
    }
  }, [isAuthenticated, hasRole, router]);

  // Charger les consultations au montage et quand la page change
  useEffect(() => {
    fetchConsultations(currentPage);
  }, [currentPage, fetchConsultations]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Mes Consultations
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Bienvenue, Dr. {user.patient.firstName} {user.patient.lastName}
              </p>
            </div>
           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des consultations...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && consultations.length === 0 && (
          <div className="card p-12 text-center">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Aucune consultation</h3>
            <p className="text-gray-600">Aucune consultation disponible pour le moment.</p>
          </div>
        )}

        {/* Consultations Table */}
        {!loading && consultations.length > 0 && (
          <>
            <div className="card overflow-hidden">
              <ConsultationTable consultations={consultations} />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
