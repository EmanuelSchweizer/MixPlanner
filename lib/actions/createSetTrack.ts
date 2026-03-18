'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

interface CreateSetTrackData {
  setId: number
  trackId: number
  order: number
}

const createSetTrack = async (data: CreateSetTrackData) => {
  const setTrack = await db
    .insertInto('setTrack')
    .values({
      setId: data.setId,
      trackId: data.trackId,
      order: data.order,
    })
    .returningAll()
    .executeTakeFirst()

  revalidatePath('/settracks')
  return setTrack
}

export const createSetTrackAction = (data: CreateSetTrackData) => serverAction(() => createSetTrack(data))