import { Generated, ColumnType } from 'kysely'

export interface Database {
  track: TrackTable
  set: SetTable
  setTrack: SetTrackTable
}

export interface TrackTable {
  id: Generated<number>
  title: string
  artist: string
  bpm: number | null
  key: string | null
  energy: number | null
  coverUrl: string | null
  createdAt: string
}

export interface SetTable {
  id: Generated<number>
  name: string
  createdAt: string
}

export interface SetTrackTable {
  id: Generated<number>
  setId: number
  trackId: number
  order: number
}