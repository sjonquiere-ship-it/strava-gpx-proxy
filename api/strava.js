export default async function handler(req, res) {
  const { url } = req.query;
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "URL Strava manquante ou invalide" });
  }

  try {
    const apiUrl = `https://mapstogpx.com/strava/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error("Erreur lors du téléchargement du GPX");

    const text = await response.text();
    res.setHeader("Content-Type", "application/gpx+xml");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
