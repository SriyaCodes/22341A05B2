import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import StatisticsPage from "./pages/StatisticsPage";

import { Container, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={RouterLink} to="/">
            Shorten
          </Button>
          <Button color="inherit" component={RouterLink} to="/stats">
            Statistics
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatisticsPage />} />
          <Route path="/:shortcode" element={<RedirectHandler />} /> {/* Handles direct short URL access */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
