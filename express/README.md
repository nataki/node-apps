# Express App

A simple Express 5 REST API with static file serving, a people resource, and a login endpoint.

## Routes

| Method | Path          | Description              |
|--------|---------------|--------------------------|
| GET    | /             | Serves the HTML UI       |
| POST   | /login        | Authenticate by name     |
| GET    | /api/people   | List all people          |
| POST   | /api/people   | Add a new person         |

## Run with Docker

**Prerequisites:** [Docker](https://docs.docker.com/get-docker/) installed.

**Build the image:**

```bash
docker build -t express-app .
```

**Run the container:**

```bash
docker run -p 5001:5001 express-app
```

The app is available at `http://localhost:5001`.

**Stop the container:**

```bash
docker stop $(docker ps -q --filter ancestor=express-app)
```

Or find the container name with `docker ps` and run `docker stop <name>`.
