import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

export default function StatisticsPage() {
  const [allUrls, setAllUrls] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const urls = keys
      .map((key) => ({ shortcode: key, ...JSON.parse(localStorage.getItem(key)) }))
      .filter(item => item.originalUrl);
    setAllUrls(urls);
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shortcode</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Expires At</TableCell>
              <TableCell>Total Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUrls.map((url) => (
              <React.Fragment key={url.shortcode}>
                <TableRow>
                  <TableCell>{url.shortcode}</TableCell>
                  <TableCell>{url.originalUrl}</TableCell>
                  <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(url.expiresAt).toLocaleString()}</TableCell>
                  <TableCell>{url.clicks.length}</TableCell>
                </TableRow>
                {url.clicks.map((click, idx) => (
                  <TableRow key={idx} sx={{ bgcolor: "#f0f0f0" }}>
                    <TableCell colSpan={5}>
                      Click at {new Date(click.timestamp).toLocaleString()} from {click.source}, {click.location}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
