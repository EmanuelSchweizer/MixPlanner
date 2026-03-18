'use server'

import { db } from '@/lib/db'
import { serverAction } from './index'

const getTracks = async () => {
  const tracks = await db
    .selectFrom('track')
    .selectAll()
    .execute()
  return tracks
}

export const getTracksAction = () => serverAction(() => getTracks())