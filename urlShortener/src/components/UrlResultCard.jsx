import React from "react";
import { Card, CardContent, Typography, Link } from "@mui/material";

export default function UrlResultCard({ data }) {
  const handleClick = () => {
    const urlData = JSON.parse(localStorage.getItem(data.shortcode));
    if (urlData && new Date(urlData.expiresAt) > new Date()) {
      urlData.clicks.push({ timestamp: new Date().toISOString(), source: "direct", location: "Unknown" });
      localStorage.setItem(data.shortcode, JSON.stringify(urlData));
      window.location.href = urlData.originalUrl;
    } else {
      alert("URL expired!");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography>Shortcode: <Link onClick={handleClick} sx={{ cursor: "pointer" }}>{data.shortcode}</Link></Typography>
        <Typography>Original URL: {data.originalUrl}</Typography>
        <Typography>Expires At: {new Date(data.expiresAt).toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );
}
