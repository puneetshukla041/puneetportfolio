import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

// 1. Helper: Parse User Agent & DETECT BOTS
const parseUserAgent = (ua: string | null) => {
  if (!ua) return { device: 'Unknown', browser: 'Unknown', isBot: false };
  
  const uaString = ua.toLowerCase();
  
  // --- STRICT BOT FILTER ---
  // If the visitor name contains any of these, we ignore them completely.
  if (
    uaString.includes('bot') || 
    uaString.includes('crawl') || 
    uaString.includes('spider') || 
    uaString.includes('googlebot') || 
    uaString.includes('vercel') ||     // Vercel's own preview bots
    uaString.includes('headless') ||   // Automated scripts
    uaString.includes('lighthouse') || // Performance tests
    uaString.includes('facebookexternalhit') // WhatsApp/FB Link Previews
  ) {
    return { device: 'Bot', browser: 'Bot', isBot: true };
  }

  // Detect Real Devices
  let device = 'Desktop';
  if (uaString.includes('android')) device = 'Android';
  else if (uaString.includes('iphone') || uaString.includes('ipad')) device = 'iOS';
  else if (uaString.includes('windows')) device = 'Windows';
  else if (uaString.includes('mac') && !uaString.includes('iphone')) device = 'Mac';

  // Detect Real Browsers
  let browser = 'Unknown';
  if (uaString.includes('chrome') && !uaString.includes('edg')) browser = 'Chrome';
  else if (uaString.includes('safari') && !uaString.includes('chrome')) browser = 'Safari';
  else if (uaString.includes('firefox')) browser = 'Firefox';
  else if (uaString.includes('edg')) browser = 'Edge';

  return { device, browser, isBot: false };
};

// GET: Admin still needs to see the data
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

// POST: This is where we block the bots
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // 1. ANALYZE VISITOR
    const userAgent = req.headers.get('user-agent');
    const { device, browser, isBot } = parseUserAgent(userAgent);

    // ⛔️ STOP! If it's a bot, return success but DO NOT save to DB.
    if (isBot) {
      console.log(`🚫 Blocked Bot: ${userAgent}`);
      return NextResponse.json({ success: true, message: 'Bot ignored' });
    }

    // 2. CLEAN LOCATION DATA
    let cityRaw = req.headers.get('x-vercel-ip-city');
    let countryRaw = req.headers.get('x-vercel-ip-country');
    
    // Fix the "%20" error (Santa%20Clara -> Santa Clara)
    let city = cityRaw ? decodeURIComponent(cityRaw) : null;
    let country = countryRaw ? decodeURIComponent(countryRaw) : null;

    // Fallback for your Laptop (Localhost)
    if (!city || !country) {
      city = 'Gurugram';
      country = 'India';
    }

    // 3. SAVE REAL HUMAN
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { name: 'portfolio_counter' },
      { 
        $inc: { count: 1 },
        $push: { 
          recentVisits: { 
            $each: [{ city, country, device, browser, date: new Date() }], 
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