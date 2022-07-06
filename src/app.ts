import 'dotenv/config';
import 'reflect-metadata';
import * as http from 'http';

import expressServer from './server';
import { AppDataSource } from './datasource';
class Main {
  private readonly port = process.env.SERVER_PORT || 8080;
  private server: http.Server;

  constructor() {
    this.server = http.createServer(expressServer);
    this.startServer();
    this.handleServerShutDown();
  }

  private handleServerShutDown() {
    // Ctrl + C
    process.on('SIGINT', () => {
      console.log('SIGINT RECEIVED, SHUTTING DOWN');
      this.stopServer();
    });

    // kill command
    process.on('SIGTERM', () => {
      console.log('SIGTERM RECEIVED, SHUTTING DOWN');
      this.stopServer();
    });
  }

  private stopServer() {
    this.server.close(() => {
      console.log('EXPRESS SERVER IS CLOSED');
      AppDataSource.destroy().then(() => {
        console.log('DATABASE DISCONNECTED');
        process.exit(0);
      });
    });
  }

  private startServer() {
    this.server.listen(this.port, async () => {
      console.log('Server started on port', this.port);
      try {
        await AppDataSource.initialize();
        console.log('Database Connected');
      } catch (error) {
        console.log('Error connecting to Database', error);
      }
    });
  }
}

new Main();
