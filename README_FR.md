# Starblast Modding

**Note:** Ceci est la version Github de la Documentation de Starblast, traduite en français par Wolfan.

**ATTENTION: Il est très fortement conseillé de connaitre l'Anglais pour coder, le JavaSCript et le mod éditor étant en Anglais. Faites attention!**


La version officielle, en Anglais, peut être trouvée ici: https://starblastio.gamepedia.com/Modding_Tutorial
<details>
  <summary markdown="span">Contenu</summary>

1.  **[Informations](#informations)**
1.  **[Documentation et Tutoriels](#documentation-et-tutoriels)**
    1.  **[Notes importantes](#notes-importantes)**
    1.  **[Créer votre premier mod](#créer-votre-premier-mod)**
    1.  **[Démarrer et tester votre mod](#démarrer-et-tester-votre-mod)**
        1.  **[Changer la région](#changer-la-région)**
        1.  **[Démarrer le mod](#démarrer-le-mod)**
        1.  **[Tester le mod](#tester-votre-mod)**
        1.  **[TOUJOURS garder l'éditeur de mod dans un onglet actif quand le mod est en train de tourner!](#toujours-garder-léditeur-de-mod-dans-un-onglet-actif-quand-le-mod-est-en-train-de-tourner)**
        1.  **[Arrêter le mod en coursr](#arrêter-le-mod-en-cours)**
        1.  **[Autres commandes du terminal](#autres-commandes-du-terminal)**
            1.  **[echo](#echo)**
            1.  **[clear](#clear)**
            1.  **[help](#help)**
    1.  **[Parties du code principal](#parties-du-code-principal)**
        1.  **[Options](#options)**
            1.  **[Définition](#définition)**
            1.  **[Vaisseaux customisés et arbre de vaiseaux customisés ](#vaisseaux-customisés-et-arbre-de-vaisseaux-customisés)**
            1.  **[Customiser le chat d'émojis](#customiser-le-chat-d-émojis)**
            1.  **[Carte d'astéroïdes customisée](#carte-d-astéroïdes-customisée)**
            1.  **[Options spécifiques du mode survie](#options-spécifiques-du-mode-survie)**
            1.  **[Spécifiques options pour le mode équipe](#options-spécifiques-pour-le-mod-équipe)**
            1.  **[Options spécifiques du Deathmatch Pro](#options-spécifiques-du-deathmatch-pro)**
        1.  **[Ticking](#ticking)**
            1.  **[Définition](#définition-1)**
        1.  **[Evènements](#évènements)**
            1.  **[Général](#général)**
            1.  **[Evènements dosponibles](#évènements-disponibles)**
    1.  **[Game step](#game-step)**
        1.  **[Définition](#définition-2)**
        1.  **[Unité](#unité)**
        1.  **[Utilisation](#utilisation)**
    1. **[Vaisseaux](#vaisseaux)**
        1.  **[Appeller l'instructeur](#champs-disponibles)**
        1.  **[Configuration](#configuration)**
        1.  **[Instructeur](#instructeur)**
            1.  **[Appeller l'instructeur](#appeller-l-instructeur)**
            1.  **[Charactères disponibles](#charcatères-disponibles)**
        1.  **[Composants UI personnalisés](#composants-ui-personnalisés)**
            1.  **[Général](#général-1)**
            1.  **[Options acceptées pour les sous-composantss](#soptions-acceptées-pour-les-sous-composants)**
            1.  **[Combiner avec des évènements](#ccombiner-avec-des-évènements)**
            1.  **[Customiser le radar et le tableau des scores](#customiser-le-radar-et-le-tableau-des-scores)**
            1.  **[UI Globale](#ui-globale)**
        1.  **[Autres méthodes et instances](#autres-méthodes-et-instances)**
            1.  **[Supprimer toutes les armes secondaires du cargo d'un vaisseau](#rsupprimer-toutes-les-armes-secondaires-du-cargo-d-un-vaisseau)**
    1.  **[Extraterrestres](#extraterrestres)**
        1.  **[Création](#création)**
        1.  **[Configuration](#configuration-1)**
    1.  **[Armes secondaires](#armes-secondaires)**
        1.  **[Création](#création-1)**
        1.  **[Accès](#accès)**
    1.  **[Astéroïdes](#astéroïdes)**
        1.  **[Création](#création-2)**
        1.  **[Configuration](#configuration-2)**
    1.  **[Ajouter des objets en 3D dans l'arrière plan/le premier plan](#ajouter-des-objets-en-3D-dans-l-arrière-planle-premier-plan)**
        1.  **[Object type options](#object-type-options)**
        1.  **[Options de l'objet](#options-de-l-objet)**
        1.  **[Accès](#accès-1)**
        1.  **[Changer ou faire bouger un objet](#changer-ou-faire-bouger-un-objet)**
        1.  **[Supprimer un objet](#supprimer-un-objet)**
        1.  **[Exemple](#exemple)**
    1.  **[Les options détaillés de la partie](#reading-games-detailed-options)**
        1.  **[Accès](#accès-2)**
        1.  **[Champs accessibles](#champs-accessibles-1)**
        1.  **[Champs accesibles dans le mode équipe](#champs-accessibles-dans-le-mode-équipe)**
    1.  **[Assigner des propriétés personalisées à des entités/objets](#assigner-des-prpriétés-personalisées-à-des-entitésobjets)**
        1.  **[Accéder et assigner](#accéder-et-assigner)**
        1.  **[Entités/Objets supportés](#entitésobjets-supportés)**
        1.  **[Exemples](#exemples-1)**
    1.  **[Autres instances de jeu et méthodes](#autres-instances-de-jeu-et-méthodes)**
        1.  **[Mettre une carte customisée en jeu](#mettre-une-carte-customisée-en-jeu)**
        1.  **[Fermer/ouvrir le mod à la vue des nouveaux joueurs](#fermerouvrir-le-mod-à-la-vue-des-nouveaux-joueurs)**
    1.  **[Problèmes communs et comment les fixer](#problèmes-communs-et-comment-les-fixer)**
        1.  **[Problème de l'écran noir](#problème-de-l-écran-noir)**
        1.  **[Mon mod s'est arrêté accidentellement mais la partie ne s'est pas arrêtée](#mond-mod-s-est-arrêté-accidentelement-mais-la-partie-ne-s-est-pas-arrêtée)**
1.  **[Ressources de la communauté](#ressources-de-la-communauté)**
    1.  **[Tutoriels et documentation](#tutoriels-et-documentation)**
    1.  **[Outlis](#outils)**
    1.  **[Ressources de codes](#ressources-de-codes)**
</details>

## Informations
![Standard Modding Interface, vous pouvez voir la petite carte du mod à la droite quand le mod est en train de tourner](https://raw.githubusercontent.com/Bhpsngum/img-src/master/ModdingInterface.png)

*Standard Modding Interface, vous pouvez voir la petite carte du mod à la droite quand le mod est en train de tourner*

L'interface de l'éditeur de mod peut être trouvé ici: https://starblast.io/modding.html ([ECP](https://starblastio.gamepedia.com/Elite_Commander_Pass) requis)

L'éditeur de Mod Starblast vous permet de créer des mods customisées pour Starblast? Cette intérface est en fait un éditeur de code dans un onglet de votre navigateur à la gauche, et une console à la droite. L'éditeur de code est l'endroit où vous devez écrire le code JavaScript pour votre mod. La console est l'endroit où vous écrivez des commandes pour démarrer votre mod, l'arrêter ou intéragir avec quand le mod est en train de tourner.

Le langage de programmation utilisé pour l'éditeur de mod est le [JavaScript (ECMAScript)](https://www.w3schools.com/js/DEFAULT.asp)

## Documentation et Tutoriels
### Notes Importantes
Dans les nouvelles versions des mises à jours des navigateurs, vous ne pouvez pas utiliser l'éditeur de mod dans un onglet de navigation privée car des caractéristiques de l'éditeur ne sont pas disponibles dans ce type d'onglets.

Et faites en sorte de lire ce qui va suivre du début à la fin pour ne rien rater!

### Créer votre premier mod
Dans votre éditeur de mod, tapez ceci pour votre premier mod:
```js
this.options = {
  root_mode: "survival",
  map_size: 30
};

this.tick = function(game) {
};
```

### Démarrer et tester votre mod
#### Changer la région
Lorsque votre mod est prêt, commencez par choisir votre région préférée dans la console en tapant `region <region name>`. Par exemple avec l'Europe:
```
> region Europe
Region set to Europe
> █
```
(Pour l'instant, le modding est disponible dans seulement trois zones: l'Eruope, l'Amérique et l'Asie)
#### Démarrer le mod
Ensuite, pour démarrer votre mod, tapez `start`:
```
> start
Mod started
https://starblast.io#1234@12.34.56.78:2000
Use 'test' to open game frame for testing
> █
```
#### Tester votre mod
Comme dit par la console, vous voudrez sûrement ouvrir une nouvelle fenêtre pour rejoindre votre partie moddée. Ecrivez `test`:
```
> test
> █
```
#### TOUJOURS garder l'éditeur de mod dans un onglet actif quand le mod est en train de tourner!
C'est uen des choses les plus importants dont vous devez vous souvenir.

Pourquoi? C'est parce que c'est comme ça que les navigateurs fonctionnent.

Votre navigateur va commander à ralentir tous les scripts de JavaScript qui sont dans les onglets inactifs afin de réduire le processus de votre GPU.

Pour certains modes comme le Battle Royale, ça ne fait rien car c'est seulement des vaisseaux et des options.

mais pour les autres mods où il y a de la logique dans les fonctions tick ou les évènements - cela va beaucoup les affecter!

Les ticks vont commancer à marcher de moins en moins vite...

Bientôt, tout lagera dans la partie, comme toutes les réactions sur les bouttons, la logique du code qui fait apparaitre quelque chose, etc.

Et....cela dépend de la complexité du mod mais cela peut faire crasher le mod en entier - localement, le serveur continuera à marcher, la partie aussie, mais le code actual ne fonctionnera plus et n'impactera plus la partie.

Donc, gardez toujours votre éditeur de mod dans un onglet en ligne ou des choses inprédictibles se passeront!

Ausi, vous devez avoir une connexion internet stable si vous ne voulez pas que votre mod subisse des lags.

#### Arrêtez le mod en cours
Vous pouvez arrêter le mod quand vous voulez en utilisant la commande `stop`. Ceci va déconnecter tous les joueurs et détruire les données existantes de cette partie.
```
> stop
Mod stopped
> █
```
#### Autres commandes du terminal
##### `echo`
Envoie n'importe quelle valeur dans le terminal, peut être utilisé dans le code du mod ou bien dans le terminal.

Syntaxe: `echo(<item>)`
```
> echo("Message from terminal!")
Message from terminal!
> █
```
##### `clear`
Enlève tous les messages du terminal. Ne marche que dans le terminal.

Syntaxe: `clear`
##### `help`
Fait appraraitre le message d'aide dans le terminal. Ne marche que dans le terminal.

Syntaxe: `help`

### Parties du code principales
#### Options
##### Définition
`this.options` est une donnée structurée où vous pouvez mettre en place des optons pour votre partie customisée, moddée. Ces options sont utilisées pour initialiser la partie quand vous démarrer votre mod. Les changer quand le mod est encore en train de tourner n'affectera pas la partie.

##### Custom ships and custom tree
Vous pouvez importer des vaisseaux faits dans l'éditeur de vaisseaux de Starblast. Dans cet éditeur, cliquez sur "mod export" pour exporter votre vaisseau sous un code JavaScript afin de l'utiliser dans l'éditeur de mode.
Ensuite, copiez le et collez le dans l'éditeur de mod et ajoutez ceci:

```js
var myship_101 = "{ … … <le code de votre vaisseau exporté> …";

var ships = [myship_101]; // ajouter votre vaisseau dans un array de vaisseaux
this.options = {
  root_mode: "survival",
  ships: ships,         // ceci vous permet de spécifier les vaisseaux utiliser et remplace les vaisseaux actuels
  reset_tree: true,     // mettez sur true si vous voulez supprimer tous les vaisseaux vanilla, ou false si vous voulez les garder
  map_size: 30
};

this.tick = function(game) {
};
```
Ensuite, lancer votre mod. Si votre vaisseau est mis sur level=1, model=1, votre vaissea replacera le Flt. Vous pouvez replacer d'autres vaisseaux de l'arbre de la même manière, en utilisant `reset_tree:false`. Ou vous pouvez supprimer l'arbre de navire original et en créant un nouveau en utilisant `reset_tree:true`.

##### Customiser le chat d'émojis
Le vocabulaire utilisé pour le système de chat par émote peut être customisé en mettant le champ `vocabulary` dans les options du jeu, comme suivant:

```js
var vocabulary = [
      { text: "Hello", icon:"\u0045", key:"O" },
      { text: "Bye", icon:"\u0046", key:"B" },
      { text: "Yes", icon:"\u004c", key:"Y" },
      { text: "No", icon:"\u004d", key:"N" },

      { text: "Flower", icon:"\u{1F33B}", key:"F" },
      { text: "Snowman", icon:"\u26c4", key:"M" },
      { text: "Shark", icon:"\u{1F988}", key:"S" },
      { text: "Ghost", icon:"\u{1F47B}", key:"G" }
    ] ;

this.options = {
  vocabulary: vocabulary,
  // ...
};
```
Cela vous permet d'utiliser le système de construction d'icones, qui sont listées ici: https://starblast.io/glyphs.html

Vous pouvez aussi utiliser des icones unicodes, voici une bonne source de référence: https://unicode.org/emoji/charts/full-emoji-list.html

Notez que les charactères unicodes larges (2bytes+) requierent une syntaxe JavaScript comme indiquée dans l'exemple ci-dessus (exemple: `\u{1F47B}`)

##### Carte d'astéroïdes customisée
Vous pouvez créer unen carte customisée d'astéroïdes. Cela vous permet de créer un labyrinthe par exemple. Cette carte customisée est en fait une chaine charactère de JavaScript qui "peint" la carte.

Par exemple:
```js
var map =
"999999999999999999999999999999\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"99                          99\n"+
"999999999999999999999999999999" ;


this.options = {
  custom_map: map,
  map_size: 30
}
```

Dans l'exemple ci-dessus, 9 donne la taille la plus grande des astéroîdes.  Vous pouvez utiliserdes valeurs plus petites pour ajouter des astéroïdes plus petits. TOutes les valeurs différentes d'un nombre entier seront interprétées comme aucun astéroïde. Si vous mettez l'option `map_size` à 30, faites attentions à créer 30 lignes et 30 colonnes, ou sinon, vous obtiendrez des résultats `[REDACTED]`.

**Note:** Utilisez `""` pour une carte sans astéroïdes.

Vous pouvez utiliser le [Online Map Editor](https://bhpsngum.github.io/starblast/mapeditor/) (a community tool) pour créer, éditer ou exporter des cartes.

##### Autres options communes
La plupart des options viennent des parties personnalisées normales. Quelques options en plus ont été ajoutées, spécifiquement pour le modding (au début de la liste):
| Option | Description | Valeur par défaut<br>(si omis) |
| - | - | - |
| root_mode | Le type de mode: "survival", "team", "invasion", "deathmatch", "battleroyale" (ou non-spécifié (`" "`)) | Unspecified |
| reset_tree | Mettre sur `true` pour supprimer les vaisseaux vanilla déjà existant | false |
| ships | Un array de vaisseaux à ajouter pour avoir un arbre de vaisseau personnalisé | None |
| map_size | Taille de la carte, entre 20 et 200 | 100 (survie)<br>80 (équipe and Battle Royale)<br>60 (non-spécifié)<br>30 (Invasion)<br>20 (deathmatch) |
| soundtrack |"procedurality.mp3", "argon.mp3", "crystals.mp3", "red_mist.mp3, "civilisation.mp3" ou "warp_drive.mp3" | None |
| max_players | De 1 à 240 | 70 (équipe)<br>60 (survival)<br>40 (non-spécifié)<br>30 (Battle Royale)<br>20 (deathmatch)<br>6 (invasion) |
| crystal_value | Nombre de gemmes lâchées par un astéroîde, de 0 à 10 | 2 (autres)<br>0 (deathmatch and Battle Royale)<br>1 (autres) |
| lives | Nombres de vie, de 1 à 5 | 4 (autres)<br>1 (deathmatch and Battle Royale)<br> 3 (autres) |
| max_level | Le niveau maximal que vous pouvez atteindre, de 1 à 7 | 7 |
| friendly_colors | Permet de définir le nombre déquipe (ou 0) | 3 (team)<br>1 (invasion)<br>0 (autres) |
| map_name | Nom de la carte | Auto-generated name |
| survival_level | Niveau qui va activer le survival mode (8 pour aucune activation) | 7 (survival)<br>8 (autres) |
| starting_ship | Mettre le vaisseau voulu lorsqu'un joueur rejoint la partie, il apparaitra dans ce vaisseau: 101, 201, 404, etc. | 101 |
| starting_ship_maxed | true ou false | false |
| asteroids_strength | 0 à 10 | 5 (deathmatch)<br>0.5 (Battle Royale)<br>1 (autres) |
| friction_ratio | 0 à 2 | 1 |
| strafe | facteur de vitesse de mitraillage, un entier de 0 à 1| 0 |
| speed_mod | 0 ou 2 | 1.25 (deathmatch)<br>1.2 (survie et équipe)<br>1 (autres) |
| rcs_toggle | true ou false | true |
| map_id | Nombre entre [0-9999] | Game id |
| map_density | Densité de la carte | None |
| weapon_drop | 0 à 1 (probabilité qu'un astéroîde donne une arme secondaire) | 0 |
| crystal_drop | Pourcentage de gemmes collectées quand ûn vaisseau lâche des gemmes | 0.5 (deathmatch)<br>1 (autres) |
| release_crystal | true/false pour autoriser/empêcher `[V]` de donner des gemmes | true (équipe)<br>false (autres) |
| mines_self_destroy | true ou false | true |
| mines_destroy_delay | Toutes les mines seront détruites dans cette intervalle si un joueur ne les a pas déjà détruite (en [ticks](#unit)) | 3600 (Battle Royale)<br>18000 (autres) |
| healing_enabled | true ou false | true (équipe)<br>false(autres) |
| healing_ratio | 0 à 2 | 1 |
| shield_regen_factor | 0 à 2 | 1 |
| power_regen_factor | 0 à 2 | 1 |
| weapons_store | Mettez sur `false` si vous souhaitez qu'il n'y ait pas de magasin à armes secondaires | true |
| radar_zoom | Mettez la valeur sur 1,2 ou 4 | 2 |
| auto_refill | Quand mis sur `true`, les recharges de bouclier et de générateur seront automatiquement utilisées, et le joueur n'aura pas à presser "ALT" pour les utiliser| false |
| projectile_speed | Affects the speed of rockets, missiles and torpedoes; use 1 for default speed | 1 |
| choose_ship | exemple, mit sur `[301,302,303]` fera en sorte que les joueurs choisissent un vaisseau entre ces trois vaisseaux en entrant dans la partie | None |
| collider | active/désactive (true/false) les collisions des vaisseaux avec quoi que ce soit | true |


##### Options spécifiques du mode survie
| Option | Description | Valeur par défaut<br>(si omis) |
| - | - | - |
| survival_time | Le nombre de minutes avant le déclanchement du mode survie | 60 |


##### Spécifiques options pour le mode équipe
| Option | Description | Valeur par défaut<br>(si omis) |
| - | - | - |
| hues | Array pour le nombre de couleurs par équipe, avec le même nombre d'éléments que dans `friendly_colors` | Auto-generated hues |
| station_regeneration | Régénération de la station | 1 |
| station_size | Grandeur des stations, allant de 1 à 5 | 2 |
| station_crystal_capacity | Capacité de la station en terme de cristaux (cristaux utiles pour débloquer de nouveaux vaisseaux), pour un chiffre entre [0.1,10] | 1 |
| station_repair_threshold | Le nombre de gemmes demandées pour réparer un module. Entre [0,1] | 0.25 |
| auto_assign_teams | Empêcher les joueurs de choisir l'équipe qu'ils vont rejoindre (true) ou les laissez choisir (false) | false |

##### Options spécifiques du Deathmatch Pro
| Option | Description | Valeur par défaut<br>(si omis) |
| - | - | - |
| ship_groups | Un array contenant d'autres arrays, et chacun d'eux représente un groupe de vaisseaux (par nom) disponible pour la sélection.<br>Voir l'exemple ci-dessous<br>Le plus lond est un array, la plus petite chance pour chaque groupe de vaisseaux d'être disponible dans un seul match.
 | Voir [Deathmatch](https://starblastio.gamepedia.com/Deathmatch) pour une liste de vaisseaux par défaut<br>**Note:** Le mod ne va pas fonctionner si `reset_tree`n'est pas mis sur `true` |
Exemple:
```js
ship_groups: [
  ["U-Sniper","Howler"],
  ["Crusader","Pioneer"]
]
```
#### Ticking
##### Définition
Trouvé dans `this.tick`, c'est une fonction de JavaScrit qui est appellée 60 fois par seconde. Dans cette fonction, vous pourrez coder des actions spécifiques dont votre mod va prendre (effectuer) quand la partie est en cours. Cette fonction peut être modifiée quand une partie moddée est en cours et les changements s'appliqueront automatiquement.

#### Evènements
##### Général
Votre mod peut recevoire des évènements par la fonction `this.event`:
```js
this.event = function(event,game) {
  switch (event.name)
  {
    case "ship_spawned":
      if (event.ship != null)
      {
        shipJustSpawned(event.ship) ;
      }
      break ;
  }
} ;
```

##### 2vènement disponibles
| Nom de l'évènement | Description | Champs d'évènements additionnels |
| - | - | - |
| ship_spawned | Un vaisseau vient d'apparaitre/de réapparaitre | event.ship |
| ship_destroyed | Un vaisseau vient de se faire détruire | event.ship, event.killer |
| alien_destroyed | Un extraterrestre vient d'être tué | event.alien, event.killer |
| asteroid_destroyed | Un astéroïde vient d'être détruit | event.asteroid, event.killer |
| collectible_picked | Un vaisseau a pris une arme secondaire | event.collectible, event.ship |
### Game step
#### Définition
Peut être accessible par `game.step`, c'est un nombre entier montrant la durée du jeu.

#### Unité
L'unité de cette valeur est le tick, où 1 tick = 1/60 secondes

Ce qui veut dire que 60 ticks = 1 seconde, 120 ticks = 2 secondes et etc.

#### Utilisation
Ce code va faire en sorte que le premier vaisseau de la liste soit téléporté au centre de la carte à la première minute depuis que le mod a démarré et remet à 0 ses cristaux (on assume que il y a un vaisseau qui reste au début du mod):
```js
this.tick = function (game)
{
  if (game.step == 3600) { // 1 minute = 60 seconds * 60
    game.ships[0].set({x:0,y:0}); // Center teleport
  }
  if (game.step % 300 === 0) { // 5 seconds * 60
    game.ships[0].set({crystals: 0}); // Reset crystals
  }
}
```

### Vaisseaux
Vous pouvez accéder à la liste des vaisseaux par l'array `game.ships`

Vous pouvez aussi trouver un vaisseau avec une id spécifique en utiliant `game.findShip(id)`, qui va renvoyer l'object représentant le vaisseau demandé, ou `null` s'il n'y a aucun vaisseau avec l'id demandée.


#### Champs accessibles
Voici les différents champs et options auxquels vous pouvez accéder pour les vaisseaux:
| Champ | Description |
| - | - |
| x | coordonnée X  |
| y | coordonnée Y  |
| vx | Vitesse du vaisseau vers une coordonnée X |
| vy | Vitesse du vaisseau vers une coordonnée Y|
| r | Rotation du vaisseau |
| name | Nom du joueur |
| alive | Si le vaisseau est en vie ou non |
| type |Le tier et le modèle du vaisseau, combiné en un seul nombre (e.g. 101) |
| stats | Statistiques du vaisseau actuelles, compillé en un seul nombre.<br>Par exemple: 10012301 veut dire que  8 statistiques ont été améliorées: 1,0,0,1,2,3,0 et 1 |
| idle | Dit si le ship est en idle mode ou non |
| team |L'id de l'équipe dans laquelle est le vaisseau |
| score | Score du joueur |
| shield | Valeur du bouclier actuel |
| generator | Valeur du générateur actuelle |
| crystals | Nombre de cristaux actuels |
| healing | Si les lasers du vaisseau sont en mode soigneur ou non |

#### Configuration
Vous pouvez mettre en place différentes options sur les vaisseaux. Par exemple:
```
> game.ships[0].set({x:0,y:0});
> █
```
Ceci va faire bouger le premier vaisseau de la liste au centre de la carte.

Liste des options acceptées lorsque `ship.set` est utilisé:
| Option | Description |  Réponse du serveur si erreur<br>(if improper) |
| - | - | - |
| x | Coordonnée X | Wrong coordinate |
| y | Coordonnée Y | Wrong coordinate |
| vx | Vitesse du vaisseau dans une direction X | Wrong coordinate |
| vy | Vitesse du vaisseau dans une direction Y | Wrong coordinate |
| invulnerable | Rend le vaisseau invulnérable pour X ticks (exemple: 60 ticks pour unen seconde d'invulnérabilité) | Wrong invulnerable time |
| type | Change le type du vaisseau (utiliser le code du vaisseau, exemple: `{type:403}` ) | None |
| angle | Change la direction dans laquelle le vaisseau regarde | Wrong angle |
| score | Met en place le score du vaisseau | Wrong score |
| idle | Met `true` pour faire en sorte que le vaisseau soit en mode idle (inactif) (et false pour inverser) | None |
| shield | Met en place la valeur du bouclier | Wrong shield value |
| generator | Met en place la valeur du générateur | Wrong generator value |
| healing | Met les lasers du vaisseau sur le status de soignant (true ou false) | None |
| crystals | Donner un certain montant de crystaux au vaisseau | Wrong crystals |
| stats | Met en place les statistiques d'un vaisseau | None |
| kill | Mettre `kill: (any "truthy" value, ex: true)` pour détruire le vaisseau | No violation |
| team | Change l'équipe du vaisseau (entre [0-X] où X est le nombre d'équipes - 1) | None |
| hue | Donne une certain couleur d'un vaisseau (entre [0-359])![Hue map](https://i.stack.imgur.com/YOBFy.png) | None |

#### Intermission
Vous pouvez envoyer à un vaisseau une "entracte", qui est un écran avec des résultats, et permettant de réapparaitre. Cet écran vous permet de donner des informations personnalisées:
```
> game.ships[0].intermission({"Best Achievement":"Managed to run the mod","Score":1234});
> █
```
#### Faire apparaitre et customiser la fenêtre de Game Over pour le vaisseau
Vous pouvez aussi faire en sorte qu'un vaisseau ait un écran Game Over. Ici encore, vous pouvez transmettre des informations qui seront transmises au joueur:
```
> game.ships[0].gameover({"Rating":"Can do better","Score":1234});
> █
```
#### Instructeur
##### Appeller l'instructeur
Vous pouvez avoir un instructeur qui va evoyer des informations au joueur. POur cela, trouvez le vaisseau du joueur et utilisez:
```
> ship.instructorSays("Hello!")
> █
```
Vous pouvez cacher la fenêtre de l'instructeur en utilisant:
```
> ship.hideInstructor()
> █
```
Vous pouvez le montrer plus tard avec:
```
> ship.showInstructor()
> █
```
Un paramètre optionel vous permet de choisir quel instructeur va parler au joueur. Exemple:
```
> ship.instructorSays("Here is your report, Commander","Maria")
> █
```
##### Charactères disponibles
|Lucina|Klaus|Maria|Kan|Zoltar|
|-|-|-|-|-|
|![Lucina](https://starblast.data.neuronality.com/img/tutorial-survival.png)|![Klaus](https://starblast.data.neuronality.com/img/tutorial-battleroyale.png)|![Maria](https://starblast.data.neuronality.com/img/tutorial-team.png)|![Kan](https://starblast.data.neuronality.com/img/tutorial-invasion.png)|![Zoltar](https://starblast.data.neuronality.com/img/tutorial-deathmatch.png)|

#### Composants UI personnalisés
##### Général
Votre mod peut créer des composants personnalisés qui vont appraitre sur l'écran du joueur. C'est montré par la commabde `ship.setUIComponent` sur le vaisseau, passant à un descripteur de composant.

Par exemple:
```
> ship.setUIComponent({
    id:"myid",
    position:[0,0,25,25],
    clickable: true,
    shortcut: "X",
    visible: true,
    components: [
      { type:"box",position:[0,0,100,100],fill:"#456",stroke:"#CDE",width:2},
      { type: "text",position: [0,0,100,50],color: "#FFF",value: "My Text"},
      { type: "player",id: 1, position: [0,0,50,50],color: "#FFF"},
    ]
  })
> █
```
Voici la liste des options acceptées pour les composants:
| Option | Description | Valeur par défaut<br>(si omit) |
| - | - | - |
| id | Un identifiant unique pour le composant| None |
| position | Exprimé en pourcentage de l'écran de jeu, la position du composant [x,y,width,height]. Exemple: [45,45,10,10] créer un composant en plein milieu de l'écran, où la largeur et la hauteur sont 10% de l'écran largeur et hauteur.   | None |
| visible | Si le composant est visible ou non. Renvoyer la même donnée avec `visible` mit sur`false` pour cacher le composant | true |
| clickable | Si le composant peut être cliqué ou non | false |
| shortcut | Quand le composant est cliqué, une touche du clavier peut reproduire le clic | None |
| components | Donne une liste (array) caractéristiques graphiques pour mettre des éléments dans le composant. Décrit ci-dessous| Empty array |

##### Options acceptées pour les sous-composants
| Option | Description | Value par défaut (si omis) |
| - | - | - |
| type | Type de sous-composants<br>possibilités: "round" (rond), "text"(texte), "box" (cube, rectangle) or "player" | None |
| id ("player" type only) | ce paramètre va montrer le badge et le pseudo du joueur associé à l'id | None |
| position | position des sous-composants, de cette manière: `[x,y,width,height]`<br>Ces sous-composants sont dépendants de la position du composant principal| None |
| value | Valeur du sous-composants, exemple: `value:"Sample text"` | Empty string |
| color | Couleur du texte des sous-composants, ce peut être avec plusieurs types de couleurs (hex, hsla, rgb, etc.), e.g `"#fff"` | None |
| fill | Couleur de fond du sous-composant, même format que la propriété `color` | None |
| width | Largeur de la bordure du sous-composants (in percent) | 0 |
| stroke | Couleur de la bordure du sous-composant, même format que la propriété `color` | None |
| align | Alignement du texte dans le sous-composant<br>"left" (gauche), "right" (droite) ou "center" (centre) seulement | `"center"` |

##### Combiner avec des évènements
L'exemple ci-dessous créer un bouton pour tous les joueurs, qui peut être cliqué et fait en sorte que le vaisseau qui clique sur ce boutton soit téléporter dans un endroit aléatoire de la carte, et lui ajout 3 secondes d'invulnérabilité:

Exemple entier: https://github.com/pmgl/starblast-modding/blob/master/examples/warp_button.js
```js
var warp_button = {
  id: "warp",
  position: [2,50,8,14],
  clickable: true,
  shortcut: "W",
  visible: true,
  components: [
    { type:"round",position:[0,0,100,100],fill:"#456",stroke:"#CDE",width:2},
    { type: "text",position:[10,35,80,30],value:"WARP",color:"#CDE"},
    { type: "text",position:[20,70,60,20],value:"[W]",color:"#CDE"}
    ]
};

var warpShip = function(ship) {
  x = (Math.random()-.5) * ship.game.options.map_size*10 ;
  y = (Math.random()-.5) * ship.game.options.map_size*10 ;
  ship.set({x:x,y:y,vx:0,vy:0,invulnerable:180}) ;
} ;

this.tick = function(game) {
  if (game.step%60==0) // ensure this is done only once per second
  {
    for (var i=0;i<game.ships.length;i++)
    {
      var ship = game.ships[i] ;
      if (!ship.custom.warp_button_installed)
      {
        ship.custom.warp_button_installed = true;
        ship.setUIComponent(warp_button);
      }
    }
  }
} ;

this.event = function(event,game) {
  switch (event.name)
  {
    case "ui_component_clicked":
      var ship = event.ship ;
      var component = event.id ;
      if (component == "warp") // check that this is our component "warp"
      {
        warpShip(ship);
      }
      break ;
  }
} ;
```

##### Customiser le radar et le tableau des scores
Le tableau des scores peut être replacé par votre propre tableau. Quand un composant de l'UI a une id nomée `"scoreboard"` ou `"radar_background"` est créé, vous devrez mettre à jour le tableau des scores/radar. Votre composant du tableau des scores/radar customisé n'a pas a avoir de `position` car il remplira automatiquement la zone qui lui est réservée pour le composant de l'UI.

##### UI Globale
Vous pouvez utiliser `game.setUIComponent({ options })` pour mettre en place une UI (boutton, message, etc) pour tous les vaisseaux en jeu.

#### Autres méthodes et instances
##### Supprimer toutes les armes secondaires du cargo d'un vaisseau
Syntaxe: `ship.emptyWeapons()`

### Extraterrestres
Vous pouvez accéder à la liste des extraterrestres par le array `game.aliens`

Vous pouvez aussi trouver un extraterrestre avec une id spécifique en utiliant `game.findAlien(id)`, qui va renvoyer l'object représentant l'extraterrestre demandé, ou `null` s'il n'y a aucun extraterrestre avec l'id demandée.

#### Création
Pour créer un extraterrestre, utilisez `game.addAlien({ options })`
Listes des options acceptées:

(Note: Le serveur va répondre par `Incorrect data` si au moins une de ces valeurs est fausse)
| Option | Description | Valeur par défaut (si omis) |
| - | - | - |
| x | Coordonnées X | 0 |
| y | Coordonnées Y | 0 |
| vx | Vitesse dans une direction X | 0 |
| vy | Vitesse dans une direction Y | 0 |
| code | Type d'extraterrestre, le nombre doit être entre [10-20] | 10 |
| level | Niveau d'un extraterrestre, entre [0-X] où X dépend du type d'extraterrestre | 0 |
| points | Le nombre de points que va donner l'extraterrestre une fois tué | None |
| crystal_drop | Le nombre de cristaux que va lâcher l'extraterrestre une fois tué | None |
| weapon_drop | Le code d'une arme secondaire qui peut être lâchée par un extraterrestre quand il est tué | None |

Voici la liste des codes d'extratrrestres (eliens) disponibles:
| Code | Nom de l'extraterrestre |
| - | - |
| 10 | Chicken |
| 11 | Crab |
| 12 | Fortress |
| 13 | Alien bizarre |
| 14 | Candlestick |
| 15 | Hirsute |
| 16 | Piranha |
| 17 | Pointu |
| 18 | Fork |
| 19 | Saucer |
| 20 | Final Boss |

Un nouvel object `Alien`est immédiatement ajouter à `game.aliens` ; cependant, il ne peut pas être utilisé avant que le serveur ait assigné une id (nombre positif) à cet extraterrestre.
#### Configuration
Une fois que le premier extraterrestre (alien) est en vie et qu'il a une id assignée, vous pouvez le modifier avec des options. Par exemple:
```
> game.aliens[0].set({x:0,y:0});
> █
```
Cela va faire bouger le premier extraterrestre de la liste au centre de la carte.

Accepted options when using `alien.set`:
| Option | Description |  Réponse du serveur si erreur<br>(if improper) |
| - | - | - |
| x | Coordonnées X | Wrong coordinate |
| y | Coordonnées Y | Wrong coordinate |
| vx | Vitesse dans une direction X | Wrong coordinate |
| vy | Vitesse dans une direction Y | Wrong coordinate |
| shield | Bouclier | Wrong shield value |
| regen | Régénration du bouclier | Wrong regen value |
| damage | Laser damage | Wrong damage value |
| laser_speed | Rapidité du laser | Wrong damage value |
| rate | Nombre de tirs par seconde | Wrong rate value |
| kill | Utilisez `kill: (any "truthy" value, e.g: true)` pour détruire une extraterrestre (alien) | No violation |

### Armes secondaires
Vous pouvez faire apparaitre des armes secondaires dans le champ de jeu.

Vous pouvez aussi trouver une arme secondaire avec une id spécifique en utiliant `game.findCollectible(id)`, qui va renvoyer l'object représentant l'arme secondaire demandée, ou `null` s'il n'y a aucune arme secondaire avec l'id demandée.

#### Création
Voici un exemple:
```
> game.addCollectible({code:10,x:0,y:0});
> █
```
Cela va ajouter une nouvelle arme secondaire (1 pack de 4 rockettes) aux coordonnées (0;0)

Voici la liste des codes d'armes secondaires disponibles:

(Note: Le serveur va répondre par `Incorrect data` si au moins une de ces valeurs est fausse)
| Code | Description |
| - | - |
| 10 | 1 pack de 4 rockettes |
| 11 | Un pack de deux missiles |
| 12 | 1 torpille |
| 20 | Un pack de 8 mines légères |
| 21 | Un pack de 4 mines lourdes|
| 40 | Pod de minage |
| 41 | Pod d'attacque |
| 42 | Pod de défense |
| 90 | Recharge de l'énergie (barre jaune)|
| 91 | Recharge du bouclier |

#### Accès
Vous pouvez voir les armes secondaires toujours disponibles à collecter dans le champ de jeu en utilisant: `game.collectibles`.

### Astéroïdes
Vous pouvez accéder à la liste des astéroïdes qui bougent par le array `game.asteroids`.

Vous pouvez aussi trouver un astéroïde avec une id spécifique en utilisant `game.findAsteroid(id)`, ce qui va renvoyer un object qui représente l'astéroîde voulut, ou `null` si il n'y a pas d'astéroïdes avec l'id donnée.

#### Création
Pour créer un astéroïde, utilisez `game.addAsteroid({ options })`.

Voici la liste des options acceptées:

(Note: Le serveur va répondre par `Incorrect data` si au moins une de ces valeurs est fausse)
| Option | Description | Valeur par défaut<br>(Si omis) |
| - | - | - |
| x | Coordonnée X | 0 |
| y | Coordonnée Y | 0 |
| vx | Vitesse de l'astéroïde dans une direction X | 0 |
| vy | Vitesse de l'astéroïde dans une direction Y | 0 |
| size | La taille de l'astéroide, pour un nombre entre [1-100] | 30 |

Un nouvel `Asteroid` est un objet qui est immédiatement ajouté à `game.asteroids` ; cependant, il ne peut pas être utilisé sans qu'une id ne lui ait été assignée (nombre positif) par le serveur.

#### Configuration
Une fois qu'un astéroïde est "en vie" et qu'il détient une id qui lui est assignée, vous pouvez lui apporter des modifications. Par exemple:
```
> game.asteroids[0].set({x:0,y:0});
> █
```
Ceci va faire bouger le premier astéroïde de la liste des astéroïdes et va l'emmener au centre de la carte.

Listes des options acceptées lorsque `asteroid.set` est utilisé:
| Option | Description | Réponse du serveur si erreur<br>(if improper) |
| - | - | - |
| x | coordonnée X  | Wrong coordinate |
| y | coordonnée Y  | Wrong coordinate |
| vx | Composante X du vecteur vitesse | Wrong coordinate |
| vy | Composante Y du vecteur vitesse | Wrong coordinate |
| size |La taille d'un astéroîdes, entre [1-100]<br>(notez que changer la taille d'un astéroïde lui permet de "régénérer" sa vie) | Incorrect size |
| kill | Utilisez `kill: (any "truthy" value, e.g: true)` Pour détruire un astéroide | No violation |

### Ajouter des objets en 3D dans l'arrière plan/le premier plan
Votre mod peut créer des objets 3D customisées, avec des textures, et les ajouter à l'arrière plan/premier plan, en utilisant `game.setObject`. Ces objets n'ont pas de masse physique pour le moment (la masse physique est planifiée pour un futur proche).

Par exemple:
```js
var cube = {
  id: "cube",
  obj: "https://raw.githubusercontent.com/pmgl/starblast-modding/master/objects/cube/cube.obj",
  diffuse: "https://raw.githubusercontent.com/pmgl/starblast-modding/master/objects/cube/diffuse.jpg"
} ;

game.setObject({
  id: "cube",
  type: cube,
  position: {x:0,y:0,z:0},
  rotation: {x:0,y:0,z:0},
  scale: {x:1,y:1,z:1}
}) ;
```

#### Object type options
| Option | Description |
| - | - |
| id | Un élément unique à l'objet qui permet de l'identifier (obligatoire, car il permet de modifier l'objet: coordonées, etc) |
| obj | un lien (HTTPS) qui mène au fichier (OBJ) |
| type | Object instance options, see the section below for more details |
| diffuse | a URL (HTTPS) to a diffuse texture file (optional) |
| emissive | a URL (HTTPS) to an emissive texture file (optional) |
| specular | a URL (HTTPS) to a specularity texture file (optional) |
| bump | a URL (HTTPS) to a bump texture map (optional) |
| diffuseColor | diffuse color of the object, e.g. 0xFF0000 (for red) |
| emissiveColor | emissive color of the object, e.g. 0x00FFFF (for cyan) |
| specularColor | specular color of the object |
| transparent | Si la texture de l'objet est transparente ou pas |
| bumpScale | scale for bump mapping (default: 0.1) |

#### Options de l'objet
| Option | Description |
| - | - |
| id | Un élément unique à l'objet qui permet de l'identifier (obligatoire, car il permet de modifier l'objet: coordonées, etc)|
| type | Le type d'objet |
| position | Coordonnées pour placer l'objet |
| scale | Permet de mettre l'objet à une certain échelle |
| rotation | Permet de faire effectuer une rotation à l'objet |
| shape | Forme de l'objet (utilisée pour créer les boites de collisions<br>**Note:** Il est conseillé de ne pas utiliser, car elle ne fonctionne pas comme elle devrait fonctionner|
#### Accés
Le propriété `game.objects` garde tous les objets en 3d que le mod contient.
Vous ne devriez pas modifier cette propriété, afin de faire en sorte que votre mod fonctionne doucement.

#### Changer ou faire bouger un objet
Utilisez encore `game.setObject` avec l'id de l'objet.

#### Supprimer un objet
`game.removeObject(id)` supprime l'objet avec une id donnée. Vous pouvez ommetre le paramètre 'id', ce qui supprimera tous les objets customisés dans l'arrière plan.
#### Exemple
Exemple qui marche: ajouter des cubes (objet) dans l'arrière plan en jeu: https://github.com/pmgl/starblast-modding/blob/master/examples/adding_cube.js
### Les options détaillés de la partie
#### Accés
Une fois que le mod a démarré, toutes les options détaillés passerons dans l'object `game.options`
#### Champs accessibles
Cela inclut toutes les propriétés définies dans [`this.options`](#options), et également des champs étendus listés çi dessous (sauf s'ils ne sont pas définis):
| Champ | Description |
| - | - |
| bouncing_lasers | Si les lasers rebondissant sont activés ou pas |
| max_tier_lives | Le nombre de vie quand le joueur a atteint le vaisseau maximal autorisé (définit dans l'option `max_level`) |
#### Champs accesibles dans le mode équipe
| Champ | Description |
| - | - |
| teams | Un array représentant les informations basiques des différentes équipes: <br>`base_name`: Nom de la station<br>`faction`: Nom de la faction de la station<br>`hue`: la couleur de l'équipe|
| crystal_capacity | an array presenting the capacity of the stations in the increasing level order |
| deposit_shield<br>spawning_shield<br>structure_shield | Un array qui représente la vie des dépôts, spawneurs (modules permétant aux vaisseaux d'apparaître), petits modules, du plus petit au plus grand niveau. |
| deposit_regen<br>spawning_regen<br>structure_regen | Un array qui représente la régénération des dépôts, spawneurs (modules permétant aux vaisseaux d'apparaître), petits modules, du plus petit au plus grand niveau.|

### Assigner des propriétés personalisées à des entités/objets
Vous pouvez assigner des propriétés à des entités du jeu (ou des objects) comme les notes annexes et indicateurs.
#### Accéder et assigner
Faites simplement appel à la propriété `custom` (qui est toujours un object) et assignez lui des propriétés.

#### Entités/Objets supportés
* `game` objet
* tous les vaisseaux
* tous les extraterrestres (aliens)
* toutes les armes secondaires (secondaries)
* tous les astéroïdes
#### Exemples
```js
game.custom.hasMod = true // game object
game.ships[0].custom.userScore = 6712 // ship entity
game.aliens[0].custom = {created: true, rating: "10stars"} // alien entity
game.asteroids[0].custom = {init: true} // asteroid entity
```

### Autres instances de jeu et méthodes
#### Mettre une carte customisée en jeu
Vous pouvez utiliser `game.setCustomMap(<map pattern>)` pour mettre une carte customisée en jeu.

Où <map pattern> a le même format que [la carte customisée dans `this.options`](#custom-asteroids-maps)

#### Ouvir/Fermer le mod à la vue des nouveaux joueurs
Utilisez `game.setOpen(true/false)` pour fermer/ouvrir votre mod (visibilité par les joueurs) (seulement pour les mods du [Modding Space (https://starblastio.gamepedia.com/Modding_Space).

Il y a aussi des propriétés booléennes `game.is_open` est utiliser pour déterminer si le mod est ouvert ou pas.

### Problèmes communs et comment les fixer
#### Problème de l'écran noir
Dans la plupart des cas, votre écran est noir après que le mod ait chargé car votre arbre des vaisseaux contient une erreur.
Suivez ces règles pour empêcher un écran noir:

1. Votre arbre des vaisseaux doit avoir au moins un vaisseau de tier 1.
1. Si votre arbre des vaisseaux a 2 vaisseaux de niveau 2, alors il faudra 1 vaisseau de niveau 1.
1. Certains modéles doivent être dans le bon ordre: 1,2,3 etc (et non 1,6,17, par exemple) ou contrôler les chemins d'accès à un vaisseau par le paramètre "next" (mais garder un ordre correcte pour les vaisseaux qu'on ne peut pas atteindre).
1. Vous ne pouvez pas avoir un nombre infini de chemins pour accéder à unu vaisseau, fait par le paramètre "next" - tous les chemins vont aboutir à un vaisseau, ils ne pourront pas revenir à un certain vaisseau (inférieur au vaisseau actuel).
#### Mon mod s'est arrêté accidentellement mais la partie ne s'est pas arrêtée
Quelquefois, des problèmes non-attendus peuvent faire crasher votre mod, mais cela déconnecte seulement le "contrôleur" du mod, ce qui fait que la partie en elle-même va continuer, mais sans être contrôlée par l'éditeur de mods jusqu'à qu'elle se ferme (ou même dans des occasions sérieuses, les développeurs du jeu - comme PMGL - doivent fermer le mod d'eux-même).
Voici quelques raisons qui peuvent mener au crash d'un mod:

1. Fermer/Actualiser l'onget de l'éditeur de mod sans d'abord arrêter le mod (raison la plus commune)
1. Connection internet très instable
1. Le serveur a une erreur (ce qui contrôle le mod va automatiquement être arrêter par le serveur)
1. L'onglêt de votre naviguateur a crashé (faites attentions avec les boucles infinies avec for/while)

Rapellez-vous que vous ne pouvez pas vous reconnecter au serveur qui a crashé, même s'il est encore en ligne.

## Ressources de la communauté
### Tutoriels et documentation
* [How to add ship to the mod - by InterdictorSD](https://www.youtube.com/watch?v=3b2zKArOkXk)
* [Modding Live #2 by PMGL](https://www.twitch.tv/videos/270359062)
* [General modding tutorial by Wolfan](https://www.youtube.com/watch?v=35SM5rFteIs&t)

### Outlis
* [Map Editor](https://bhpsngum.github.io/starblast/mapeditor/)

### Ressources de codes
* [Archive des mods de la communauté](https://bhpsngum.github.io/starblast/mods/)
* [WIP Modding plus de Dpleshkov](https://github.com/dpleshkov/starblast-modding-plus)
* [Starblast code reference by Bhpsngum](https://github.com/bhpsngum/starblast/)
* [Starblast codes et objets reference by 45rfew](https://github.com/45rfew/Starblast-mods-n-objs)
* [Starblast code reference by Wolfan](https://github.com/W0lfan/Starblast-code-snippets)
