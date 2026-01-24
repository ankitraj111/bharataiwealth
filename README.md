# Bharat AI Wealth

AI-powered wealth management platform for Bharat.

## 🌐 Live Demo
Check out the live application here: [https://ankitraj111.github.io/bharataiwealth/](https://ankitraj111.github.io/bharataiwealth/)

> **Note**: The site is deployed using GitHub Pages with GitHub Actions. Any push to the `main` branch will automatically trigger a new deployment.

## Recent Fixes
- **Login Issues Resolved**: Fixed a critical 500 error related to NULL boolean flags in the User entity.
- **Demo Mode**: Added a default demo user (`demo@bharatai.com` / `demo123`) for easy evaluation.
- **Frontend Logging**: Improved console error reporting for better transparency of API failures.

## Setup
### Backend
1. Configure PostgreSQL (`wealthdb`).
2. Run `mvn spring-boot:run` to start the API on port 8080.
3. Flyway will automatically apply migrations.

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Access at `http://localhost:3001`

### ML Service (Python)
1. `cd ml-service`
2. Recommended: Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the service:
   ```bash
   python main.py
   ```
   *The service runs on `http://localhost:8000`*
