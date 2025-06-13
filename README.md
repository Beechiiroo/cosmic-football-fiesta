# ⚽ Football Champions – Jeu de Football Dynamique en React

**Football Champions** est un jeu de football moderne, immersif et réactif, construit avec React, TypeScript, et Tailwind CSS. Inspiré des jeux sportifs interactifs, il allie animations fluides, physique réaliste, effets visuels et un design vibrant.

---

## ✨ Vision du jeu

Un terrain de football interactif avec une **vue en perspective réaliste**, des **joueurs animés**, un **ballon physique** et une **interface stylisée**. Tout cela dans une ambiance énergique et moderne, avec un **style visuel inspiré des jeux sportifs actuels**.

---

## 🖼️ Design & Interface

- Terrain vert réaliste avec toutes les **lignes officielles**
- Joueurs d’équipes **bleue** et **rouge**
- Ballon avec **effet de rebond** et mouvement fluide
- Interface moderne avec **cartes semi-transparentes**
- **Effets visuels avancés** : lueurs, ombres dynamiques, gradients
- **Typographie sportive** et **animations CSS fluides**
- **Gradients animés** et **particules décoratives**

---

## ⚙️ Fonctionnalités

- ✅ **Grille de terrain interactive** avec buts et lignes
- 🧍 **Joueurs contrôlables** avec logique de sélection et déplacement
- 🏐 **Physique du ballon** (rebonds, collisions réalistes)
- 🥅 **Détection de but** avec animation et célébration
- 📊 **Scoreboard** en temps réel (score + chronomètre)
- 🔁 **Boutons de contrôle** (play/pause, reset, instructions)
- 🔔 **Toasts de notification** pour les événements (buts, reset)
- 🧩 Architecture modulaire avec composants dédiés :
  - `GameField.tsx`, `Player.tsx`, `Ball.tsx`, `ScoreBoard.tsx`, `GameControls.tsx`

---

## 🎮 Comment jouer

1. **Cliquez sur un joueur** pour le sélectionner
2. **Cliquez sur une position du terrain** pour le faire courir
3. Le joueur se déplace vers le ballon
4. Si proche du ballon, un **tir** est déclenché automatiquement
5. Essayez de marquer dans le but adverse !

---

## 🧰 Stack technique

- ⚛️ **React** + **TypeScript**
- 💨 **Tailwind CSS** pour les styles dynamiques
- 🎨 **shadcn/ui** pour des composants stylisés
- 🌀 **Framer Motion** (animations avancées)
- 🧠 **State management** simple pour contrôle du jeu et scores

---

## 🚀 Lancer le jeu localement

```bash
# 1. Cloner le dépôt
git clone https://github.com/<TON_UTILISATEUR>/football-champions.git

# 2. Aller dans le dossier
cd football-champions

# 3. Installer les dépendances
npm install

# 4. Lancer le jeu en local
npm run dev
