export default async function handler(req, res) {
    try {
        // URL Apps Script awak
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbxktFr72Au77HWnhQbNedZIucwj94eX-6sIFonUIFh5hjtHbHHO8WoUrpiRNmYi2F3r/exec';
        
        // Gunakan fetch native
        const response = await fetch(scriptUrl);
        const data = await response.text(); // Ganti .json() kalau Apps Script return JSON

        // Cache supaya Apps Script tak overload
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server proxy error' });
    }
}
