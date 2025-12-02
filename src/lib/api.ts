/**
 * Service API pour les appels Keycloak et consultations
 * Gestion complète des tokens avec refresh automatique
 */

import { Consultation, PagedResult } from '@/types/index';

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:57689';

/**
 * Récupère le token d'accès depuis localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

/**
 * Récupère le refresh token depuis localStorage
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('refreshToken');
}

/**
 * Sauvegarde les tokens
 */
export function saveTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

/**
 * Supprime les tokens
 */
export function clearTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

/**
 * Rafraîchit le token d'accès
 * Endpoint: [HttpPost("refresh")] public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    clearTokens();
    return null;
  }

  try {
   
    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refreshToken), // ✅ Envoyer le refreshToken comme string
    });

    if (!response.ok) {
    
      clearTokens();
      return null;
    }

    const data: AuthResponse = await response.json();
    saveTokens(data.accessToken, data.refreshToken);
   
    return data.accessToken;
  } catch (error) {

    clearTokens();
    return null;
  }
}

/**
 * Helper pour faire un fetch avec le token automatiquement
 * Ajoute le header Authorization et gère le refresh automatique
 */
async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error('Aucun token d\'accès disponible. Veuillez vous connecter.');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${accessToken}`);
  headers.set('Content-Type', 'application/json');

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // Si 401 (Unauthorized), essayer de rafraîchir le token
  if (response.status === 401) {

    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }

    // Refaire la requête avec le nouveau token
    headers.set('Authorization', `Bearer ${newAccessToken}`);
    response = await fetch(url, {
      ...options,
      headers,
    });
  }

  return response;
}

/**
 * Appel l'endpoint de login Keycloak
 * POST /api/auth/login
 */
export async function loginAPI(userName: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erreur d\'authentification');
  }

  return response.json();
}

/**
 * Appel la déconnexion
 * POST /api/auth/logout
 */
export async function logoutAPI(): Promise<void> {
  try {
    const response = await fetchWithAuth(`${API_URL}/api/auth/logout`, {
      method: 'POST',
    });

    if (!response.ok) {
    
    }
  } catch (error) {

  } finally {
    // Toujours supprimer les tokens localement
    clearTokens();
  }
}

/**
 * Récupère le profil utilisateur
 * GET /api/auth/profile
 */
export async function getUserProfileAPI(): Promise<any> {
  const response = await fetchWithAuth(`${API_URL}/api/auth/profile`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Impossible de récupérer le profil');
  }

  return response.json();
}

/**
 * Récupère la liste des consultations du médecin
 * GET /api/consultations/getConsultations?page={page}&pageSize={pageSize}
 */
export async function getConsultationsAPI(
  pageNumber: number = 1,
  pageSize: number = 10,
  cabinetId?: string,
  patientId?: string,
  dateFrom?: string,
  dateTo?: string
): Promise<PagedResult<Consultation>> {
  // Construire les query params
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });

  if (cabinetId) params.append('cabinetId', cabinetId);
  if (patientId) params.append('patientId', patientId);
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);

  const response = await fetchWithAuth(
    `${API_URL}/api/consultations?${params.toString()}`,
    { method: 'GET' }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Impossible de récupérer les consultations');
  }

  return response.json();
}
/**
 * Télécharge une image/rapport
 * GET /api/images/{patientId}/{consultationId}/{fileName}/{acteId}
 */
export async function downloadImageAPI(
  patientId: string,
  consultationId: string,
  fileName: string,
  acteId: string
): Promise<Blob> {

  
  const response = await fetchWithAuth(
    `${API_URL}/api/dicom/images/${patientId}/${consultationId}/${encodeURIComponent(fileName)}/${acteId}`,
    { method: 'GET' }
  );

  if (!response.ok) {
    throw new Error('Impossible de télécharger le fichier');
  }

  return response.blob();
}
