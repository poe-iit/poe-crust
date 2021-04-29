# POE Crust
A Front-End UI for modifying the POE network.

## Design
The POE Crust application uses [Node.js](https://nodejs.org/en/),
[Express.js](http://expressjs.com/), and
[Pug](https://pugjs.org/api/getting-started.html) for templating.

Useful resources are:
- [Pug Guide](https://blog.logrocket.com/getting-started-with-pug/)
- [Node/Express.js Guide](https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/)

## Build
To set up the project, you will need `npm` installed.

On Ubuntu/WSL,
```bash
$ sudo apt install npm
```

Then simply clone the repository, navigate into it, and build the project,
like so:
```bash
$ git clone git@github.com:poe-iit/poe-crust.git
$ cd poe-crust/
$ npm install
```

## Run
Running the project is as simple as running a specific command in the source
directory. This command is defined in `package.json` under the `scripts` section.

Example:
```bash
$ npm run dev
```
Then simply open the url (http://localhost:8000) in your preferred web browser.