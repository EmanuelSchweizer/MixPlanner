'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

interface UpdateSetData {
  name: string
}

const updateSet = async (id: number, data: UpdateSetData) => {
  const set = await db
    .updateTable('set')
    .set({
      name: data.name,
    })
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst()

  revalidatePath('/sets')
  return set
}

export const updateSetAction = (id: number, data: UpdateSetData) => serverAction(() => updateSet(id, data))