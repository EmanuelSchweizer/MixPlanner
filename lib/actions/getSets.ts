'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

const getSets = async () => {
  const sets = await db
    .selectFrom('set')
    .selectAll('set')
    .execute()

  const setsWithTracks = await Promise.all(
    sets.map(async (set) => {
      const setTracks = await db
        .selectFrom('setTrack')
        .innerJoin('track', 'setTrack.trackId', 'track.id')
        .selectAll('setTrack')
        .select(['track.id as trackId', 'track.title', 'track.artist', 'track.bpm', 'track.key', 'track.energy', 'track.coverUrl'])
        .where('setTrack.setId', '=', set.id)
        .orderBy('setTrack.order', 'asc')
        .execute()

      return {
        ...set,
        setTracks,
      }
    })
  )

  return setsWithTracks
}

export const getSetsAction = () => serverAction(() => getSets())