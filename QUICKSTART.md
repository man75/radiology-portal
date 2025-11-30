# 🚀 Guide de démarrage - MedRay

## ⚡ 30 secondes pour démarrer

### 1. Installation
```bash
npm install
```

### 2. Lancer l'app
```bash
npm run dev
```

### 3. Ouvrir le navigateur
```
http://localhost:3000
```

### 4. Se connecter
```
Email: ahmed.bouali@example.com
Mot de passe: password
```

## 🎯 Ce que vous allez voir

1. **Page d'accueil** - Présentation de MedRay
2. **Page login** - Connexion avec mock data
3. **Dashboard** - Galerie d'images de radiologie
4. **Chaque image** - Avec rapport, dates, radiologiste
5. **Actions** - Télécharger ou supprimer

## 💡 Fonctionnalités à tester

- ✅ Cliquer sur "Voir plus" pour lire le rapport complet
- ✅ Cliquer sur "Supprimer" pour supprimer une image
- ✅ Cliquer sur "Télécharger" pour télécharger (mock)
- ✅ Déconnexion et reconnexion
- ✅ Responsive design (redimensionner le navigateur)

## 📝 Personnalisation

### Ajouter une image

Éditez `src/data/mockData.ts`:

```typescript
{
  id: 'image-007',
  patientId: 'patient-001',
  filename: 'example.dcm',
  type: 'X-Ray',
  bodyPart: 'Poitrine',
  uploadDate: '2024-11-25',
  examinationDate: '2024-11-24',
  radiologist: 'Dr. Nom',
  report: 'Rapport médical...',
  imageUrl: 'data:image/svg+xml,...',
}
```

### Changer les couleurs

Éditez `tailwind.config.js`:

```javascript
colors: {
  primary: '#0066cc',  // Changez cette couleur
}
```

### Modifier le patient

Éditez `src/data/mockData.ts`:

```typescript
export const mockPatient: Patient = {
  firstName: 'Votre Prénom',
  lastName: 'Votre Nom',
  // ...
}
```

## 🆘 Dépannage

**Port 3000 occupé?**
```bash
npm run dev -- -p 3001
```

**Module non trouvé?**
```bash
rm -rf node_modules
npm install
```

**Styles manquants?**
```bash
npm run build
npm run start
```

## 📚 Fichiers importants

- `src/app/page.tsx` - Accueil
- `src/app/login/page.tsx` - Connexion
- `src/app/dashboard/page.tsx` - Galerie
- `src/components/ImageCard.tsx` - Chaque image
- `src/data/mockData.ts` - Données
- `src/lib/store.ts` - État global

## 🎓 Structure simple

```
Accueil (page.tsx)
   ↓
Bouton "Connexion"
   ↓
Login (login/page.tsx)
   ↓
Dashboard (dashboard/page.tsx)
   ↓
Grille d'images (ImageCard.tsx)
   ↓
Supprimer/Télécharger (actions)
```

## ✨ Points clés

- **Minimaliste** - Pas d'UI complexe
- **Rapide** - Mock data, zero latency
- **Responsive** - Fonctionne partout
- **Typé** - TypeScript strict
- **Contrôle** - Patients contrôlent leurs données

---

**Bon développement!** 🏥

```bash
npm run dev
# → http://localhost:3000
```
