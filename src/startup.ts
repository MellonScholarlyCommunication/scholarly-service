import {Writer} from "@treecg/connector-types";
import {Parser, Quad} from "n3";
import * as http from "http";
import jsonld from "jsonld";

async function _startup(
  writer: Writer<Quad[]>,
  hostname: string,
  port: number,
) {

  const server = http.createServer((req, res) => {
    const contentType = (req.headers['content-type'] ?? '').split(';')[0];
    if (req.method === "POST" && req.url === "/ldes/") {
      const supportedContentTypes = ["text/turtle", "text/n3", "application/n-triples", "application/n-quads", "application/ld+json"];
      // Check Content-Type of request
      if (!supportedContentTypes.includes(contentType)) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end(`Bad request: Invalid Content-Type. Only ${supportedContentTypes.join(', ')} are supported.`);
        return;
      }
      let body = '';
      req.on("data", chunk => body += chunk);
      req.on("end", async () => {
        try {
          // If Content-Type is JSON-LD, convert to N-Quads
          if (contentType === 'application/ld+json') {
            try {
              body = await jsonld.toRDF(JSON.parse(body), {format: 'application/n-quads'}) as unknown as string;
            } catch (e: any) {
              res.writeHead(400, {'Content-Type': 'text/plain'});
              res.end('Bad request: Invalid JSON-LD: ' + e.message);
              return;
            }
          }

          const qs = new Parser().parse(body);
          await new Promise(res => setTimeout(res, 200));
          await writer.push(qs);

          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('OK');
        } catch (e: any) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Bad request: Invalid Turtle: ' + e.message);
        }
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
    }
  });
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

export async function startup(
  writer: Writer<Quad[]>,
  hostname: string = "127.0.0.1",
  port: number = 8080,
) {
  _startup(writer, hostname, port);
}
