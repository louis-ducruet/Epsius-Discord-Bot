<div id='readme-top'></div>

<!-- Header -->
<div align="center" class="header">
    <a href='https://github.com/louis-ducruet/Epsius-Discord-Bot/blob/main/package.json'>
        <img src='https://img.shields.io/github/package-json/v/louis-ducruet/Epsius-Discord-Bot?style=for-the-badge' alt='Badge de version'>
    </a>
    <a href='https://github.com/louis-ducruet/Epsius-Discord-Bot/blob/main/LICENSE'>
        <img src='https://img.shields.io/github/license/louis-ducruet/Epsius-Discord-Bot?style=for-the-badge' alt='Badge de license'>
    </a>
    <a href='https://github.com/louis-ducruet/Epsius-Discord-Bot/graphs/contributors'>
        <img src='https://img.shields.io/github/contributors/louis-ducruet/Epsius-Discord-Bot.svg?style=for-the-badge' alt='Badge de contibuteurs'>
    </a>
    <a href='https://github.com/louis-ducruet/Epsius-Discord-Bot/issues'>
        <img src='https://img.shields.io/github/issues/louis-ducruet/Epsius-Discord-Bot?style=for-the-badge' alt="Badge d'issues">
    </a>
    <a href='https://github.com/louis-ducruet/Epsius-Discord-Bot/commits/main'>
        <img src='https://img.shields.io/github/last-commit/louis-ducruet/Epsius-Discord-Bot?style=for-the-badge' alt='Badge de commit'>
    </a>
    <br />
    <br />
    <img src='https://cdn.icon-icons.com/icons2/138/PNG/256/cyborg_tux_penguin_20869.png' alt='Logo' width='128' height='auto'>
    <h2>Epsius Discord Bot</h2>
    <p>Bot Discord pour le serveur SN2 22-23 WIPS Nantes.</p>
    <strong>
        <a href='https://github.com/louis-ducruet/Epsius-Discord-Bot/wiki'>Expore le wiki →</a>
    </strong>
    <br/>
    <a href='https://github.com/louis-ducruet/Epsius-Discord-Bot/discussions'>Voir les discussions</a>
    •
    <a href='https://github.com/louis-ducruet/Epsius-Discord-Bot/projects/1'>Avancement du projet</a>
</div>
<br />

# A propos du projet

Epsius est un bot discord développer pour le serveur discord PSN-2 EPSI-WIS Nantes (2022-2023).

Mais attention Epsius n'est pas un bot comme les autres !

Suite à diverses expériences scientifiques, un penguin 🐧 à demi-robot 🤖 avec une conscience vient de créer son compte Discord.

Son passe-temps, rendre des services aux étudiants d'EPSI-WIS Nantes.

Parmi les services qu'il rend :

 - Il attribue les classes
 - Il gère des salons temporaires
 - Il donne des informations sur sa latence et celle de l'API Discord
 - Il met en page les informations sur les intervenants

<p align="right">(<a href="#readme-top">Haut de page ↑</a>)</p>

## Les dépendances

Le bot discord Epsius a besoin de plusieurs packages pour fonctionner : 

<div align="center">
    <a href='https://www.npmjs.com/package/discord.js'>
        <img src='https://img.shields.io/github/package-json/dependency-version/louis-ducruet/Epsius-Discord-Bot/discord.js?color=7289da&logo=discord&logoColor=7289da&style=for-the-badge' alt='Badge discord.js'>
    </a>
    <a href='https://www.npmjs.com/package/dotenv'>
        <img src='https://img.shields.io/github/package-json/dependency-version/louis-ducruet/Epsius-Discord-Bot/dotenv?color=ecd53f&logo=dev.to&logoColor=ecd53f&style=for-the-badge' alt='Badge dotenv'>
    </a>
    <a href='https://www.npmjs.com/package/glob'>
        <img src='https://img.shields.io/github/package-json/dependency-version/louis-ducruet/Epsius-Discord-Bot/glob?color=6c3eff&logo=Octopus%20Deploy&logoColor=d370e8&style=for-the-badge' alt='Badge glob'>
    </a>
</div>

### ⚠️ **Le code est développé dans les versions du package.json** ⚠️
Il est donc possible que certaines fonctionnalités ne fonctionnent plus suite à des modifications dans les versions supérieures des packages.

<p align="right">(<a href="#readme-top">Haut de page ↑</a>)</p>

# Bien débuter

Les étapes pour lancé le projet sur votre machine en local.

## Prérequis

 - Avoir un Token pour son Bot Disocrd : [Tutoriel en anglais](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
 - Avoir un serveur Discord : [Tutoriel](https://support.discord.com/hc/fr/articles/204849977-Comment-cr%C3%A9er-un-serveur-)
 - Installer Node.js : [Site](https://nodejs.org/en/) <br>*PS : Discord.js nécésite Node.js 16.9.0 ou supérieur*
 - Avoir git sur sa machine : [Site](https://git-scm.com/)

<p align="right">(<a href="#readme-top">Haut de page ↑</a>)</p>

## Instalation

Pour commencer il faut cloner le projet : 
```bash
git clone https://github.com/louis-ducruet/Epsius-Discord-Bot.git
```
Il faut ensuite installer les dépendances
```bash
cd Epsius-Discord-Bot
npm install
```
Il faut ensuite compléter le fichier .env
<br/>[Lien vers le wiki prochainement disponible](#)

<p align="right">(<a href="#readme-top">Haut de page ↑</a>)</p>

## Lancement

Il ne reste plus qu'à lancer le bot avec la commande

```bash
node .
```

<p align="right">(<a href="#readme-top">Haut de page ↑</a>)</p>