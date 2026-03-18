import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const track = await prisma.track.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        setTracks: true
      }
    })

    if (!track) {
      return NextResponse.json({ error: 'Track not found' }, { status: 404 })
    }

    return NextResponse.json(track)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch track' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, artist, bpm, key, energy, coverUrl } = body

    const track = await prisma.track.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        artist,
        bpm,
        key,
        energy,
        coverUrl
      }
    })

    return NextResponse.json(track)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update track' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.track.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Track deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete track' }, { status: 500 })
  }
}