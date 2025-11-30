/**
 * Service pour décoder et gérer les tokens JWT
 */

export interface DecodedToken {
  sub: string;
  email?: string;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  realm_access?: {
    roles: string[];
  };
  resource_access?: {
    'api-auth'?: {
      roles: string[];
    };
  };
}

/**
 * Decode un JWT et retourne son contenu
 */
export function decodeJWT(token: string): DecodedToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erreur lors du décodage JWT:', error);
    return null;
  }
}

/**
 * Extrait les rôles du JWT
 */
export function getUserRoles(token: string): string[] {
  const decoded = decodeJWT(token);
  return decoded?.realm_access?.roles ?? [];
}

/**
 * Vérifie si l'utilisateur a un rôle spécifique
 */
export function hasRole(token: string, role: string): boolean {
  const roles = getUserRoles(token);
  return roles.includes(role);
}

/**
 * Récupère les rôles depuis le token en localStorage
 */
export function getStoredUserRoles(): string[] {
  if (typeof window === 'undefined') return [];
  const token = localStorage.getItem('accessToken');
  if (!token) return [];
  return getUserRoles(token);
}

/**
 * Vérifie si l'utilisateur en localStorage a un rôle
 */
export function storedUserHasRole(role: string): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('accessToken');
  if (!token) return false;
  return hasRole(token, role);
}
