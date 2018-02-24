const path = require('path');
const express = require('express');

const DIST_DIR = path.join(__dirname, "../dist"),
    PORT = 3001,
    app = express();

app.use(express.static(DIST_DIR));

app.get('*', function(req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT);