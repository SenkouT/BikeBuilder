# BikeBuilder

Application web de configuration de vélo avec données de démonstration.

## Démarrage local

```bash
npm install
npm run dev
```

Ouvre ensuite http://localhost:3000.

## Pages

- `/` : page d’accueil
- `/builder` : configurateur en 10 étapes
- `/compare` : tableau comparatif des offres
- `/saved` : configurations sauvegardées

## Version actuelle

Cette version comprend :

- une interface responsive en français ;
- une sélection de composants avec recherche et filtre par marque ;
- un résumé permanent, le calcul du total et une sauvegarde locale ;
- un moteur de règles expliquant les incompatibilités cadre/fourche, cadre/roues, roues/pneus et transmission ;
- une couche `PriceProvider` et une API `/api/components?q=` prêtes à recevoir des données marchandes ;
- une API POST `/api/configurations` validée avec Zod ;
- un schéma Prisma/PostgreSQL de base.

## Données de démonstration

Les composants, prix et vendeurs présents dans l’interface sont explicitement des données de test. Ils ne constituent pas des offres réelles. Une future intégration marchande devra respecter les conditions d’utilisation et la législation applicables.

## Base de données

Copie `.env.example` vers `.env`, renseigne `DATABASE_URL`, puis ajoute Prisma si tu souhaites activer la persistance :

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Aucune clé de fournisseur de prix ne doit être exposée au navigateur.
