# Projet Web – Gestion de bibliothèque

Projet de fin de semestre – Programmation Web, EPITA (2025-2026).

**Auteur(s) :** _Nom Prénom – email_ / _Nom Prénom – email (si binôme)_

## Description

Application web frontend / backend permettant de consulter et gérer une base de données de bibliothèque (livres et auteurs).

Objectifs du sujet :

- S'authentifier (identifiant : `admin`, mot de passe : `password`)
- Visualiser un tableau de bord avec les chiffres clés
- Créer un auteur / un livre
- Rechercher un livre ou un auteur par son nom
- Afficher et modifier la fiche d'un livre
- Afficher et modifier la fiche d'un auteur, avec la liste de ses livres

## Contraintes respectées

- Aucune librairie externe en dehors de celles déjà présentes dans `back` et `front`
- Frontend découpé avec la mini-librairie fournie (`lib.js`, fonction `Import`)
- Backend en architecture **modèle / contrôleur** avec une API **REST**

## Structure du projet

```
.
├── back/
│   ├── index.js                      # Point d'entrée (lance le serveur sur le port 7542)
│   ├── package.json
│   ├── data/
│   │   └── books.json                # "Base de données" (fichiers JSON)
│   └── src/
│       ├── core/
│       │   ├── ServerHttp.js         # Serveur Express, CORS, routage API / statique
│       │   └── Database.js           # Lecture / écriture des fichiers JSON
│       ├── controllers/
│       │   └── BookController.js     # Validation des requêtes sur les livres
│       └── models/
│           └── BookModel.js          # Logique métier sur les livres
└── front/
    ├── index.html                    # Page unique (noeud racine #root)
    └── public/
        ├── css/styles.css
        ├── html/                     # Templates HTML
        │   ├── layout.html
        │   ├── com/                  # header.html, footer.html
        │   └── pages/                # home.html, notfound.html
        └── js/
            ├── lib.js                # Librairie fournie (Import / chargement de fichiers)
            ├── index.js              # Point d'entrée front, routage simple par URL
            ├── com/                  # Composants : Header.js, Footer.js
            └── pages/                # Pages : Home.js, NotFound.js
```

## Installation et lancement

Prérequis : [Node.js](https://nodejs.org/) (version 18 ou supérieure).

```bash
cd back
npm install
npm start          # ou : npm run watch  (rechargement automatique avec nodemon)
```

L'application est ensuite accessible sur : <http://localhost:7542>

Le serveur Express sert à la fois l'API (`/api/...`) et le frontend (fichiers statiques de `front/`).

## Architecture

### Backend (Express, pattern modèle / contrôleur)

- **ServerHttp** : configure Express, les CORS, et dirige les requêtes vers l'API (`/api/*`), les fichiers statiques (`/public/*`) ou `index.html` pour tout le reste.
- **Controller** : vérifie les paramètres reçus (`query`, `body`) et appelle le modèle.
- **Model** : contient la logique de manipulation des données.
- **Database** : lit et écrit les fichiers JSON du dossier `data/`.

### Frontend

Chaque page ou composant est une classe JavaScript associée à un template HTML, chargés via `Import([...], callback)`. `index.js` instancie le header, le footer et la page correspondant à l'URL courante.

## API REST

### Livres – `/api/book/`

| Méthode | Description                        | Paramètres                                 | Réponse                  |
|---------|------------------------------------|--------------------------------------------|--------------------------|
| GET     | Récupérer un livre                 | `?id=<id>`                                 | `{ data: livre }`        |
| POST    | Créer un livre                     | body : `title`, `authors` (tableau)        | `{ data: id }`           |
| PUT     | Modifier un livre                  | `?id=<id>` + body                          | `{ data: livre }`        |
| PATCH   | Modifier partiellement un livre    | `?id=<id>` + body                          | `{ data: livre }`        |
| DELETE  | Supprimer un livre                 | `?id=<id>`                                 | `{ data: true }`         |

En cas d'échec (paramètres manquants, livre introuvable), la réponse est `{ data: false }`. Une erreur serveur renvoie `{ error: '500' }` avec le code HTTP 500.

Exemple de livre :

```json
{
  "id": 1,
  "title": "Au bonheur des dames",
  "authors": ["Emile Zola"]
}
```

## État d'avancement

- [x] API REST complète sur les livres (GET, POST, PUT, PATCH, DELETE)
- [x] Couche d'accès aux données (fichiers JSON)
- [x] Squelette du frontend (layout, header, footer, page d'accueil, page 404)
- [ ] Authentification
- [ ] Tableau de bord
- [ ] API et pages pour les auteurs
- [ ] Recherche de livres / d'auteurs par nom
- [ ] Fiches livre et auteur (consultation / modification)
- [ ] Formulaires de création de livre et d'auteur

_(Adaptez cette liste à l'état réel de votre projet avant le rendu.)_

## Rendu

Le projet est rendu sous forme de dossier `.zip`, **sans** le dossier `node_modules`.
