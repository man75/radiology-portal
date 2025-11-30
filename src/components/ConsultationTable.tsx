'use client';

import React, { useState } from 'react';
import { Consultation } from '@/types/index';
import { downloadImageAPI } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Button } from './Button';

interface ConsultationTableProps {
  consultations: Consultation[];
}

export const ConsultationTable: React.FC<ConsultationTableProps> = ({ consultations }) => {
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
    } catch (error) {
      setDownloadError(
        error instanceof Error ? error.message : 'Erreur lors du téléchargement'
      );
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
    } catch (error) {
      setDownloadError(
        error instanceof Error ? error.message : 'Erreur lors du téléchargement'
      );
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      {downloadError && (
        <div className="p-4 bg-red-50 border-b border-red-200 text-red-700 text-sm">
          {downloadError}
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
              <td className="px-6 py-4 text-sm text-gray-900">
                {formatDate(consultation.date)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {consultation.patientNomComplet}
              </td>
       
              <td className="px-6 py-4 text-sm">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {consultation.etat}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="space-y-2">
                  {consultation.actes.map((acte) => (
                    <div key={acte.acteId} className="flex items-center gap-2">
                      <span className="text-gray-700">{acte.name || 'Sans nom'}</span>
                      <div className="flex gap-1">
                        {acte.fileName && (
                          <button
                            onClick={() => handleDownloadReport(consultation, acte)}
                            disabled={downloading === `${consultation.id}-${acte.acteId}-report`}
                            title="Télécharger le CR"
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M7 19H17V5H7V19M7 3H17A2 2 0 0 1 19 5V19A2 2 0 0 1 17 21H7A2 2 0 0 1 5 19V5A2 2 0 0 1 7 3Z" />
                            </svg>
                          </button>
                        )}
                        {acte.imageFileName && (
                          <button
                            onClick={() => handleDownloadImages(consultation, acte)}
                            disabled={downloading === `${consultation.id}-${acte.acteId}-images`}
                            title="Télécharger les images"
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition disabled:opacity-50"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {consultation.actes.length === 0 && (
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
