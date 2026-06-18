-- -----------------------------------------------------
-- BANCO DE DADOS: CAFOFO DOS PELUDOS
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `cafofo_db`;
USE `cafofo_db`;

-- -----------------------------------------------------
-- 1. TABELA: USUARIOS (CRUD 2)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `sobrenome` VARCHAR(150) DEFAULT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `telefone` VARCHAR(20) DEFAULT NULL,
  `endereco` VARCHAR(255) DEFAULT NULL,
  `endereco2` VARCHAR(255) DEFAULT NULL,
  `cidade` VARCHAR(100) DEFAULT NULL,
  `estado` VARCHAR(50) DEFAULT NULL,
  `cep` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Carga de Dados Inicial: Usuarios
INSERT INTO `usuarios` (`id`, `nome`, `sobrenome`, `email`, `telefone`, `endereco`, `endereco2`, `cidade`, `estado`, `cep`) VALUES 
(12, 'Arthur', 'Vinicius', NULL, NULL, 'Quadra 301 Conjunto 1', '', 'Brasília', 'DF', '72300-531'),
(14, 'Antonio', 'Melo', NULL, NULL, 'Quadra 67 Conjunto 67', '', 'Brasília', 'DF', '71936-250'),
(15, 'Ana', 'Maria', NULL, NULL, 'Quadra 123 Conjunto 12', '', 'Brasília', 'DF', '720892-531');


-- -----------------------------------------------------
-- 2. TABELA: PETS (CRUD 1)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pets` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `especie` VARCHAR(50) NOT NULL,
  `idade` VARCHAR(50) DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Disponível',
  `imagem` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Carga de Dados Inicial: Pets
INSERT INTO `pets` (`id`, `nome`, `especie`, `idade`, `status`, `imagem`, `descricao`) VALUES 
(17, 'Valentina', 'Cachorro', '1 ano', 'Disponível', '/uploads/1781732830324-148223646.jpg', 'Filhote fêmea em busca de um lar'),
(18, 'Dusky', 'Cachorro', '6 anos', 'Disponível', '/uploads/1781733088634-696246574.jpg', 'Um cachorro tranquilo, apenas existindo'),
(19, 'Ronaldo', 'Gato', '2 meses', 'Disponível', '/uploads/1781733020327-960464403.jpg', 'Filhote laranja bem calminho e querido'),
(20, 'Kazak', 'Cachorro', '3 anos', 'Disponível', '/uploads/1781733182394-338439830.jpeg', 'Encrenqueiro porém protetor'),
(21, 'Bueno', 'Gato', '1 ano', 'Disponível', '/uploads/1781733308766-253203349.jpg', 'Gatinho siamês das cores do Kinder Bueno'),
(22, 'Gatoto', 'Gato', '2 meses', 'Disponível', '/uploads/1781736006830-109745598.jpg', 'Gatinho tadinho coitado'),
(23, 'Snoopy', 'Cachorro', '8 semanas', 'Disponível', '/uploads/1781739431892-823089407.jpg', 'Filhote fofinho cheio de verme'),
(24, 'Salsicho', 'Cachorro', '2 anos', 'Disponível', '/uploads/1781739516736-621034483.jpg', 'Um cachorro fofinho que gosta de correr pulando'),
(25, 'teste123', 'Cachorro', '1 ano', 'Disponível', '/uploads/1781739728695-822980716.jpg', 'testando');


-- -----------------------------------------------------
-- 3. TABELA: ADOCOES (CRUD 3 - RELACIONAMENTO)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adocoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `petId` INT NOT NULL,
  `usuarioId` INT NOT NULL,
  `dataAdocao` DATE NOT NULL,
  PRIMARY KEY (`id`),
  KEY `petId` (`petId`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `adocoes_ibfk_1` FOREIGN KEY (`petId`) REFERENCES `pets` (`id`) ON DELETE CASCADE,
  CONSTRAINT `adocoes_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Carga de Dados Inicial: Adocoes
INSERT INTO `adocoes` (`id`, `petId`, `usuarioId`, `dataAdocao`) VALUES 
(11, 25, 14, '2026-06-10'),
(12, 19, 15, '2026-06-01');