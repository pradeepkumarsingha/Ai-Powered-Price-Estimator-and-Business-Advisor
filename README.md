# AI-Powered Real Estate Price Estimator & Investment Advisor

This project turns an existing Flask-based property valuation model into a full MERN-style product:

- `backend/`: Express API that validates requests, calls Flask, stores predictions in MongoDB, and exposes history and insights endpoints
- `frontend/`: React + Vite + Tailwind application with prediction flow, dashboard charts, history table, and product pages
- `models/`: Existing trained ML model and Flask inference app

## Backend setup

1. Copy `backend/.env.example` to `backend/.env`
2. Set `MONGO_URI` and `FLASK_API_URL`
3. Install dependencies:
   - `cd backend`
   - `npm install`
4. Start the API:
   - `npm run dev`

## Frontend setup

1. Copy `frontend/.env.example` to `frontend/.env`
2. Install dependencies:
   - `cd frontend`
   - `npm install`
3. Start the app:
   - `npm run dev`

## Existing Flask model

The existing Flask service should keep running separately and expose `POST /predict` on `http://localhost:5000/predict`.
