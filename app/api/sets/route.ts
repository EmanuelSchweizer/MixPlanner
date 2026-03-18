import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const sets = await prisma.set.findMany({
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
    return NextResponse.json(sets)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sets' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body

    const set = await prisma.set.create({
      data: {
        name
      }
    })

    return NextResponse.json(set, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create set' }, { status: 500 })
  }
}