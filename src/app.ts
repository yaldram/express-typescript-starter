import * as http from 'http';

import expressServer from './server';

class Main {
  private readonly port = 8080;
  private server: http.Server;

  constructor() {
    this.server = http.createServer(expressServer);
    this.startServer();
  }

  private startServer() {
    this.server.listen(this.port, async () => {
      console.log('Server started on port', this.port);
    });
  }
}

new Main();
