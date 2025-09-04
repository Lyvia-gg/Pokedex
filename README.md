# ✨ Welcome to the Pokedex ! ✨

Vous cherchez un pokémon ? \
Pas de panique, ce sublime ✨Pokédex✨ est là pour vous sauver ~~la vie~~ (■v■¬)

## 🗃️ Redux

```
│
├── pokemons
    ├── pokemonList     <- La liste des pokemons
    ├── isLoading
    ├── nextPage        <- Le décalage pour l'api
    ├── filter          <- Filtre de recherche
│
├── selectedPokemon  <- Le pokemon séléctionné
    ├── isLoading
    ├── pokedex_id
    ├── pokemon
│
├── filters          <- Tout les filtres de pokeApi
    ├── isLoading
    ├── filterList
│
├── user
    ├── email           <- Email du user, stocké pour la session
```

## 🪜 Architecture

### Auth

Page d'authentification, crée pour fake le concepte d'authentification, car il n'y a absolument aucun token (■-■¬) \
_Chuck norris est l'utilisateur par défaut haha-_

### Main

Page représentant le pokédex dans sa globalité.

`bottomScreen` \
Ecran "tactile" du pokédex, permettant de séléctionné un pokémon, et appliqué de merveilleux filtres ✨ \
(il permet aussi de se "déconnecter" du pokédex, et de le "fermer")

`topScreen`\
Ecran de détails, on y retrouve les informations sur le pokémon séléctionné

## 🔎 Filtres

Plusieurs type de filtre permette a l'utilisateur de trouver son bonheur dans le pokédex

`Name or ID`\
Permet de recherché un pokémon par son nom, où par son id de pokédex

`Forme`\
L'utilisateur à également l'opportunité merveilleuse de pouvoir rechercher un pokémon via sa forme (s'il la connait attention au piège)

`Type`\
Pour finir, et en addition avec les autres filtres, la recherche peut se faire avec le type du pokémon !
