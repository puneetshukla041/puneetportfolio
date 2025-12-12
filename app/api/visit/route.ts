// app/api/visit/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

export async function POST() {
  try {
    await dbConnect();

    // Use findOneAndUpdate with upsert: true
    // This creates the document if it doesn't exist, or increments it if it does
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { name: 'portfolio_counter' }, // search query
      { $inc: { count: 1 } },        // increment logic
      { new: true, upsert: true }    // options: return new doc, create if missing
    );

    return NextResponse.json({ 
      success: true, 
      count: updatedVisitor.count 
    });

  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}