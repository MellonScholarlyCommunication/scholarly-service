import {Writer} from "@treecg/connector-types";
import {Parser, Quad} from "n3";
import * as http from "http";

async function _startup(
  writer: Writer<Quad[]>,
  hostname: string,
  port: number,
) {

  const server = http.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/ldes/") {
      let body = '';
      req.on("data", chunk => body += chunk);
      req.on("end", async () => {
        try {
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
  hostname: string = "localhost",
  port: number = 8080,
) {
  _startup(writer, hostname, port);
}
