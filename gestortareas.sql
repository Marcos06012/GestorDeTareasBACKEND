/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestortareas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

create database gestortareas;
use database gestortareas;

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `completed` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `finished_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `description`, `completed`, `created_at`, `finished_at`) VALUES
(6, 4, 'Lavanderia', 'Lavar pantalones', NULL, '2025-10-22 22:12:58', '2025-10-22 12:00:00'),
(10, 10, 'Ver partido', 'futbol', NULL, '2025-10-24 08:39:55', '2025-10-24 08:39:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'marcos', 'marcos@test.com', '$2b$10$5QgMEME9jXNqeAKUOpHF7.oZydNPdOWsSRnWIOKv3v2wKebMi5LuG'),
(4, 'jared', 'jared@test.com', '$2b$10$4ONOdIeKuNYDhu9dlZWoOeU6tIyO8sM3yaAqopwwGZg/i0NLnVkpK'),
(8, 'diego', 'diego@test.com', '$2b$10$DGqRj30eBRz6QF3K9lPb5.5LPsdBuSM6oJgvMXlJvxAoUiy.Dk33K'),
(9, 'Marcos Jared', 'alasmarcos60@gmail.com', '$2b$10$w8dwxxWCKo379J04Prlk0OFz0gsdBdvMY7r87ANAtEnYU93QBD/hi'),
(10, 'carlos', 'carlos@test.com', '$2b$10$N5/gy7o6x43LKrZdUC2/wePrnapIjeMfIQkni3uAHjaGzVijqLW1e'),
(11, 'Diego', 'diegoalas@test.com', '$2b$10$.VI97ZYAcK.U.NIOqZVG2eoRdLVXsDKsN.OqQmKj6apsOr4MZsliG');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
