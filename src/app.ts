import 'dotenv/config';
import 'reflect-metadata';
import './path';
import * as http from 'http';

import expressServer from './server';
import { AppDataSource } from './datasource';
import { logger } from '@utils/logger';

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
      logger.info('SIGINT RECEIVED, SHUTTING DOWN');
      this.stopServer();
    });

    // kill command
    process.on('SIGTERM', () => {
      logger.info('SIGTERM RECEIVED, SHUTTING DOWN');
      this.stopServer();
    });
  }

  private stopServer() {
    this.server.close(() => {
      logger.info('EXPRESS SERVER IS CLOSED');
      AppDataSource.destroy().then(() => {
        logger.info('DATABASE DISCONNECTED');
        process.exit(0);
      });
    });
  }

  private startServer() {
    this.server.listen(this.port, async () => {
      logger.info(`Server started on port ${this.port}`);
      try {
        await AppDataSource.initialize();
        logger.info('Database Connected');
      } catch (error) {
        logger.fatal(`Error connecting to Database - ${error}`);
      }
    });
  }
}

new Main();
