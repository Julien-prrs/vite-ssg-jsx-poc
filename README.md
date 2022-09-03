<div align="center">
   <br />
   <h3 align="center">Static Site Generation with Vite + JSX</h3>
   <p align="center">Simply build static websites with local and/or remote data.</p>
   <br />
</div>

<!-- ## About The Project
<!-- TODO: Add some text to explain why I've created this template -->

## Built With
* [Vite](https://vitejs.dev/)
* [Vite Plugin SSR](https://vite-plugin-ssr.com/)
* JSX

## Prerequisites
To run the project, the following dependencies are required
* [Node.js](https://nodejs.org)
* [Bun](https://bun.sh/) *(Optional, used as runner & package manager here. Can be replaced by the package manager of your choice)*

## Installation
1. Clone the repo
```sh
git clone https://github.com/Julien-prrs/vite-ssg-jsx-poc.git && cd vite-ssg-jsx-poc
```
2. Install dependencies
```sh
bun install
```
3. Start app in development mode
```sh
bun start
```

## Build for production
```sh
bun build:prod
```
Production files are now accessible from under `dist/client/` directory!

## Serve localy
> No need for manual build, `serve` command will automatically build the app on start
```sh
bun serve
```
