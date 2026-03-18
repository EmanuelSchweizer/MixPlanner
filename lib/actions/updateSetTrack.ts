'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

interface UpdateSetTrackData {
  order: number
}

const updateSetTrack = async (id: number, data: UpdateSetTrackData) => {
  const setTrack = await db
    .updateTable('setTrack')
    .set({
      order: data.order,
    })
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst()

  revalidatePath('/settracks')
  return setTrack
}

export const updateSetTrackAction = (id: number, data: UpdateSetTrackData) => serverAction(() => updateSetTrack(id, data))