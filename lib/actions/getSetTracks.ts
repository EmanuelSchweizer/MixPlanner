'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'
import { revalidatePath } from 'next/cache'

const getSetTracks = async (setId?: number) => {
  let query = db
    .selectFrom('setTrack')
    .innerJoin('track', 'setTrack.trackId', 'track.id')
    .innerJoin('set', 'setTrack.setId', 'set.id')
    .selectAll('setTrack')
    .select(['track.id as track_id', 'track.title', 'track.artist', 'set.id as set_id', 'set.name'])
    .orderBy('setTrack.order', 'asc')

  if (setId) {
    query = query.where('setTrack.setId', '=', setId)
  }

  const setTracks = await query.execute()

  return setTracks
}

export const getSetTracksAction = (setId?: number) => serverAction(() => getSetTracks(setId))