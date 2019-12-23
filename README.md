# QLAB

![qlab logo](/misc/qlab-logo-1.png "QLAB Logo")

## QLAB, where effort is the currency.

QLAB is a learning envioronment where you can learn any topic to earn points.
You can then invest your points in your friends to benefit from their effort and create a collaborative growth environment.

![qlab screenshot of dashboard](/misc/qlab-screen.png "QLAB Dashboard")

### Try out the app @ [qlab-cc.web.app](https://qlab-cc.web.app/)

## Project

Our feature plans for the app:

- [x] CI/CD Pipline ➰
- [x] User can _sign in_ and _create personal profile_ 👤
- [x] User can _take a quiz_ and gain points for it 👩🏻‍🏫
- [x] Users can _invest_ points in their friends 💰
- [x] _Investment statistics_ based on daily calculated _engagement score_ 🧮
- [x] Dashboard 🎛
- [x] Leaderboard 🔝
- [ ] Multiple quiz types 🧩
- [ ] Make it awesome! 🔥

## 12 Factor Checklist

- [x] 1 - Codebase Revision Control
  - [x] Code Stored on Github
- [x] 2 - Dependencies
  - [x] package.json File Used with Yarn
  - [x] Node Version Specified in Main package.json
  - [x] Node Version Specified in Sub Package.json
- [x] 3 - Configuration
  - [x] Relevant Firebase Configuration stored in environment variables for deployment in CircleCI
- [x] 4 - Backing Services - Treat backing services as attached resources
  - _This is challenging when considering Firebase, as using the React Firebase CLI ties you into Firebase's 'way of doing things'_
  - [x] Frontend is agnostic to the Backend Process Source
- [x] 5 - Build, Release, Run
  - [x] Build Stage Run in Circle CI
  - [x] CircleCI Deploys Release using some Env Config
  - [x] Firebase Executes the Release
- [x] 6 - Processes
  - [x] Database is single source of truth
  - [x] App can handle non-existence of localstorage data
- [x] 7 - Port Binding
  - [x] Runtime Listens on a given port
    - _Available Through Firebase_
- [x] 8 - Concurrency
  - [x] Backend Processes That can be concurrent handled as separate cloud functions
- [x] 9 - Disposability
  - [x] Fast Startup Times for Firestore and Cloud Functions
  - _Available Through Firebase_
- [x] 10 - DEV / PROD Parity
  - [x] DEV and PROD Versioning
  - [x] Get CircleCI to fully build from promoted DEV version
- [ ] 11 - Logs
  - [ ] User Changes to Database are Logged using a helper cloud function
  - [x] Cloud Function Processes are Logged - Get this for Free with Cloud Functions
- [x] 12 - Admin Processes
  - [x] Admin Code Shipped with Main Codebase
  - [x] Command Line
    - [x] Quizzes can be added from Command Line
      - _Added Script to Handle this_
  - [x] One off DB changes can be made easily
    - _Available Through Firebase_
  - [x] One off Cloud Function Operations can be run easily (free with Firebase)
    - _Available Through Firebase_

## Development

In order to run this app locally, please install the [Firebase CLI](https://firebase.google.com/docs/cli).

First, ensure that your packages are up to date and installed:

```bash
yarn
```

Then login to Firebase:

```bash
yarn login
```

To run a local test of the React App with hot reloading:

```bash
yarn start
```

To run a full integration test with all the Cloud Functions and Firebase packages enabled:

```bash
yarn int
```

### Cloud Functions

Due to the _(kind of annoying)_ fact that Google Cloud Platform [only supports older versions of Node](https://firebase.google.com/docs/functions/manage-functions) you will need to use Node 10 to build and deploy the Cloud Functions side of this project. _CircleCI is already set up for this_

Consider using the Node Version Manager: [nvm](https://github.com/nvm-sh/nvm) to make this all a lot easier.

This project specifically uses Node Version `node:10.16.3` for its build and cloud functions.

Also, remember to set up your [Local Emulator](https://firebase.google.com/docs/functions/local-emulator) properly with:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
```

Local Host URL for a given function will be at: `localhost:5000/qlab-cc/asia-northeast1/didUserQuizYesterday`

## The QLAB Team

### <img src="misc/eriko.png" width="50px"> Eriko [@nouvelle](https://www.github.com/nouvelle)

<!-- Frontend, Testing, React/Redux -->

### <img src="misc/derek.png" width="50px"> Derek Forbes [@forbesd7](https://www.github.com/forbesd7)

<!-- Frontend, React/Redux -->

### <img src="misc/fraser.png" width="50px"> Fraser Tooth [@frasertooth](https://www.github.com/frasertooth)

<!-- Backend, Firebase/Firestore, Circle CI -->

### <img src="misc/vic.png" width="50px"> Vic Sidious [@sidiousvic](https://www.github.com/sidiousvic)

<!-- UI/UX, React, Material UI -->
