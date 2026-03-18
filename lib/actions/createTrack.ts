'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

interface CreateTrackData {
  title: string
  artist: string
  bpm?: number | null
  key?: string | null
  energy?: number | null
  coverUrl?: string | null
}

const createTrack = async (data: CreateTrackData) => {
  const track = await db
    .insertInto('track')
    .values({
      title: data.title,
      artist: data.artist,
      bpm: data.bpm,
      key: data.key,
      energy: data.energy,
      coverUrl: data.coverUrl,
      createdAt: new Date().toISOString(),
    })
    .returningAll()
    .executeTakeFirst()

  revalidatePath('/tracks')
  return track
}

export const createTrackAction = (data: CreateTrackData) => serverAction(() => createTrack(data))