export default async function handler(req, res) {
    try {
        // Gantikan URL ini dengan Apps Script /exec awak
        let scriptUrl = 'https://script.google.com/macros/s/AKfycbxktFr72Au77HWnhQbNedZIucwj94eX-6sIFonUIFh5hjtHbHHO8WoUrpiRNmYi2F3r/exec';
        
        // Optional: Terima query params dari Vercel URL dan terus pass ke Apps Script
        const query = new URLSearchParams(req.query).toString();
        if (query) scriptUrl += `?${query}`;

        const response = await fetch(scriptUrl);
        let data;
        const contentType = response.headers.get('content-type') || '';
        
        if (contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        // Cache supaya Apps Script tak overload
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Proxy fetch failed:', error);
        res.status(500).json({ success: false, error: 'Proxy fetch failed' });
    }
}
