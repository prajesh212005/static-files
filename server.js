const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Helper function to serve files
function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            fs.readFile('./404.html', (err, errorPage) => {
                res.end(errorPage);
            });
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    let filePath = './public' + req.url;
    if (filePath === './public/') {
        filePath = './public/index.html';
    }

    // Determine content type
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        default:
            contentType = 'text/html';
    }

    // Serve the requested file
    serveFile(res, filePath, contentType);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
