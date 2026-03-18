import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      include: {
        setTracks: true
      }
    })
    return NextResponse.json(tracks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, artist, bpm, key, energy, coverUrl } = body

    const track = await prisma.track.create({
      data: {
        title,
        artist,
        bpm,
        key,
        energy,
        coverUrl
      }
    })

    return NextResponse.json(track, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create track' }, { status: 500 })
  }
}