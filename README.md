# 🏥 MedRay - Portal de Radiologie pour Patients

> Application web minimaliste et sécurisée de consultation d'images de radiologie

## ✨ Caractéristiques

✅ **Authentification** - Connexion sécurisée  
✅ **Galerie d'images** - Visualisation des radiologies  
✅ **Gestion complète** - Télécharger et supprimer vos images  
✅ **Responsive** - Mobile, tablette, desktop  
✅ **Minimaliste** - Interface claire et intuitive  
✅ **Rapide** - Zero latency, mock data  

## 🎯 Fonctionnalités

- **Consulter vos images** - Voir tous vos examens radiologiques
- **Voir les rapports** - Lire les rapports du radiologiste
- **Télécharger** - Récupérer vos images
- **Supprimer** - Contrôle total sur vos données
- **Filtrer** - Par type (X-Ray, CT, MRI, Ultrasound, PET)

## 🚀 Démarrage rapide

### Installation
```bash
npm install
```

### Lancer l'application
```bash
npm run dev
```

### Ouvrir dans le navigateur
```
http://localhost:3000
```

## 🔐 Authentification (Mock)

**Email:** ahmed.bouali@example.com  
**Mot de passe:** password

(Tout email + "password" fonctionne aussi)

## 📊 Stack technique

- **React 19** + **Next.js 15**
- **TypeScript** 5.3
- **Tailwind CSS** 3.4
- **Zustand** 5.0 (state management)
- **Vercel-ready**

## 📂 Structure du projet

```
radiology-portal/
├── src/
│   ├── app/              # Pages Next.js
│   │   ├── page.tsx      # Accueil
│   │   ├── login/        # Connexion
│   │   └── dashboard/    # Galerie images
│   ├── components/       # Composants React
│   ├── data/            # Mock data
│   ├── lib/             # Store + Utils
│   ├── types/           # TypeScript types
│   └── styles/          # CSS global
├── Configuration/       # Next, Tailwind, TypeScript
└── Documentation/       # README, etc.
```

## 💡 Points clés

### Minimaliste
- Interface simple et épurée
- Pas de complexité inutile
- Focus sur l'essentiel

### Contrôle utilisateur
- Les patients suppriment LEURS propres images
- Pas de dépendance serveur
- Actions immédiates (local state)

### Données mockées
- 6 images de radiologie de démo
- 1 patient de test
- Tout en mémoire (rechargement = reset)

## 🔧 Commandes

```bash
npm run dev          # Développement
npm run build        # Production build
npm run start        # Run production
npm run lint         # ESLint check
```

## 📱 Responsive

✓ Mobile (< 768px)  
✓ Tablette (768px - 1024px)  
✓ Desktop (> 1024px)  

## 🎨 Design

**Couleur primaire:** #0066cc (Bleu)  
**Couleur danger:** #dc2626 (Rouge)  
**Couleur success:** #16a34a (Vert)  

## 🔄 Flux utilisateur

```
Accueil
   ↓
Login (mock)
   ↓
Dashboard (galerie images)
   ↓
Supprimer / Télécharger
   ↓
Déconnexion
```

## 🌐 Déploiement

### Vercel (recommandé)
```bash
git push origin main
# Vercel auto-deploys
```

### Autre
```bash
npm run build
npm run start
```

## 📋 Données de démo

### Patient
- Nom: Ahmed Bouali
- Email: ahmed.bouali@example.com
- Dossier: MRN-2024-001

### Images (6)
1. **Thorax X-Ray** - Poitrine
2. **Knee X-Ray** - Genou
3. **Spine MRI** - Colonne vertébrale
4. **Brain CT** - Cerveau
5. **Abdomen Ultrasound** - Abdomen
6. **Heart PET** - Cœur

## 🚀 Prochaines étapes

Niveau 1 (10 min):
- Installer → `npm install`
- Lancer → `npm run dev`
- Explorer

Niveau 2 (1 heure):
- Lire le code
- Modifier les données
- Ajouter des images

Niveau 3 (1+ jour):
- Intégrer un backend réel
- Authentification OAuth/JWT
- Database

## 📝 Notes

- Ceci est un prototype frontend uniquement
- Pas de serveur backend
- Mock data en mémoire
- Suppression des images ne persiste pas (rechargement = reset)

## 📞 Support

Consultez le code source:
- `src/app/` - Pages
- `src/components/` - Composants
- `src/lib/` - Logic
- `src/data/` - Mock data

## 📄 Licence

MIT © 2024

---

**Prêt à utiliser !** 🚀

```bash
npm install && npm run dev
```
