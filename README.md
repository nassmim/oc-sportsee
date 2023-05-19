# Sportsee, analytics dashboard built with React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 1. FRONT-END

### 1.1 Stack

<ul>
<li>Node 19.3.0</li>  
<li>React ^18.2.0</li>  
</ul>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" /></a>
<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" /></a>

### 1.2 Main Librairies

<ul>
<li>react-router-dom</li>
<li>axios</li>
<li>prop-types</li>
<li>styled-components</li>
</ul>

### 1.3 Installation guide

#### Node.js

The project uses Node packages and uses `npm`, so the installation of Node.js in your IDE is required

> [Install Node.js](https://nodejs.org/en/)

#### Clone repo

Once Node.js has been successfully added to your IDE, you'll need to:

<ol>
<li>Fork the Front-end repository</li>
<li>Clone it locally with with <code>git clone</code></li>
</ol>

#### Dependencies

Afterwards you'll need to install all the project dependencies with `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

This is the only one that you should use for now.
It runs the app in the development mode.
It should launch automatically the web application in your default browser.
If not, you can copy paste this link :
[http://localhost:3000](http://localhost:3000) to view it in your browser.
If 3000 is already used, you might need to replace it by the correct port open by your machine.

The page will reload when you make changes.You may also see any lint errors in the console.

### `npm test`

Should not be used for now. Classic test runner [Create React App](https://github.com/facebook/create-react-app) script.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Should not be used for now. Classic [Create React App](https://github.com/facebook/create-react-app) script for prod env.
Builds the app for production to the `build` folder.
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

Should not be used for now. Classic eject [Create React App](https://github.com/facebook/create-react-app) script.
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## 2. BACK-END & API

Everything related to the backend is explained here:
(https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard.git)

## 3. DATA FETCHING

### 3.1 MOCKED DATA

To use only mocked data, go to the file 'user.js' within the folder 'services'

```
P12/
|
|– src/
|   |– ...
|   |– services
|   |   |- ...
|   |   |- user.js
```

And change this line of code:

```js
const isApiAvailable = true
```

to:

```js
const isApiAvailable = false
```

### 3.2 API

To get data through backend api, follow the steps above and set the variable `isApiAvailable` to true

Then go to file axios within folder api

```
P12/
|
|– src/
|   |– ...
|   |– services
|   |   |- ...
        |- api
|   |   |   |- ...
|   |   |   |- axios.js
```

And update the line below accordingly to the url of your backend.

```js
export default axios.create({
  baseURL: " http://localhost:3000/",
})
```

*⚠Normally it should be your localhost and on port 3000. You might have to change the port number.
If the URL origin endpoint is not your localhost, replace it with your appropriate API root endpoint.*⚠

### 3.3 Endpoints

There is currently has only one route → `user` and contains only GET requests.

| HTTP Verb | Endpoints                      | Body of the request                                                                                                                                                                                                                  | Description of the info received                                                                                                                                                                                 |
| --------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET       | /user/:userId                  | {"data": {"id":[number],"userInfos":{"firstName":[string],"lastName":[string],"age":[number]},"todayScore":[number],"keyData":{"calorieCount":[number],"proteinCount":[number],"carbohydrateCount":[number],"lipidCount":[number]}}} | Retrieves information from a user. This first endpoint includes the user id, user information (first name, last name and age), the current day's score (todayScore) and key data (calorie, macronutrient, etc.). |
| GET       | /user/:userId/activity         | {"data":{"userId":[number],"sessions":[{"day":[string],"kilogram":[number],"calories":[number]}, ...]}}                                                                                                                              | Retrieves a user's activity day by day with kilograms and calories.                                                                                                                                              |
| GET       | /user/:userId/average-sessions | {"data":{"userId":12,"sessions":[{"day":1,"sessionLength":30}, ...]}}                                                                                                                                                                | Retrieves the average sessions of a user per day. The week starts on Monday.                                                                                                                                     |
| GET       | /user/:userId/performance      | { "data": { "userId": 12, "kind": { "1": "cardio", "2": "energy", "3": "endurance", "4": "strength", "5": "speed", "6": "intensity" },"data": [{"value": [number],"kind": [number]},...]}}                                           | Retrieves a user's performance (energy, endurance, etc.)                                                                                                                                                         |
