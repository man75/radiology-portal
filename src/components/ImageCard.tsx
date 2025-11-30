'use client';

import React, { useState } from 'react';
import { RadiologyImage } from '@/types/index';
import { useRadiologyStore } from '@/lib/store';
import { formatDate, getRadiologyTypeColor } from '@/lib/utils';
import { Button } from './Button';

interface ImageCardProps {
  image: RadiologyImage;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [expanded, setExpanded] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const { deleteImage } = useRadiologyStore();

  const handleDelete = () => {
    deleteImage(image.id);
    setDeleteConfirm(false);
  };

  return (
    <div className="card">
      {/* Image Preview */}
      <div className="relative bg-gray-100 h-48 overflow-hidden rounded-t-lg">
        <img
          src={image.imageUrl}
          alt={image.bodyPart}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRadiologyTypeColor(image.type)}`}>
            {image.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900">{image.bodyPart}</h3>
            <p className="text-xs text-gray-500">{formatDate(image.examinationDate)}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="space-y-2 mb-4 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Radiologie:</span> {image.radiologist}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Fichier:</span> {image.filename}
          </p>
        </div>

        {/* Report */}
        <div className="mb-4">
          {expanded ? (
            <div className="bg-secondary p-3 rounded-lg">
              <p className="text-sm text-gray-700">{image.report}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 line-clamp-2">{image.report}</p>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary text-xs font-medium mt-2 hover:underline"
          >
            {expanded ? 'Voir moins' : 'Voir plus'}
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button className="flex-1 px-3 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-blue-50 transition">
            📥 Télécharger
          </button>

          {!deleteConfirm ? (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="flex-1 px-3 py-2 rounded-lg bg-red-50 text-danger text-sm font-medium hover:bg-red-100 transition"
            >
              🗑️ Supprimer
            </button>
          ) : (
            <div className="flex-1 flex gap-1">
              <button
                onClick={handleDelete}
                className="flex-1 px-2 py-2 rounded-lg bg-danger text-white text-xs font-medium hover:bg-red-700 transition"
              >
                Confirmer
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="flex-1 px-2 py-2 rounded-lg bg-gray-200 text-gray-900 text-xs font-medium hover:bg-gray-300 transition"
              >
                Annuler
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
