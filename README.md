# fragments

Cloud-based microservice for a Canadian manufacturing company to manage diverse text and image data from IoT devices, mobile apps, and cameras. This AWS-deployable service is crucial for the company's digitization efforts and future AI and machine learning projects.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Config](#config)
  - [Scripts](#scripts)
- [Author](#author)
- [Version History](#version-history)

## Installation

1. Clone repository
2. Run `npm ci` _(recommended)_ to install dependencies
3. Refer to [Scripts](#scripts) to get started

## Config

| File                    | Description               |
| ----------------------- | ------------------------- |
| `.vscode/launch.json`   | VSCode debugger           |
| `.vscode/settings.json` | Overrides VSCode settings |
| `.prettierrc`           | Code formatting           |
| `.eslintrc.js`          | Static code analysis tool |

## Usage

### Scripts

| Script          | Console Output                                                               | Description                                                        |
| --------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `npm run start` | `node src/server.js`                                                         | Starts the server using Node.js                                    |
| `npm run dev`   | `LOG_LEVEL=debug nodemon ./src/server.js --watch src`                        | Starts the server in development mode with the debug logging level |
| `npm run debug` | `LOG_LEVEL=debug nodemon --inspect=0.0.0.0:9229 ./src/server.js --watch src` | Starts the server in debug mode with an inspector                  |
| `npm run lint`  | `eslint --config .eslintrc.js \"./src/**/*.js\"`                             | Lints the JavaScript files in the `src` directory                  |

## Author

👤 Marcus Georgievski \
📧 mgeorgievski4@myseneca.ca \
💻 [marcusgeorgievski.com](https://marcusgeorgievski.com) 

## Version History

### [0.0.1] - 2024-01-12

- Initial Release
- **Setup:** express, pino logger, eslint, prettier, npm scripts
