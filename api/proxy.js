import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        // Gantikan URL ini dengan Apps Script /exec awak
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxktFr72Au77HWnhQbNedZIucwj94eX-6sIFonUIFh5hjtHbHHO8WoUrpiRNmYi2F3r/exec';
        
        const response = await fetch(scriptUrl);
        const data = await response.text(); // Jika JSON, gunakan response.json()

        // Set cache supaya tak overload Apps Script
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
        
        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server proxy error' });
    }
}
