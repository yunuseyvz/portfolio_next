import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(req: NextRequest) {
  try {
    console.log('Received GET request for visitor count');

    // Get the current visitor count, default to "0" if null
    let countStr = await kv.get<string>('visitors') || '0';
    console.log('Current visitor count:', countStr);

    // Parse countStr to a number
    let count = parseInt(countStr, 10);

    // Increment the visitor count
    count += 1;
    console.log('Incremented visitor count:', count);

    // Store the updated count as a string
    await kv.set('visitors', count.toString());
    console.log('Updated visitor count stored:', count);

    // Return the updated count
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error updating visitor count:', error);
    return NextResponse.json({ error: 'Failed to update visitor count' }, { status: 500 });
  }
}
