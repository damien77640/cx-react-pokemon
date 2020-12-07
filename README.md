# Pokédex Pokemon

Client + Serveur pour l'affichage et l'insertion de Pokémon

## Installation du serveur

Installation des dépendances :

```bash
npm i
```

Remplissage de la BD :

```bash
npm run seed
```

Run server :

```bash
npm start
```

## Installation du client

Installation des dépendances :

```bash
npm i
```

Run client :

```bash
npm start
```

## Base de donnée
Pour mettre en place une base de donnée.<br>
Initialisez la variable d'environnement de la manière suivant avec les bonnes valeurs :

```dotenv
#Port du serveur
PORT=""

#Configuration de la BD
HOST=""
USER=""
PASSWORD=""
DATABASE=""
```

## Usage de l'API

### Récupération des pokémons

URL : 
```url
GET /pokemons
```


Return :
```json
[
  {
    "nompokemon": "Bulbizarre",
    "numero": "001"
  },
  {
    "nompokemon": "Herbizarre",
    "numero": "002"
  },
  {
    "nompokemon": "Florizarre",
    "numero": "003"
  },
  ...
]
```

### Récupération des données d'un pokémon

URL :
```url
GET /pokemons/:id
```

Return :
```json
[
  {
    "id": 41,
    "numeropokemon": 151,
    "niveau": "N.20",
    "numeroattaque": 41,
    "nom": "Ultimapoing",
    "puissance": "80",
    "precision": "85",
    "pp": 20,
    "numero": 151,
    "nompokemon": "Mew",
    "poids": 4,
    "taille": 0.4,
    "type1": "Psy",
    "couleur": "Rose",
    "espece": "Nouveau",
    "forme": 6,
    "nomen": "Mew"
  },
  {
    "id": 57,
    "numeropokemon": 151,
    "niveau": "Départ",
    "numeroattaque": 57,
    "nom": "Écras'Face",
    "puissance": "40",
    "precision": "100",
    "pp": 35,
    "numero": 151,
    "nompokemon": "Mew",
    "poids": 4,
    "taille": 0.4,
    "type1": "Psy",
    "couleur": "Rose",
    "espece": "Nouveau",
    "forme": 6,
    "nomen": "Mew"
  },
  ...
]
```

### Insertion d'un pokémon

URL :
```url
POST /pokemons/
```

| Argument        | Type           | Valeur par défaut  |
| ------------- |-------------| ----|
| nom | String | "" |

### Suppression d'un pokémon

URL :
```url
DELETE /pokemons/:id
```

| Argument        | Type           | Valeur par défaut  |
| ------------- |-------------| ----|
| id | Integer | "" |