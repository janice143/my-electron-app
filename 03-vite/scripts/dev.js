#!/usr/bin/node
import path from 'path';
import electronPath from 'electron';
import { spawn } from 'child_process';
import { createServer, build } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const sharedOptions = {
  mode: 'dev',
  build: {
    watch: {}
  }
};

const renderDev = {
  async createRenderServer() {
    process.env.VITE_CURRENT_RUN_MODE = 'render';
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, '../vite/render.config.js')
    };
    this.server = await createServer(options);
    await this.server.listen();
    this.server.printUrls();
    return this.server;
  }
};

let spawnProcess = null;

const mainDev = {
  async createMainServer(renderDevServer) {
    const protocol = `http${renderDevServer.config.server.https ? 's' : ''}:`;
    const host = renderDevServer.config.server.host || 'localhost';
    const port = renderDevServer.config.server.port;
    process.env.VITE_DEV_SERVER_URL = `${protocol}//${host}:${port}/`;
    process.env.VITE_CURRENT_RUN_MODE = 'main';
    const options = {
      ...sharedOptions,
      configFile: path.resolve(__dirname, '../vite/main.config.js')
    };
    return build({
      ...options,
      plugins: [
        {
          name: 'reload-app-on-main-package-change',
          writeBundle() {
            if (spawnProcess !== null) {
              spawnProcess.kill('SIGINT');
              spawnProcess = null;
            }

            spawnProcess = spawn(String(electronPath), ['.']);

            spawnProcess.stdout.on('data', (d) => {
              const data = d.toString().trim();
              console.log(data);
            });

            spawnProcess.stderr.on('data', (data) => {
              console.error(`stderr: ${data}`);
            });

            process.on('SIGINT', () => {
              if (spawnProcess) {
                spawnProcess.kill();
                spawnProcess = null;
              }
              process.exit();
            });
          }
        }
      ]
    });
  }
};

const initDev = async () => {
  try {
    const renderDevServer = await renderDev.createRenderServer();
    await mainDev.createMainServer(renderDevServer);
  } catch (err) {
    console.error(err);
  }
};

initDev();
