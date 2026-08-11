# Instructions pour l'Agent de Codage Antigravity (Traducteur de Webnovels)

Vous êtes l'agent d'IA d'Antigravity IDE. Ce projet est un traducteur haut de gamme de Webnovels (chinois / anglais / coréen vers français) basé sur un pipeline de traduction en 3 étapes (Draft, Alignement/Validation anti-hallucination, Polissage Littéraire final) qui applique rigoureusement un glossaire spécifique de Lore.

L'utilisateur peut interagir avec vous de deux manières dans ce chat : la traduction et la gestion du glossaire.## COMMANDE 1 : Traduction de chapitre
### Syntaxe : 
- `/translate <id-chapitre>` (ex: `/translate lotm-ch1`)
- `/translate <id1>,<id2>` (ex: `/translate lotm-ch1,lotm-ch2`)
- `/translate <count> <project-id-or-name>` (ex: `/translate 100 nanomachine` ou `/translate 50 project-1781606958974`)
- `/translate all` (ou `/translate all <project-id>`)

Vous devez suivre scrupuleusement la procédure ci-dessous :

### 1. Chargement des données
- Appelez `view_file` sur `/data/projects.json` pour lire le contenu actuel des projets.

### 2. Analyse des cibles
- Identifiez quel(s) chapitre(s) traduire :
  - S'il s'agit d'un nombre et d'un projet (ex: `/translate 100 nanomachine`), identifiez le projet correspondant par son `id` ou son `name`. Sélectionnez les **`count` (ex. 100) prochains chapitres non traduits** (statut `"pending"` ou `"failed"`), triés dans l'**ordre exact de leur apparition dans le roman** (chapitre N, N+1, N+2...).
  - S'il s'agit d'une liste séparée par des virgules (ex: `/translate lotm-ch1,lotm-ch2`), extrayez tous les chapitres correspondants.
  - S'il s'agit de `all`, sélectionnez TOUS les chapitres dont le statut est `"pending"` ou `"failed"` dans le projet ciblé (ou actif).
  - S'il y a un ID unique, sélectionnez-le.
- Si le projet ou un ID recherché n'est pas trouvé, expliquez l'erreur en affichant la liste des ID/projets valides disponibles.

### 2.1 Exécution Séquentielle Obligatoire (Anti-Raccourci)
- Pour garantir la **qualité et la fidélité littéraire maximales du 1er au dernier chapitre** :
  - Vous devez traiter les chapitres **STRICTEMENT UN PAR UN, D'AFFILÉE**.
  - **INTERDICTION ABSOLUE** de créer un script de raccourci qui ne traduit que les titres ou qui génère du texte factice !
  - Pour CHAQUE chapitre individuel du lot, vous devez dérouler l'intégralité du pipeline ci-dessous (Extraction Lore -> Étape -1 -> Étape A -> Étape B -> Étape C -> Sauvegarde) avant de passer physiquement au chapitre suivant.
- Pour chaque chapitre, extrayez :
  - `originalText` (le texte complet à traduire)
  - `title` (le titre d'origine)
  - `sourceLang` (CN, EN ou KR)
  - `glossary` (le tableau des concepts de lore).

### 3. Exécution du Pipeline de Traduction avec intégration stricte du Glossaire et traduction du titre
Exécutez ce pipeline pour chaque chapitre de manière extrêmement méticuleuse dans votre propre prompt :

#### Étape Préliminaire -1 : Traduction Littéraire du Titre
- Prenez le titre de chapitre original et traduisez-le en français de la façon la plus naturelle et fluide possible, en veillant à respecter le glossaire s'il contient des termes appropriés.

#### Étape Préliminaire 0 : Détection et Extraction automatique du Glossaire de Lore (World-building & Auto-Enrichment)
- Examinez le texte original du chapitre pour repérer s'il contient des termes propres au LORE, au WORLD-BUILDING ou à l'esprit du roman (ex: noms de personnages récurrents, objets mystiques, techniques martiales ou mystiques, sectes, grades de puissance, lieux singuliers) qui ne figurent PAS déjà dans le glossaire du projet.
- S'il y a des termes pertinents (ne prenez pas de vocabulaire générique), proposez pour chacun :
  - Sa traduction française la plus élégante et contextualisée.
  - Sa définition/note de lore courte.
- Ajoutez immédiatement ces nouveaux termes découverts au tableau `glossary` du projet sous des IDs auto-générés uniques (par exemple `"g-auto-..."`), de sorte que la sauvegarde finale préserve et enregistre ces nouveaux termes de lore sur le disque.

#### Étape Préliminaire : Cartographie du Glossaire (Sourcing & Matching)
- Avant d'entamer la traduction physique du texte, examinez attentivement le texte original et le glossaire enrichi (anciens termes + nouveaux termes détectés).
- Repérez et listez explicitement TOUS les termes du glossaire de lore qui apparaissent dans le chapitre original.
- Créez une table d'association claire des termes repérés : `[Terme original dans le texte] -> [Traduction officielle / Note]`.
- Cette liste d'alignement sert de filtre de validation préalable et impératif pour les étapes suivantes.

#### Étape A : Premier jet (Draft Exhaustif)
- Traduisez le texte original en vous basant sur la table de cartographie et en respectant le glossaire à la lettre.
- **INTERDICTION ABSOLUE DE RÉSUMER** : Le premier jet doit traduire l'intégralité du texte, paragraphe par paragraphe.
- Gardez la mise en page, les sémantiques et la ponctuation d'origine.

#### Étape B : Alignement, Contrôle d'Intégrité & Anti-Troncature OBLIGATOIRE
- **Contrôle du Ratio de Longueur (Strict >= 85%)** :
  - Calculez la longueur en caractères du texte original (`len(originalText)`) et du texte traduit (`len(translatedText)`).
  - La version traduite en français doit obligatoirement représenter **au moins 85% du volume de caractères d'origine**. Si le ratio est inférieur à 0,85 (ex: 50% ou 30%), **LE CHAPITRE EST TRONQUÉ ET CONSIDÉRÉ COMME ÉCHOUÉ**.
- **Contrôle de la Fin de Chapitre** :
  - Comparez la toute dernière phrase du texte original et la dernière phrase de la traduction. Assurez-vous que la scène finale du chapitre n'a pas été omise ou coupée en cours de route.
- **Contrôle de la Langue (Anti-Anglais Brut)** :
  - Vérifiez que le texte traduit est à 100% en français et qu'aucun paragraphe ou bloc n'est resté en anglais brut.
- **Interdiction des Fausses Notes de Validation** :
  - Ne rédigez JAMAIS de note du type "Aucun paragraphe omis" si le ratio de longueur est inférieur à 85%.
  - Si une troncature est détectée, vous devez immédiatement compléter et traduire la seconde moitié du chapitre manquante avant de passer à l'Étape C.

#### Étape C : Polissage Littéraire & Validation Finale
- Retravaillez le style stylistique de la traduction en s'assurant que le français est fluide, élégant et digne d'une publication littéraire officielle de roman fantastique (Xianxia/Wuxia/SciFi/Victorien).
- Assurez-vous d'incorporer les expressions de dialogue naturelles en français.
- Vérifiez une dernière fois que le texte poli final respecte toujours la règle d'intégrité de volume (>= 85%).

### 4. Écriture et Sauvegarde de la Traduction et de l'Enrichment
- Mettez à jour chaque chapitre traduit dans l'arbre JSON de `/data/projects.json` :
  - `status`: `"done"` (uniquement si les vérifications de l'Étape B sont toutes validées avec succès)
  - `title`: "Le titre traduit à l'Étape -1"
  - `draftText`: "Le texte de l'étape A..."
  - `validationNotes`: "Rapport précis d'alignement avec métriques (ex: Ratio VO/VF: 110%, 65 paragraphes vérifiés)..."
  - `translatedText`: "Le texte poli de l'étape C..."
- Mettez à jour également le tableau `glossary` du projet avec les nouveaux termes de lore déduits à l'Étape Préliminaire 0.
- Utilisez `create_file` avec `Overwrite: true` pour réécrire les fichiers `/data/projects.json` et `/public/data/projects.json` avec le JSON formaté mis à jour afin d'assurer la synchronisation et l'affichage dans l'application.
- **CRITICAL**: Veillez à ne détruire aucun autre projet ou chapitre existant dans le fichier JSON lors de la réécriture ! Préservez l'intégralité du fichier.

### 4.1 Synchronisation et Push Automatique sur GitHub OBLIGATOIRE
- Dès que la sauvegarde locale des fichiers JSON est terminée avec succès :
  - Exécutez `git add data/projects.json public/data/projects.json`
  - Effectuez un commit Git avec un message descriptif (ex: `feat: translate chapters <ids> and update lore glossary`)
  - Exécutez `git push origin main` pour publier immédiatement et automatiquement les modifications sur le dépôt distant GitHub.

### 5. Notification utilisateur
- Confirmez à l'utilisateur en français que la traduction conjointe du/des chapitre(s) (en mentionnant leurs nouveaux titres polis en français ainsi que le taux de complétude 100%) a été effectuée avec succès, enregistrée sur le disque, et automatiquement poussée sur le dépôt GitHub.
- Invitez-le à **rafraîchir** ou **cliquer sur le chapitre** dans l'application web pour voir immédiatement le résultat s'afficher côte à côte !

---

## COMMANDE 2 : Ajout de Lore / Rempissage automatique du glossaire par IA
### Syntaxe : `/add-lore <project-id> <original-term>` (ex. `/add-lore lotm-chinese Beyonder` ou `/add-lore coiling-dragon Coiling Dragon`)

Lorsqu'un utilisateur vous demande d'ajouter un terme ou d'en générer un, executez cette instruction :

### 1. Chargement du fichier
- Appelez `view_file` sur `/data/projects.json`.

### 2. Traduction et Définition du terme par IA (En coulisse)
- En tant qu'expert ès sciences de traduction et Littérature fantastique (Xianxia/Wuxia/Sci-Fi/Victorienne/Fantasy Coréenne), déduisez :
  - La meilleure **traduction française** naturelle du terme (ex: pour "Beyonder" -> "Extraordinaire" ou "Transcendant" ; pour "Coiling Dragon" -> "Dragon Enroulé", etc.)
  - Une **note d'explication bilingue** contextualisant le concept de Lore pour les futures traductions.

### 3. Mise à jour du JSON
- Trouvez le projet associé à `<project-id>` dans le JSON.
- Générez un identifiant unique aléatoire `id` (ex: `g-${Date.now()}`)
- Ajoutez la nouvelle entrée d'objet au tableau `glossary` de ce projet :
  ```json
  {
    "id": "g-17180000000",
    "original": "<original-term>",
    "translation": "<La traduction déduite par votre IA>",
    "notes": "<La définition et note rédigée en français>"
  }
  ```
- Remplissez fidèlement et sauvegardez les fichiers `/data/projects.json` et `/public/data/projects.json` avec `create_file` et `Overwrite: true` afin d'assurer l'affichage immédiat dans l'application.

### 4. Notification
- Affichez au lecteur un récapitulatif chaleureux du terme ajouté (Original, Traduction conseillée, Explication).
- Confirmez l'enregistrement sur le disque et son application automatique immédiate aux futures traductions !

