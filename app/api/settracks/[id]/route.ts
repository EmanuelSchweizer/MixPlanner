import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const setTrack = await prisma.setTrack.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        track: true,
        set: true
      }
    })

    if (!setTrack) {
      return NextResponse.json({ error: 'Set track not found' }, { status: 404 })
    }

    return NextResponse.json(setTrack)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch set track' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { order } = body

    const setTrack = await prisma.setTrack.update({
      where: { id: parseInt(params.id) },
      data: {
        order
      },
      include: {
        track: true,
        set: true
      }
    })

    return NextResponse.json(setTrack)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update set track' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.setTrack.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Set track deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete set track' }, { status: 500 })
  }
}