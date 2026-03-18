'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

const deleteSet = async (id: number) => {
  await db
    .deleteFrom('set')
    .where('id', '=', id)
    .execute()

  revalidatePath('/sets')
  return null
}

export const deleteSetAction = (id: number) => serverAction(() => deleteSet(id))