# ndi-tap-2023

#### NDI TAP Assessment 2023

For this technical assessment, I will be developing a fullstack project. This project is a prototype that solves problem
statement defined below, written in Node.js with JavaScript, using Pug template engine, Express.js framework for
backend, and basic data storage with SQLite.

This application is also deployed and hosted on [Heroku](https://ndi-tap-2023.herokuapp.com/).

#### Author: Loh Chun Mun

## Table of Contents

- [Problem Statement](#problem-statement)
- [Proposed Solution](#proposed-solution)
- [Architecture](#architecture)
- [Wireframe](#wireframe)
- [Run the Application](#run-the-application)
- [Setup Guide (Local)](#setup-guide-local)
    1. [Node.js](#1-nodejs)
    2. [Docker (Optional)](#2-docker-optional)
    3. [Process Environment Variables (Optional)](#3-process-environment-variables-env-optional)
- [npm Commands](#npm-commands)
- [Dependencies](#dependencies)
- [Unit Test](#unit-test)
- [CI/CD Pipeline](#cicd)

## Problem Statement

Over the recent years, scams in Singapore are becoming more and more sophisticated.
Such scams could come in many forms, but the common scams can be categorised under:

- Call scam
    - These scams often involves the scammers trying to pry into the victims' personal/sensitive information in order to
      obtain access into their bank accounts.
- Job scam
    - These scams often involves the scammers sending recruitment ads through messaging apps such as WhatsApp or
      Telegram, enticing unsuspecting victims by promising high pay with short working hours. The victims will be
      required to fork out their own money at some point in time, and eventually be rug pulled.
- Online Marketplace scam
    - These scams often involves the scammers pretending to sell goods at a significantly cheaper price point than
      anywhere else. These scammers will not deliver the goods that the victims have paid for, and often they will go
      missing after the victim has paid.
- Donation scam
    - These scams often involves the scammers pretending to be a part of charitable organisations and asking victims for
      donations.

Although there are campaigns which aims to educate Singaporeans on these common scams, it is simply one part of a
deterrence and may not be enough to curb the sophisticated scams that scammers have been developing.

## Proposed Solution

As such, I would like to propose **IdentifyMe**, a platform that allows individuals or business representatives to
guarantee their identity during their exchange with the customers.

Individuals may apply for an identification profile by applying with MyInfo. Registered businesses will be able to apply
for such identification profiles on behalf of their employees by applying with MyInfo Business. These applications will
be instantly approved as their identities are guaranteed by MyInfo.

Similar to an NRIC or driver license, these identification profile will be locally recognised as a form of
identification. These identification profile will be used in professional context, and will only contain information
that is safe for the public to see.

Every identification profile will have a photo of the individual, an identification code, their full name, the
organisation that they are representing (if applicable), and a QR code (future implementation).

The customer must be allowed enter the identification code or scan the QR code (future implementation) on the platform.
The platform should display the exact same identification profile, and record this interaction under the customer's
contact history log to facilitate swift tracking of the individual or business representative when necessary.

My solution aims to provide Singaporeans with a method to verify the identity of any individual or business
representative in local context. On the other hand, these individuals and business representatives can safely assure
their customers with ease, allowing better conversations to happen.

## Architecture

To be added...

## Wireframe

To be added...

## Run the Application

Please choose only of the following method of your choice. Once the application is running, you may access the app
through `localhost:3000`. If you have issues with running the application, please refer to
the [setup guide](#setup-guide-local) below.

### 1. node

You will only need to run the following command:

```shell
.\start.bat
```

### 2. Docker

You will only need to run the following two commands, one after another:

```shell
# docker build -t <name_for_image> .
docker build -t ndi-tap-2023 .

# docker run -d -p <Browser_expose_port>:<application port> <image_id/name>
docker run -d -p 3000:3000 ndi-tap-2023
```

## Setup Guide (Local)

Needless to say, please clone the project first before proceeding.

### 1. Node.js

To run this project locally, you must have Node.js installed on your device. A quick way to get started is to directly
install Node.js on your system. You may download the installer [here](https://nodejs.org/en/download/).

However, it is strongly recommended to use a Node version manager such
as [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
to install Node.js and npm. You may read more about
it [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### 2. Docker (Optional)

You may choose to containerise this application and run it on Docker. To do so, download and install
Docker [here](https://docs.docker.com/desktop/install/windows-install/).

### 3. Process Environment Variables `.env` (Optional)

Before running the app and unit test, you may configure the following optional process environment variable(s).

```
PORT=3000
```

| Parameters    | Type     | Description                                                                              |
|:--------------|:---------|:-----------------------------------------------------------------------------------------|
| `PORT`        | `Number` | **Optional**. Specify the port that your app will run on. On default, it is set to 3000. |
|               |          |                                                                                          |

## npm Commands

Now that your local files are set up and ready, we can start the server and run the server locally!
Here, we have a list of CLI commands that may be useful to you. In the project directory, simply open a terminal to run
the following:

### `npm ci`

- This command will install all necessary dependencies based on the `package-lock.json`.
- You only need to run this command <b>once</b> in the project directory.
- You do not need to run this if you are using Docker.

### `npm start`

- This command starts the node server located in the root of the repository.
- Alternatively, you may run `node app.js`.
- You do not need to run this if you are using Docker.
- You can now access the app through `localhost:3000`.

### `npm run dev`

- This command starts the node server in development mode.
- It will monitor for any changes to the TypeScript files and compiles whenever necessary, afterwards it will restart
  the node server.
- Alternatively, you may run `nodemon -q app.js`
- For more info, please refer to [Nodemon](https://github.com/remy/nodemon#nodemon)

### `npm run test`

- This command runs the unit tests and generates a code coverage report.
- Code coverage report are generated in `./coverage`, in HTML format for ease of readability.
- Alternatively, you may run `nyc --reporter=html --reporter=text mocha test/household.js --timeout 5000 --exit"`
- For more info, you may read up on them in their official documentations: [Istanbul / nyc](https://istanbul.js.org/)
  , [Mocha.js](https://mochajs.org/), [Chai.js](https://www.chaijs.com/).

## Dependencies

#### Running on Node v16.13.1

Refer to [package-lock.json](./package-lock.json) for all the nitty-gritty details, or refer to the following for a
summarised list taken from [package.json](./package.json):

    "dependencies": {
        "body-parser": "^1.20.0",
        "cors": "^2.8.5",
        "express": "^4.18.1",
        "knex": "^2.2.0",
        "pug": "^3.0.2",
        "sqlite3": "^5.0.11"
    },
    "devDependencies": {
        "chai": "^4.3.6",
        "chai-http": "^4.3.0",
        "mocha": "^10.0.0",
        "nodemon": "^2.0.19",
        "nyc": "^15.1.0"
    }

## Unit Test

Unit tests have been written to test each of the API endpoints, ensuring that the HTTP status codes are returned
correctly, all responses returns as intended and in proper format, and that exceptions are handled properly. In order to
achieve this, I picked a combination of [Mocha.js](https://mochajs.org/) and [Chai.js](https://www.chaijs.com/)
framework, which are commonly used together for writing Node.js unit testing. On top of these, it was also necessary to
install [Chai HTTP](https://www.chaijs.com/plugins/chai-http/) to support HTTP integration testing with Chai assertions.

To ensure that the unit tests are covering as many segments of the codes as possible, I have used a code coverage
tester, [Istanbul / nyc](https://istanbul.js.org/), as a means to ensure my codebase are well tested by my unit tests.

During the testing, the application automatically swaps to the test database, such that the production database will be
left untouched.

In order to accurately test the endpoints and response results, seed data will be inserted at the start of the test and
removed at the end of testing.

## CI/CD

This project is supported by a CI/CD pipeline workflow. The entire process starting from the moment the code is pushed
onto this repository, until the deployment on Heroku are fully automated.

The CI/CD process begins with the workflow process on GitHub Actions. Click [here](./.github/workflows/node.yml) to view
the YAML file.

Upon pushing into the "main" branch, the CI workflow will be automatically triggered, beginning with checking out the
repository so that the workflow can access it. The CI attempt to install all necessary dependencies and run the unit
testings (test). When the build and tests are completed, it will export both the compiled app and code coverage report
as artifacts produced by the workflow, which can be downloaded from the "Summary" of each completed workflow process.

When the CI workflow passes, the codes will be pushed to Heroku automatically. Heroku will refer
to [heroku.yml](./heroku.yml), build the docker image, and start the containerised application on the Heroku server.

And that encompasses the entire workflow and pipeline of this project!