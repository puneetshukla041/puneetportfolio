import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

// 1. Helper: Parse User Agent & DETECT BOTS
const parseUserAgent = (ua: string | null) => {
  if (!ua) return { device: 'Unknown', browser: 'Unknown', isBot: false };
  const uaString = ua.toLowerCase();
  
  // Bot Filter
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

  // Device Detection
  let device = 'Desktop';
  if (uaString.includes('android')) device = 'Android';
  else if (uaString.includes('iphone') || uaString.includes('ipad')) device = 'iOS';
  else if (uaString.includes('windows')) device = 'Windows';
  else if (uaString.includes('mac')) device = 'Mac';

  // Browser Detection
  let browser = 'Unknown';
  if (uaString.includes('chrome')) browser = 'Chrome';
  else if (uaString.includes('safari')) browser = 'Safari';
  else if (uaString.includes('firefox')) browser = 'Firefox';

  return { device, browser, isBot: false };
};

// GET Route (For Admin Panel)
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

// POST Route (For Tracker)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // 1. ANALYZE VISITOR
    const userAgent = req.headers.get('user-agent');
    const { device, browser, isBot } = parseUserAgent(userAgent);

    if (isBot) {
      return NextResponse.json({ success: true, message: 'Bot ignored' });
    }

    let city = null;
    let country = null;
    let region = null;

    // 2. CHECK FOR EXACT GPS DATA (From Frontend)
    // This is the new part that fixes the "Ghaziabad" issue
    try {
      const body = await req.json();
      if (body.manualLocation) {
        city = body.manualLocation.city;
        country = body.manualLocation.country;
        region = body.manualLocation.region;
      }
    } catch (e) {
      // No JSON body sent (e.g. old tracker code), just ignore and use fallback
    }

    // 3. FALLBACK: IF NO GPS (User Blocked), USE IP ADDRESS
    if (!city) {
      // A. Live Vercel Headers
      if (req.headers.get('x-vercel-ip-city')) {
        city = decodeURIComponent(req.headers.get('x-vercel-ip-city')!);
        country = decodeURIComponent(req.headers.get('x-vercel-ip-country')!);
        region = req.headers.get('x-vercel-ip-region');
      } 
      // B. Localhost / Mobile Data Fallback (ip-api.com)
      else {
        try {
          const ipRes = await fetch('http://ip-api.com/json/');
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            if (ipData.status === 'success') {
               city = ipData.city;
               country = ipData.country;
               region = ipData.regionName;
            }
          }
        } catch (e) {}
      }
    }

    // 4. FORMATTING
    let finalCityString = 'Unknown Location';
    
    // Combine City + Region (e.g., "Gurugram, Haryana")
    if (city && region) {
        finalCityString = `${city}, ${region}`;
    } else if (city) {
        finalCityString = city;
    }

    if (!country) country = 'Unknown Country';

    // 5. SAVE TO DB
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { name: 'portfolio_counter' },
      { 
        $inc: { count: 1 },
        $push: { 
          recentVisits: { 
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