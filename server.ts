import http from 'http' ; // import pre-bundled module(s)
import fs from 'fs';
import mime from 'mime-types';

let lookup = mime.lookup; // alias for mime-


const port = process.env.PORT || 3000;


// create an instance of a server (Immutable)
const server = http.createServer(function(req, res)  {

    let path = req.url as string;
    if(path == "/" || path == "/home")
    {
        path = "/index.html"
    }

    let mime_type = lookup(path.substring(1)) as string;

    fs.readFile(__dirname + path, function(err, data)
    {
        if(err)
        {
            res.writeHead(404);
            res.end("ERROR: 404 - File Not Found!" + err.message);
            return;
        }
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.writeHead(200, {'Content-Type': mime_type});
        res.end(data);
    });

});

// Like addeventlistener("user req on a port")
server.listen(port, function()  {
  console.log(`Server running at Port:${port}/`);
});

