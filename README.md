# Voyage à toi : site du livre

Site vitrine statique (Astro + Tailwind). Aucun cookie, aucun traceur, aucun formulaire.

## Modifier le contenu (sans toucher au code)

| Quoi | Où |
|---|---|
| Tous les textes, le titre, le résumé, la bio, l'abécédaire, l'e-mail de contact | `src/content/site.json` |
| Les mentions légales | `src/content/legal/mentions-legales.md` |
| Les images (couverture, photo du livre, portrait) | `src/assets/` |

Conseils :
- **Images** : déposez le fichier dans `src/assets/` puis écrivez son nom exact dans `site.json` (ex. `"image": "couverture.jpg"`). Le texte `alt` (description de l'image pour les personnes malvoyantes) est obligatoire.
- **Abécédaire** : ajoutez `{ "mot": "…", "definition": "…" }` dans la liste `"abecedaire"`, dans n'importe quel ordre : le tri est automatique.
- **Sections facultatives** : une liste vide (`[]`) ou un champ supprimé fait disparaître la section correspondante (ex. `"reseaux": []`, `"genre"`, `"details"`, `"sujets"`).
- **Guillemets** : dans `site.json`, les guillemets droits `"` à l'intérieur d'un texte doivent être écrits `\"`. Préférez les guillemets français « … ».
- Si vous faites une erreur dans `site.json`, la construction du site s'arrête et indique le champ à corriger.

## Commandes

```bash
npm install      # une seule fois
npm run dev      # aperçu local sur http://localhost:4321
npm run build    # génère le site dans dist/
```

## Déploiement sur Cloudflare Pages

1. Pousser le projet sur GitHub (ou GitLab).
2. Cloudflare → Workers & Pages → Créer → Pages → connecter le dépôt.
3. Préréglage : **Astro**. Commande de build : `npm run build`. Dossier de sortie : `dist`.
4. Variable d'environnement conseillée : `NODE_VERSION` = `22`.
5. Une fois le domaine connu, mettre à jour `site.url` dans `site.json` (utilisé pour le sitemap, le robots.txt et les aperçus sur les réseaux sociaux).
