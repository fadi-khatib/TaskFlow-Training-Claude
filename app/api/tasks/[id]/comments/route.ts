import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import type { Comment } from '@/lib/types';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const taskId = Number(params.id);
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') ?? '10');
  const offset = Number(searchParams.get('offset') ?? '0');

  const db = getDb();
  const comments = db
    .prepare('SELECT * FROM Comment WHERE task_id = ? ORDER BY created_at ASC LIMIT ? OFFSET ?')
    .all(taskId, limit, offset) as Comment[];

  return NextResponse.json({ comments });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const taskId = Number(params.id);
  const body = await request.json();
  const text = typeof body.body === 'string' ? body.body.trim() : '';
  if (!text) {
    return NextResponse.json({ error: 'Comment body is required.' }, { status: 400 });
  }

  const user = getCurrentUser();
  const db = getDb();
  const result = db
    .prepare('INSERT INTO Comment (task_id, author_id, body, created_at) VALUES (?, ?, ?, ?)')
    .run(taskId, user.id, text, new Date().toISOString());

  const comment = db
    .prepare('SELECT * FROM Comment WHERE id = ?')
    .get(result.lastInsertRowid) as Comment;

  return NextResponse.json({ comment }, { status: 201 });
}
