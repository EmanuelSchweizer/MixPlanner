'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

const deleteSetTrack = async (id: number) => {
  await db
    .deleteFrom('setTrack')
    .where('id', '=', id)
    .execute()

  revalidatePath('/settracks')
  return null
}

export const deleteSetTrackAction = (id: number) => serverAction(() => deleteSetTrack(id))