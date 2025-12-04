export default async function handler(req, res) {
    try {
        // Gantikan URL ini dengan Apps Script /exec awak
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxktFr72Au77HWnhQbNedZIucwj94eX-6sIFonUIFh5hjtHbHHO8WoUrpiRNmYi2F3r/exec';
        
        // Native fetch
        const response = await fetch(scriptUrl);
        const data = await response.text(); // atau .json() kalau Apps Script return JSON
        
        // Cache supaya Apps Script tak overload
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
        
        res.status(200).send(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Proxy fetch failed' });
    }
}
