'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

interface UpdateTrackData {
  title?: string
  artist?: string
  bpm?: number | null
  key?: string | null
  energy?: number | null
  coverUrl?: string | null
}

const updateTrack = async (id: number, data: UpdateTrackData) => {
  const track = await db
    .updateTable('track')
    .set({
      title: data.title,
      artist: data.artist,
      bpm: data.bpm,
      key: data.key,
      energy: data.energy,
      coverUrl: data.coverUrl,
    })
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst()

  revalidatePath('/tracks')
  return track
}

export const updateTrackAction = (id: number, data: UpdateTrackData) => serverAction(() => updateTrack(id, data))