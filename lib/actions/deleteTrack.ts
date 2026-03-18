'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

const deleteTrack = async (id: number) => {
  await db
    .deleteFrom('track')
    .where('id', '=', id)
    .execute()

  revalidatePath('/tracks')
  return null
}

export const deleteTrackAction = (id: number) => serverAction(() => deleteTrack(id))