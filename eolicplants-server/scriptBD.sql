SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS eolicplants;
CREATE DATABASE IF NOT EXISTS eolicplants;
USE eolicplants;

CREATE TABLE `eoloplants`
(
    `id`        varchar(255) NOT NULL PRIMARY KEY,
    `city`      varchar(100) NOT NULL UNIQUE,
    `progress`  int          DEFAULT 0,
    `completed` tinyint      DEFAULT 0,
    `planning`  varchar(100) DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
