import { Kysely, SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { Database as DatabaseType } from '@/types/db'

const dialect = new SqliteDialect({
  database: new Database('dev.db'), // Passe den Pfad an, falls nötig
})

export const db = new Kysely<DatabaseType>({
  dialect,
})