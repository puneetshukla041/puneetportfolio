// app/api/visit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

// GET: Fetches count AND location history (used by Admin)
export async function GET() {
  try {
    await dbConnect();
    const visitorDoc = await Visitor.findOne({ name: 'portfolio_counter' });
    
    return NextResponse.json({ 
      count: visitorDoc ? visitorDoc.count : 0,
      recentVisits: visitorDoc ? visitorDoc.recentVisits : [] // Return the list of locations
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

// POST: Increments count AND saves location (used by Tracker)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // 1. Get location from Vercel headers
    // Note: These will be null on localhost, but work on Vercel deployment
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown City';
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown Country';

    // 2. Update DB: Increment count + Push new location to array
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { name: 'portfolio_counter' },
      { 
        $inc: { count: 1 }, // Increase count
        $push: { 
          recentVisits: { 
            $each: [{ city, country, date: new Date() }], // Add new visit info
            $position: 0, // Add to top of list
            $slice: 50    // Keep only last 50 visits to save space
          } 
        }
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, count: updatedVisitor.count });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}