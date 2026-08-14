CREATE TABLE `blogPosts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(256) NOT NULL,
	`title` varchar(512) NOT NULL,
	`excerpt` varchar(1024) DEFAULT '',
	`body` text NOT NULL,
	`tags` varchar(512) DEFAULT '',
	`coverUrl` varchar(512) DEFAULT '',
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`publishedAt` timestamp,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blogPosts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blogPosts_slug_unique` UNIQUE(`slug`)
);
