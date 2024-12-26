const http = require('http');

const server = http.createServer((req, res) => {
    const { statusCode } = res;
    if (req.method === "GET" && statusCode === 200) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
                </h1>Status</h4>
                <form action="/" method="POST">
                    <input name="username">
                    <button type="submit">BTN</button> 
                </form>
            `)
    } else if (req.method === "POST" && statusCode === 200 ) {
        const result = [];
        req.on('data', attr => {
            result.push(Buffer.from(attr))
        });

        req.on('end', () => {
            const message = result.toString().split('=')[1]; // 0 bosa message oshedi 1 bosa inputdagi "name" {username} oshedi
            res.end(
                `
                <p>Email is ${message}</p>
            `
            )
        })
    }
})

server.listen(5000, console.log("Server is running 5000"));