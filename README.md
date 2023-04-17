# Pokemon finder

Pokemon database with powerful search tools build with React and Redux toolkit.

The app is available on [https://battistar.github.io/pokemon-finder/](https://battistar.github.io/pokemon-finder/).

## Development

You can setup and run the application in your local environment in different ways:

### Docker

Move in dev folder and make executable `run.sh`:

```shell
sudo chmod +x run.sh
```

The you can build the Docker image and run the container by:

```shell
./run.sh start
```

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

To teardown the environment run:

```shell
./run.sh stop
```

### npm

First setup [nvm](https://github.com/nvm-sh/nvm), then move in the main folder, where the `.nvmrc` file are in, and run:

```shell
nvm use
```

Now you can run the application on the node environment selected for the development:

```shell
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

Every push on the master branch, trigger a GitHub action that check the code validity and push a new version of it on GitHub pages.
