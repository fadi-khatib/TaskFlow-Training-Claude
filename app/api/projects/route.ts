import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { Project } from '@/lib/types';

export async function GET() {
  const db = getDb();
  const projects = db.prepare('SELECT * FROM Project ORDER BY created_at ASC').all() as Project[];
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name) {
    return NextResponse.json({ error: 'Project name is required.' }, { status: 400 });
  }

  const db = getDb();
  const result = db
    .prepare('INSERT INTO Project (name, description, created_at) VALUES (?, ?, ?)')
    .run(
      name,
      typeof body.description === 'string' ? body.description : '',
      new Date().toISOString(),
    );

  const project = db
    .prepare('SELECT * FROM Project WHERE id = ?')
    .get(result.lastInsertRowid) as Project;

  return NextResponse.json({ project }, { status: 201 });
}
