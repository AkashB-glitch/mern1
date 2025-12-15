This is a minimal Express backend scaffold for the communityforum frontend.

Getting started:

1. Install dependencies

   npm install

2. Run in development

   npm run dev

3. Environment

Copy `.env.example` to `.env` and set `MONGO_URI` if you want MongoDB persistence.

Notes:
- This scaffold exposes `GET /api/profile` and `PUT /api/profile` backed by an in-memory user object by default.
- If `MONGO_URI` is provided, the server will attempt to connect to MongoDB but controllers are not wired to the DB in this minimal scaffold.
