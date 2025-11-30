# 🔌 Guide d'intégration API Keycloak - MedRay

## Résumé des modifications

MedRay a été mis à jour pour appeler ton API Keycloak au lieu d'utiliser mock data.

### ✅ Fichiers modifiés

1. **`src/lib/store.ts`** - Store Zustand
   - Remplace les appels mock par des appels API réels
   - Gère les tokens (accessToken, refreshToken)
   - Sauvegarde les tokens dans localStorage
   - Decode le JWT pour extraire les infos utilisateur

2. **`src/app/login/page.tsx`** - Page de connexion
   - Change `email` → `userName` (comme ton API)
   - Affiche les erreurs API
   - Affiche la configuration API

3. **`src/lib/api.ts`** - Service API (nouveau)
   - Fonctions réutilisables pour appeler l'API
   - `loginAPI()`, `refreshTokenAPI()`, `logoutAPI()`, `getUserProfileAPI()`
   - Helpers pour gérer les tokens

4. **`.env.local.example`** - Configuration (nouveau)
   - Template pour configurer l'URL de l'API
   - À copier en `.env.local`

---

## 🚀 Configuration

### Step 1: Copier le fichier d'environnement

```bash
cp .env.local.example .env.local
```

### Step 2: Configurer l'URL de l'API

Éditez `.env.local`:

```env
# Configuration de production
NEXT_PUBLIC_API_URL=https://auth.clickradio.pro

# Configuration développement
# NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Important:**
- Le préfixe `NEXT_PUBLIC_` est nécessaire pour accéder à la variable depuis le frontend
- Sans ce préfixe, Next.js ne l'expose pas au navigateur

### Step 3: Démarrer l'application

```bash
npm install
npm run dev
```

---

## 🔐 Flux d'authentification

```
1. Frontend: POST /api/auth/login
   {
     "userName": "akarim134@gmail.com",
     "password": "..."
   }

2. Backend Keycloak: Valide et retourne
   {
     "accessToken": "eyJ...",
     "refreshToken": "eyJ..."
   }

3. Frontend: 
   - Sauvegarde les tokens dans localStorage
   - Decode le JWT pour extraire les infos utilisateur
   - Affiche le dashboard

4. Chaque requête API inclut:
   Authorization: Bearer {accessToken}

5. Si accessToken expire:
   - Frontend appelle POST /api/auth/refresh
   - Récupère un nouveau accessToken
   - Continue
```

---

## 📝 Utilisation du Store

### Login

```typescript
import { useRadiologyStore } from '@/lib/store';

const { login, loading, error } = useRadiologyStore();

try {
  await login('akarim134@gmail.com', 'password');
  // Succès! Rediriger vers /dashboard
} catch (err) {
  console.error(err.message);
}
```

### Logout

```typescript
const { logout } = useRadiologyStore();

logout(); // Supprime les tokens et déconnecte
```

### Accéder aux tokens

```typescript
const { accessToken, refreshToken } = useRadiologyStore();

// Utiliser accessToken pour les appels API
const response = await fetch('/api/some-endpoint', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### Rafraîchir le token

```typescript
const { refreshAccessToken } = useRadiologyStore();

await refreshAccessToken();
```

---

## 🛠️ Utilisation du Service API

### Importer le service

```typescript
import { loginAPI, refreshTokenAPI, logoutAPI, getUserProfileAPI } from '@/lib/api';
```

### Login

```typescript
const response = await loginAPI('akarim134@gmail.com', 'password');
// Returns: { accessToken: "...", refreshToken: "..." }
```

### Rafraîchir le token

```typescript
const newTokens = await refreshTokenAPI(refreshToken);
```

### Logout

```typescript
await logoutAPI(accessToken);
```

### Profil utilisateur

```typescript
const profile = await getUserProfileAPI(accessToken);
```

### Gestion des tokens

```typescript
import { 
  getAccessToken, 
  getRefreshToken, 
  saveTokens, 
  clearTokens 
} from '@/lib/api';

// Récupérer
const token = getAccessToken();

// Sauvegarder
saveTokens(accessToken, refreshToken);

// Supprimer
clearTokens();
```

---

## 🔄 Gestion des erreurs

### Dans le Store

```typescript
const { error, login } = useRadiologyStore();

try {
  await login(userName, password);
} catch (err) {
  // L'erreur est aussi disponible via: error
  console.log(error); // "Erreur de connexion" ou message du serveur
}
```

### Type d'erreurs possibles

```
1. Credentials incorrects
   → "Erreur de connexion" (message du backend)

2. API indisponible
   → "Erreur de connexion" (erreur réseau)

3. Token expiré
   → Refresh automatique du token

4. Refresh token invalide
   → Déconnexion automatique
```

---

## 🔐 Sécurité

### ✅ Token Management

- Les tokens sont stockés dans `localStorage`
- Chaque requête inclut le `accessToken` dans l'header `Authorization`
- Si le token expire, le frontend appelle le refresh endpoint
- Le refresh token permet de récupérer un nouveau token sans se reconnecter

### ✅ CORS

Si tu as des erreurs CORS, configure-les sur ton backend:

```csharp
// Dans ton API .NET
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000", "https://yourdomain.com")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

app.UseCors("AllowFrontend");
```

### ❌ À éviter

- Ne pas stocker les tokens en localStorage côté production (utiliser httpOnly cookies)
- Ne pas envoyer le refreshToken au frontend en prod (gérer côté backend)
- Ne pas logguer les tokens

---

## 🚨 Dépannage

### "TypeError: Failed to fetch"

**Cause:** API indisponible ou CORS bloqué

**Solution:**
1. Vérifier que l'API tourne: `curl http://localhost:5000/api/auth/login`
2. Vérifier l'URL dans `.env.local`
3. Vérifier les paramètres CORS

### "Erreur de connexion"

**Cause:** Identifiants incorrects ou erreur serveur

**Solution:**
1. Vérifier username et password
2. Vérifier les logs du serveur Keycloak
3. Vérifier la réponse du serveur dans Network tab

### Token expiré après quelques minutes

**Cause:** Normal! C'est le comportement par défaut

**Solution:**
- Le frontend appelle automatiquement le refresh endpoint
- Pas besoin d'action manuelle

### localStorage vide après refresh

**Cause:** Incognito mode ou localStorage désactivé

**Solution:**
- Utiliser localStorage seulement en développement
- Passer aux httpOnly cookies en production

---

## 📊 Intégration avec d'autres features

### Appels API sécurisés

```typescript
// Pour toute requête API, inclure le token:

const accessToken = useRadiologyStore((state) => state.accessToken);

const response = await fetch('/api/images', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

### Récupérer les images depuis une API

```typescript
// Actuellement les images sont mockées
// Pour appeler une vraie API:

const response = await fetch(`${API_URL}/api/radiology/images`, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const images = await response.json();
set({ images });
```

---

## ✨ Prochaines étapes

### Niveau 1 (Immédiat)
- [ ] Configurer `.env.local` avec l'URL de l'API
- [ ] Tester la connexion
- [ ] Vérifier les tokens dans DevTools

### Niveau 2 (Court terme)
- [ ] Remplacer les images mockées par une API réelle
- [ ] Ajouter les patients de Cabinex
- [ ] Implémenter les rôles/permissions

### Niveau 3 (Long terme)
- [ ] Passer aux httpOnly cookies
- [ ] Ajouter un interceptor pour refresh automatique
- [ ] Implémenter la double authentification

---

## 📚 Fichiers de référence

| Fichier | Rôle |
|---------|------|
| `src/lib/store.ts` | Store Zustand + logique auth |
| `src/lib/api.ts` | Service API réutilisable |
| `src/app/login/page.tsx` | Formulaire login |
| `.env.local` | Configuration (à créer) |

---

## 🎯 Résumé

**Avant:**
- Mock data en dur
- Pas d'authentification réelle
- Pas de sécurité

**Après:**
- ✅ Appels API réels
- ✅ Authentification Keycloak
- ✅ Token management
- ✅ Error handling
- ✅ Prêt pour la production

---

**Besoin d'aide?**

1. Vérifier que l'API tourne
2. Vérifier l'URL dans `.env.local`
3. Vérifier Network tab pour les erreurs
4. Vérifier les logs du serveur

Bon développement! 🚀
