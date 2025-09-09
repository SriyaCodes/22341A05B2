import React, { useState } from "react";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import UrlResultCard from "../components/UrlResultCard";
import { Log } from "../middleware/logger";
import { generateShortcode } from "../utils/urlHelpers";

export default function ShortenerPage() {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    const newResults = [];

    urls.forEach((item, idx) => {
      if (!validateUrl(item.longUrl)) {
        alert(`Invalid URL at row ${idx + 1}`);
        Log("ShortenerPage", "ERROR", "UrlShortenerApp", `Invalid URL: ${item.longUrl}`);
        return;
      }

      const validity = parseInt(item.validity) || 30;
      let shortcode = item.shortcode || generateShortcode();

      if (localStorage.getItem(shortcode)) {
        alert(`Shortcode ${shortcode} already exists!`);
        Log("ShortenerPage", "ERROR", "UrlShortenerApp", `Shortcode collision: ${shortcode}`);
        return;
      }

      const createdAt = new Date().toISOString();
      const expiresAt = new Date(Date.now() + validity * 60000).toISOString();

      const data = { originalUrl: item.longUrl, createdAt, expiresAt, clicks: [] };
      localStorage.setItem(shortcode, JSON.stringify(data));

      newResults.push({ shortcode, ...data });
      Log("ShortenerPage", "INFO", "UrlShortenerApp", `URL shortened: ${item.longUrl} → ${shortcode}`);
    });

    setResults(newResults);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((item, idx) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 1 }}>
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              label="Original URL"
              value={item.longUrl}
              onChange={(e) => handleChange(idx, "longUrl", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Validity (minutes)"
              value={item.validity}
              onChange={(e) => handleChange(idx, "validity", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              fullWidth
              label="Custom Shortcode (optional)"
              value={item.shortcode}
              onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      {urls.length < 5 && <Button onClick={addUrlField}>Add URL</Button>}
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>Shorten URLs</Button>

      <Grid container spacing={2} sx={{ mt: 3 }}>
        {results.map((res, idx) => (
          <Grid item xs={12} key={idx}>
            <UrlResultCard data={res} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
