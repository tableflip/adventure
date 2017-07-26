# TABLEFLIP Adventure

Like a contact form, but :fire: (when it's ready)

## Getting started

With `docker` >= `17.03.1-ce` installed

**Build it**

```sh
docker build -t adventure-web .
```
- `adventure-web` is a human friendly tag for the built image
- `.` tells it look at the `Dockerfile` in this dir.

**Run it**

```sh
docker run -p 4000:3000 adventure-web
```
- `-p 4000:3000` maps port `3000` inside the container to `4000` on your machine.
- `adventure-web` is the iamge we want to run.

## Reading list

- https://docs.docker.com/get-started/part2/#build-the-app
- https://github.com/nodejs/docker-node
- https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

**CLI**

* add a .githubrc to the project or your home directory (better)

Then either:

* make this repo a dev-dependency in your project
* add a run script like "adventure-cli": "adventure-cli"
* then you can do npm run adventure-cli, for options

Or:

* install globally and use adventure-cli directly.