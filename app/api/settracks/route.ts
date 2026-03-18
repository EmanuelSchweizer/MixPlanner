import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const setId = searchParams.get('setId')

    const where = setId ? { setId: parseInt(setId) } : {}

    const setTracks = await prisma.setTrack.findMany({
      where,
      include: {
        track: true,
        set: true
      },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(setTracks)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch set tracks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { setId, trackId, order } = body

    const setTrack = await prisma.setTrack.create({
      data: {
        setId,
        trackId,
        order
      },
      include: {
        track: true,
        set: true
      }
    })

    return NextResponse.json(setTrack, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create set track' }, { status: 500 })
  }
}