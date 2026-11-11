-- First migration of the project's database. Add changes as new files: 0002_add_users.sql,
-- 0003_..., applied in order by `db migrate` (preview) and on publish (production). Never edit a
-- migration that has been applied; add a new one instead.
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
