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
2. Run `npm i` to install dependencies
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

| Script               | Console Output                                                                | Description                                                         |
| -------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `npm run start`      | `node src/index.js`                                                           | Starts the server using Node.js                                     |
| `npm run dev`        | `LOG_LEVEL=debug nodemon ./src/index.js --watch src`                          | Starts the server in development mode with the debug logging level  |
| `npm run debug`      | `LOG_LEVEL=debug nodemon --inspect=0.0.0.0:9229 ./src/index.js --watch src`   | Starts the server in debug mode with an inspector                   |
| `npm run lint`       | `"lint": "eslint --config .eslintrc.js \"./src/**/*.js\" \"tests/**/*.js\"",` | Lints the .js and .test.js files in the `src` and `tests` directory |
| `npm run test`       | `jest -c jest.config.js --runInBand --"`                                      | Run tests one-by-one                                                |
| `npm run test:watch` | `jest -c jest.config.js --runInBand --watch --`                               | Run tests, and re-run on file changes                               |
| `npm run coverage`   | `jest -c jest.config.js --runInBand --coverage`                               | Run tests and collect test coverage information                     |

## Author

👤 Marcus Georgievski \
📧 mgeorgievski4@myseneca.ca \
💻 [marcusgeorgievski.com](https://marcusgeorgievski.com)

## Version History

### [0.0.6] - 2024-02-13

- Simple Docker configuration

### [0.0.5] - 2024-02-13

- `POST /v1/fragments`
- `GET /v1/fragments`
- `GET /v1/fragments/:id`
- `Updated testing suite`

### [0.0.4] - 2024-02-06

- Setup EC2 instance

### [0.0.3] - 2024-01-26

- Added github CI workflows
- Added unit testing with jest

### [0.0.2] - 2024-01-22

- Secured routes with auth middleware
  - passport.js
  - cognito
  - http bearer
- Initial `/v1/fragments` route
- Reorganized project structure

### [0.0.1] - 2024-01-12

- Initial Release
- **Setup:** express, pino logger, eslint, prettier, npm scripts
