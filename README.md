# fragments

Cloud-based microservice to manage diverse text and image data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [EC2](#ec2)
  - [Docker](#docker)
- [Config](#config)
  - [Scripts](#scripts)
- [Version History](#version-history)

## Installation

1. Clone repository
2. Run `npm i` to install dependencies
3. Refer to [Scripts](#scripts) to get started

## Config

| File                    | Description               |
| ----------------------- | ------------------------- |
| `.Dockerfile`           |                           |
| `.jest.config`          |                           |
| `.prettierrc`           | Code formatting           |
| `.eslintrc.js`          | Static code analysis tool |
| `.vscode/launch.json`   | VSCode debugger           |
| `.vscode/settings.json` | Overrides VSCode settings |

## Usage

### EC2

```bash
# Ensure EC2 instance is running
ssh -i ~/.ssh/ccp555-key-pair.pem ec2-user@<public-dns>
```

### Docker

```bash
docker build -t marcusgeorgievski/fragments:latest .

# [-e LOG_LEVEL=debug]
docker run --rm --name fragments --env-file .env -p 8080:8080 marcusgeorgievski/fragments:latest
```

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

## Version History

### [0.7.0] - 2024-03-11

- Auto build and push to Docker
- AWS Elastic Container Registry + CD

### [0.6.0] - 2024-02-13

- Simple Docker configuration

### [0.5.0] - 2024-02-13

- `POST /v1/fragments`
- `GET /v1/fragments`
- `GET /v1/fragments/:id`
- `Updated testing suite`

### [0.4.0] - 2024-02-06

- Setup EC2 instance

### [0.3.0] - 2024-01-26

- Added github CI workflows
- Added unit testing with jest

### [0.1.0] - 2024-01-22

- Secured routes with auth middleware
  - passport.js
  - cognito
  - http bearer
- Initial `/v1/fragments` route
- Reorganized project structure

### [0.1.0] - 2024-01-12

- Initial Release
- **Setup:** express, pino logger, eslint, prettier, npm scripts
