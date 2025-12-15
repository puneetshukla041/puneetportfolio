// app/api/reset-visit/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

export async function GET() {
  try {
    await dbConnect();

    // This deletes the document entirely
    await Visitor.deleteOne({ name: 'portfolio_counter' });

    return NextResponse.json({ 
      success: true, 
      message: 'Counter and history have been fully reset. The next visit will start fresh.' 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Reset failed' }, { status: 500 });
  }
}