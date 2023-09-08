-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : ven. 08 sep. 2023 à 20:00
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `score`
--

-- --------------------------------------------------------

--
-- Structure de la table `equipes`
--

CREATE TABLE `equipes` (
  `id_equipe` int NOT NULL,
  `code_equipe` varchar(255) NOT NULL,
  `nom_equipe` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `point_total` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `equipes`
--

INSERT INTO `equipes` (`id_equipe`, `code_equipe`, `nom_equipe`, `point_total`) VALUES
(1, 'EQUIPE/01', 'Alpha', 0),
(2, 'EQUIPE/02', 'Beta', 0),
(3, 'EQUIPE/03', 'Gamma', 0),
(4, 'EQUIPE/04', 'Omega', 0);

-- --------------------------------------------------------

--
-- Structure de la table `joueurs`
--

CREATE TABLE `joueurs` (
  `id_joueur` int NOT NULL,
  `code_joueur` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nom_joueur` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `titre_joueur` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `code_equipe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `joueurs`
--

INSERT INTO `joueurs` (`id_joueur`, `code_joueur`, `nom_joueur`, `titre_joueur`, `code_equipe`) VALUES
(1, 'JOUEUR/01', 'Jean Strat', 'Attaquant', 'EQUIPE/01'),
(2, 'JOUEUR/02', 'Uriel Vam', 'Défenseur', 'EQUIPE/01'),
(3, 'JOUEUR/03', 'Malo Malo', 'Gardien', 'EQUIPE/01'),
(4, 'JOUEUR/04', 'Roger Vala', 'Attaquant', 'EQUIPE/02'),
(5, 'JOUEUR/05', 'Dimitri Dupon', 'Défenseur', 'EQUIPE/02'),
(6, 'JOUEUR/06', 'Solo Lerver', 'Gardien', 'EQUIPE/02'),
(7, 'JOUEUR/07', 'Lucien Acander', 'Attaquant', 'EQUIPE/03'),
(8, 'JOUEUR/08', 'Kritant Bal', 'Défenseur', 'EQUIPE/03'),
(9, 'JOUEUR/09', 'Querys Aka', 'Gardien', 'EQUIPE/03'),
(10, 'JOUEUR/10', 'Ismael Torus', 'Attaquant', 'EQUIPE/04'),
(11, 'JOUEUR/11', 'Xilver Stone', 'Défenseur', 'EQUIPE/04'),
(12, 'JOUEUR/12', 'Katakuri Mom', 'Gardien', 'EQUIPE/04');

-- --------------------------------------------------------

--
-- Structure de la table `matchs`
--

CREATE TABLE `matchs` (
  `id_match` int NOT NULL,
  `code_equipe_a` varchar(255) NOT NULL,
  `code_equipe_b` varchar(255) NOT NULL,
  `point_equipe_a` int DEFAULT NULL,
  `point_equipe_b` int DEFAULT NULL,
  `date_match` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `matchs`
--

INSERT INTO `matchs` (`id_match`, `code_equipe_a`, `code_equipe_b`, `point_equipe_a`, `point_equipe_b`, `date_match`) VALUES
(4, 'EQUIPE/01', 'EQUIPE/02', 120, 35, '2023-09-10'),
(5, 'EQUIPE/02', 'EQUIPE/03', NULL, NULL, '2023-09-16'),
(6, 'EQUIPE/02', 'EQUIPE/04', NULL, NULL, '2023-09-22'),
(8, 'EQUIPE/04', 'EQUIPE/01', 72, 90, '2023-10-07');

-- --------------------------------------------------------

--
-- Structure de la table `predictions`
--

CREATE TABLE `predictions` (
  `id_prediction` int NOT NULL,
  `id_match` int NOT NULL,
  `point_equipe_a` int NOT NULL,
  `point_equipe_b` int NOT NULL,
  `code_utilisateur` varchar(255) NOT NULL,
  `etat_prediction` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `predictions`
--

INSERT INTO `predictions` (`id_prediction`, `id_match`, `point_equipe_a`, `point_equipe_b`, `code_utilisateur`, `etat_prediction`) VALUES
(4, 5, 120, 35, 'UTILISATEUR/01', NULL),
(5, 5, 52, 33, 'UTILISATEUR/01', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `statistiques`
--

CREATE TABLE `statistiques` (
  `id_stat` int NOT NULL,
  `code_joueur` varchar(255) NOT NULL,
  `id_match` int NOT NULL,
  `point_joueur` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `statistiques`
--

INSERT INTO `statistiques` (`id_stat`, `code_joueur`, `id_match`, `point_joueur`) VALUES
(1, 'JOUEUR/03', 1, 10),
(2, 'JOUEUR/02', 1, 20);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int NOT NULL,
  `code_utilisateur` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `point_prediction` int NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `code_utilisateur`, `username`, `password`, `point_prediction`, `type`) VALUES
(1, 'UTILISATEUR/01', 'kirilinko', '$2a$12$UZJ562sg.AHU7sC7prIjE.ahOoBacKO8yj0KFRkWfI9L3gnNzizgG', 0, 'admin'),
(2, 'UTILISATEUR/02', 'luca7', '$2a$12$AwAnK1Gjy6MSnLjn14P4a.fApIm4Td9PyTW3l7Bi0/l/SJm1k4BMC', 0, 'parieur');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `equipes`
--
ALTER TABLE `equipes`
  ADD PRIMARY KEY (`id_equipe`),
  ADD UNIQUE KEY `code_equipe` (`code_equipe`);

--
-- Index pour la table `joueurs`
--
ALTER TABLE `joueurs`
  ADD PRIMARY KEY (`id_joueur`),
  ADD UNIQUE KEY `code_joueur` (`code_joueur`),
  ADD KEY `code_equipe` (`code_equipe`);

--
-- Index pour la table `matchs`
--
ALTER TABLE `matchs`
  ADD PRIMARY KEY (`id_match`),
  ADD KEY `code_equipe_a` (`code_equipe_a`),
  ADD KEY `code_equipe_b` (`code_equipe_b`);

--
-- Index pour la table `predictions`
--
ALTER TABLE `predictions`
  ADD PRIMARY KEY (`id_prediction`),
  ADD KEY `code_utilisateur` (`code_utilisateur`),
  ADD KEY `id_match` (`id_match`);

--
-- Index pour la table `statistiques`
--
ALTER TABLE `statistiques`
  ADD PRIMARY KEY (`id_stat`),
  ADD KEY `code_joueur` (`code_joueur`),
  ADD KEY `id_match` (`id_match`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `code_utilisateur` (`code_utilisateur`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `equipes`
--
ALTER TABLE `equipes`
  MODIFY `id_equipe` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `joueurs`
--
ALTER TABLE `joueurs`
  MODIFY `id_joueur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `matchs`
--
ALTER TABLE `matchs`
  MODIFY `id_match` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `predictions`
--
ALTER TABLE `predictions`
  MODIFY `id_prediction` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `statistiques`
--
ALTER TABLE `statistiques`
  MODIFY `id_stat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `joueurs`
--
ALTER TABLE `joueurs`
  ADD CONSTRAINT `joueurs_ibfk_1` FOREIGN KEY (`code_equipe`) REFERENCES `equipes` (`code_equipe`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `matchs`
--
ALTER TABLE `matchs`
  ADD CONSTRAINT `matchs_ibfk_1` FOREIGN KEY (`code_equipe_a`) REFERENCES `equipes` (`code_equipe`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `matchs_ibfk_2` FOREIGN KEY (`code_equipe_b`) REFERENCES `equipes` (`code_equipe`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `predictions`
--
ALTER TABLE `predictions`
  ADD CONSTRAINT `predictions_ibfk_1` FOREIGN KEY (`code_utilisateur`) REFERENCES `utilisateurs` (`code_utilisateur`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `predictions_ibfk_2` FOREIGN KEY (`id_match`) REFERENCES `matchs` (`id_match`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `statistiques`
--
ALTER TABLE `statistiques`
  ADD CONSTRAINT `statistiques_ibfk_1` FOREIGN KEY (`code_joueur`) REFERENCES `joueurs` (`code_joueur`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `statistiques_ibfk_2` FOREIGN KEY (`id_match`) REFERENCES `matchs` (`id_match`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
