import { db } from '../lib/db'

async function createTables() {
  await db.schema
    .createTable('track')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('title', 'text', (col) => col.notNull())
    .addColumn('artist', 'text', (col) => col.notNull())
    .addColumn('bpm', 'integer')
    .addColumn('key', 'text')
    .addColumn('energy', 'integer')
    .addColumn('coverUrl', 'text')
    .addColumn('createdAt', 'datetime', (col) => col.notNull().defaultTo('CURRENT_TIMESTAMP'))
    .execute()

  await db.schema
    .createTable('set')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('createdAt', 'datetime', (col) => col.notNull().defaultTo('CURRENT_TIMESTAMP'))
    .execute()

  await db.schema
    .createTable('setTrack')
    .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
    .addColumn('setId', 'integer', (col) => col.notNull().references('set.id'))
    .addColumn('trackId', 'integer', (col) => col.notNull().references('track.id'))
    .addColumn('order', 'integer', (col) => col.notNull())
    .addUniqueConstraint('unique_set_track', ['setId', 'trackId'])
    .execute()

  console.log('Tables created')
  process.exit(0)
}

createTables().catch((err) => {
  console.error(err)
  process.exit(1)
})