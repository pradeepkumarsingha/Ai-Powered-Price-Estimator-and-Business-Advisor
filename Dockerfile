# ---------- FRONTEND BUILD ----------
FROM node:18 as frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN npm run build


# ---------- BACKEND ----------
FROM node:18

WORKDIR /app

# backend install
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# copy backend code
COPY backend ./backend

# copy frontend build into backend public folder
COPY --from=frontend-build /app/frontend/dist ./backend/public

# expose port
EXPOSE 5000

# run backend
CMD ["node", "backend/server.js"]