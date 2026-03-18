import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const set = await prisma.set.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        setTracks: {
          include: {
            track: true
          },
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    if (!set) {
      return NextResponse.json({ error: 'Set not found' }, { status: 404 })
    }

    return NextResponse.json(set)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch set' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name } = body

    const set = await prisma.set.update({
      where: { id: parseInt(params.id) },
      data: {
        name
      }
    })

    return NextResponse.json(set)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update set' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.set.delete({
      where: { id: parseInt(params.id) }
    })

    return NextResponse.json({ message: 'Set deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete set' }, { status: 500 })
  }
}