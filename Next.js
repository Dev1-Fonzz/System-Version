// pages/index.js (Next.js)
export default async function Home() {
  const gasUrl = "https://script.google.com/macros/s/AKfycbxktFr72Au77HWnhQbNedZIucwj94eX-6sIFonUIFh5hjtHbHHO8WoUrpiRNmYi2F3r/exec";
  const res = await fetch(gasUrl);
  const html = await res.text();

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
