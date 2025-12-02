'use client';

import React, { useState } from 'react';
import { Consultation } from '@/types/index';
import { downloadImageAPI } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Button } from './Button';

interface ConsultationTableProps {
  consultations: Consultation[];
  loading?: boolean;
}

export const ConsultationTable: React.FC<ConsultationTableProps> = ({ 
  consultations = [],
  loading = false 
}) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownloadReport = async (
    consultation: Consultation,
    acte: any
  ) => {
    if (!acte.fileName) return;

    const downloadKey = `${consultation.id}-${acte.acteId}-report`;
    setDownloading(downloadKey);
    setDownloadError(null);

    try {
      const blob = await downloadImageAPI(
        consultation.patientId,
        consultation.id,
        acte.fileName,
        acte.acteId
      );

      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = acte.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`✅ Rapport téléchargé: ${acte.fileName}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors du téléchargement';
      setDownloadError(errorMsg);
      console.error('❌ Download error:', errorMsg);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadImages = async (
    consultation: Consultation,
    acte: any
  ) => {
    if (!acte.imageFileName) return;

    const downloadKey = `${consultation.id}-${acte.acteId}-images`;
    setDownloading(downloadKey);
    setDownloadError(null);

    try {
      const blob = await downloadImageAPI(
        consultation.patientId,
        consultation.id,
        acte.imageFileName,
        acte.acteId
      );

      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = acte.imageFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log(`✅ Images téléchargées: ${acte.imageFileName}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors du téléchargement';
      setDownloadError(errorMsg);
      console.error('❌ Download error:', errorMsg);
    } finally {
      setDownloading(null);
    }
  };

  // State de chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      </div>
    );
  }

  // Pas de consultations
  if (!consultations || consultations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Aucune consultation trouvée</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      {downloadError && (
        <div className="p-4 bg-red-50 border-b border-red-200 text-red-700 text-sm flex justify-between items-center">
          <span>{downloadError}</span>
          <button 
            onClick={() => setDownloadError(null)}
            className="text-red-600 hover:text-red-900"
          >
            ✕
          </button>
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient</th>

            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">État</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actes</th>
          </tr>
        </thead>
        <tbody>
          {consultations.map((consultation) => (
            <tr
              key={consultation.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                {formatDate(consultation.date)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {consultation.patientNomComplet }
              </td>
           
              <td className="px-6 py-4 text-sm">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  consultation.etat === 'COMPLETE' 
                    ? 'bg-green-100 text-green-800'
                    : consultation.etat === 'EN_COURS'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {consultation.etat}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="space-y-2">
                  {consultation.actes && consultation.actes.length > 0 ? (
                    consultation.actes.map((acte) => (
                      <div key={acte.acteId} className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded">
                        <span className="text-gray-700 text-xs font-medium">
                          {acte.name || 'Acte sans nom'}
                        </span>
                        <div className="flex gap-1">
                          {acte.fileName && (
                            <button
                              onClick={() => handleDownloadReport(consultation, acte)}
                              disabled={downloading === `${consultation.id}-${acte.acteId}-report`}
                              title="Télécharger le rapport"
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {downloading === `${consultation.id}-${acte.acteId}-report` ? (
                                <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                                </svg>
                              )}
                            </button>
                          )}
                          {acte.imageFileName && (
                            <button
                              onClick={() => handleDownloadImages(consultation, acte)}
                              disabled={downloading === `${consultation.id}-${acte.acteId}-images`}
                              title="Télécharger les images DICOM"
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {downloading === `${consultation.id}-${acte.acteId}-images` ? (
                                <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24">
                                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                </svg>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">Aucun acte</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};