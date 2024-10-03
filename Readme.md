# BivouApp

## Prérequis

- **Expo Go** (pour iPhone) : Télécharger l'application **Expo Go** depuis l'App Store pour tester l'application sur l'iPhone.
   - [Lien vers Expo Go sur l'App Store](https://apps.apple.com/us/app/expo-go/id982107779)
- Connecté l'iPhone et l'ordinateur sur le même réseau Wi-Fi.

## Installation

Suivre les étapes ci-dessous pour configurer le projet:

1. **Clonez le projet depuis le dépôt Git** :
   ```bash
   git clone https://github.com/bastian-albaut/BivouApp.git
   cd BivouApp
    ```
2. **Installer les dépendances** :
    ```bash
    npm install
    ```
3. **Lancer le projet** :
    ```bash
    npx expo start
    ```
4. **Démarrez l'application sur l'iPhone** :
   - Scanner le code QR affiché sur le terminal avec l'appareil photo de l'iPhone.
   - Ouvrir le lien dans **Expo Go**.

# Fais une petite aide pour les autres développeurs pour utiliser des icones


## Utilisation d'icônes

Pour utiliser des icônes dans l'application, utiliser la bibliothèque **react-native-vector-icons**. Suivre les étapes ci-dessous:
- **Rechercher des icônes** : Rechercher des icônes sur le site [Fontawesome](https://fontawesome.com/v5/search?o=r&m=free). (Version 5.15.4)
- Utiliser l'icône dans le code :
  ```typescript
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  <FontAwesome name="home" size={24} color="black" style={{marginRight: 10}} />
  ```
