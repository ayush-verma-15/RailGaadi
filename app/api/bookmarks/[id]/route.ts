import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const bookmarkId = params.id;
  return NextResponse.json({
    success: true,
    message: `Bookmark ${bookmarkId} successfully removed`,
  });
}
