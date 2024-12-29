const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method == "GET") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(`
            <form action="/" method="POST">
                <input name="text" placeholder="enter text">
                <button type="submit">BTN</button>
            </form>
        `);
    } else if (req.method == "POST") {
        const message = [];

        req.on('data', (data) => {
            message.push(data); // Push data directly
        });

        req.on('end', () => {
            const result = Buffer.concat(message).toString().split('=')[1]; // Combine all chunks and convert to string
            res.end(`You submitted: ${result}`);
        });
    }
});

server.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
