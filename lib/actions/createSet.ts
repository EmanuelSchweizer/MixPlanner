'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

const createSet = async (data: { name: string }) => {
  const set = await db
    .insertInto('set')
    .values({
      name: data.name,
      createdAt: new Date().toISOString(),
    })
    .returningAll()
    .executeTakeFirst()

  revalidatePath('/sets')
  return set
}

export const createSetAction = (data: { name: string }) => serverAction(() => createSet(data))