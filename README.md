# qlab

![qlab logo](/misc/qlab-logo-1.png "QLAB Logo")

## QLAB, where effort is the currency.

QLAB is a learning envioronment where you can learn any topic to earn points.
You can then invest your points in your friends to benefit from their effort and create a collaborative growth environment.

![qlab screenshot of dashboard](/misc/qlab-screen.png "QLAB Dashboard")

### Try out the app @ [qlab-cc.web.app](https://qlab-cc.web.app/)

## Project

Our feature plans for the app:

- [ ] CI/CD Pipline ➰
- [ ] User can _sign in_ and _create personal profile_ 👤
- [ ] User can _take a quiz_ and gain points for it 👩🏻‍🏫
- [ ] Users can _invest_ points in their friends 💰
- [ ] _Investment statistics_ based on daily calculated _engagement score_ 🧮
- [ ] Dashboard 🎛
- [ ] Leaderboard 🔝
- [ ] Multiple quiz types 🧩
- [ ] Make it awesome! 🔥

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

## The QLAB Team

### <img src="misc/eriko.png" width="50px"> Eriko [@nouvelle](https://www.github.com/forbesd7)

<!-- Frontend, Testing, React/Redux -->

### <img src="misc/derek.png" width="50px"> Derek Forbes [@forbesd7](https://www.github.com/forbesd7)

<!-- Frontend, React/Redux -->

### <img src="misc/fraser.png" width="50px"> Fraser Tooth [@frasertooth](https://www.github.com/frasertooth)

<!-- Backend, Firebase/Firestore, Circle CI -->

### <img src="misc/vic.png" width="50px"> Vic Sidious [@sidiousvic](https://www.github.com/sidiousvic)

<!-- UI/UX, React, Material UI -->
