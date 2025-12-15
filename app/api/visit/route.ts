import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

// 1. Helper: Parse User Agent & DETECT BOTS
const parseUserAgent = (ua: string | null) => {
  if (!ua) return { device: 'Unknown', browser: 'Unknown', isBot: false };
  const uaString = ua.toLowerCase();
  
  if (
    uaString.includes('bot') || 
    uaString.includes('crawl') || 
    uaString.includes('spider') || 
    uaString.includes('googlebot') || 
    uaString.includes('vercel') || 
    uaString.includes('headless') || 
    uaString.includes('lighthouse')
  ) {
    return { device: 'Bot', browser: 'Bot', isBot: true };
  }

  let device = 'Desktop';
  if (uaString.includes('android')) device = 'Android';
  else if (uaString.includes('iphone') || uaString.includes('ipad')) device = 'iOS';
  else if (uaString.includes('windows')) device = 'Windows';
  else if (uaString.includes('mac')) device = 'Mac';

  let browser = 'Unknown';
  if (uaString.includes('chrome')) browser = 'Chrome';
  else if (uaString.includes('safari')) browser = 'Safari';
  else if (uaString.includes('firefox')) browser = 'Firefox';

  return { device, browser, isBot: false };
};

// GET Route
export async function GET() {
  try {
    await dbConnect();
    const visitorDoc = await Visitor.findOne({ name: 'portfolio_counter' });
    return NextResponse.json({ 
      count: visitorDoc ? visitorDoc.count : 0,
      recentVisits: visitorDoc ? visitorDoc.recentVisits : []
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}

// POST Route
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // 1. ANALYZE VISITOR
    const userAgent = req.headers.get('user-agent');
    const { device, browser, isBot } = parseUserAgent(userAgent);

    if (isBot) {
      return NextResponse.json({ success: true, message: 'Bot ignored' });
    }

    // 2. GET REAL LOCATION (No Mock Data)
    let city = null;
    let country = null;
    let region = null; // Variable for State/Province

    // Step A: Check Vercel Headers (Best for Live Production)
    if (req.headers.get('x-vercel-ip-city')) {
      city = decodeURIComponent(req.headers.get('x-vercel-ip-city')!);
      country = decodeURIComponent(req.headers.get('x-vercel-ip-country')!);
      // Vercel gives region code (e.g., "HR" for Haryana), sometimes useful to append
      region = req.headers.get('x-vercel-ip-region'); 
    }

    // Step B: If Localhost (No Vercel headers), fetch from real IP API
    if (!city || !country) {
      try {
        // We use ip-api.com because it gives City AND RegionName (State)
        const ipRes = await fetch('http://ip-api.com/json/');
        if (ipRes.ok) {
          const ipData = await ipRes.json();
          if (ipData.status === 'success') {
             city = ipData.city;         // e.g. "Noida"
             country = ipData.country;   // e.g. "India"
             region = ipData.regionName; // e.g. "Uttar Pradesh"
          }
        }
      } catch (e) {
        console.error('Real location fetch failed:', e);
      }
    }

    // 3. FORMATTING (Combine City + State)
    // You asked for "Exact State or City". 
    // We will save "City, State" into the database so the Admin UI shows both.
    let finalCityString = 'Unknown Location';
    
    if (city && region) {
        finalCityString = `${city}, ${region}`; // Result: "Noida, Uttar Pradesh"
    } else if (city) {
        finalCityString = city;
    }

    // If API failed completely, be honest:
    if (!country) country = 'Unknown Country';

    // 4. SAVE TO DB
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { name: 'portfolio_counter' },
      { 
        $inc: { count: 1 },
        $push: { 
          recentVisits: { 
            // We save the detailed "City, State" string into the city field
            $each: [{ city: finalCityString, country, device, browser, date: new Date() }], 
            $position: 0, 
            $slice: 50 
          } 
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, count: updatedVisitor.count });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, error: 'DB Error' }, { status: 500 });
  }
}