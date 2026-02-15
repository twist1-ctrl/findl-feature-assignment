# Feature Request System

A feature request management system built with Node.js, Prisma, and PostgreSQL.

## Project Approach

This project prioritizes **server-side development first** to establish a robust backend with real data and proper database structure. This approach eliminates unnecessary mocking and ensures the client side works with actual, production-ready data from day one.

## Installation & Setup
### Docker (Recommended)

1. Start the database:
   ```bash
   docker compose up -d db
   ```

2. Run initial Prisma migration (creates tables):
   ```bash
   cd backend
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/findl_db" npx prisma migrate dev --name init --schema ./prisma/schema.prisma
   cd ..
   ```

3. Build and start all services:
   ```bash
   docker compose up --build
   ```

4. Open the app in your browser:
   ```
   http://localhost:8080
   ```

5. API is available at:
   ```
   http://localhost:3000
   ```

6. Stop services:
   ```bash
   docker compose down
   ```

### Client Setup

1. Go to the client folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install TailwindCSS and Vite plugin:
   ```bash
   npm install tailwindcss @tailwindcss/vite postcss autoprefixer
   ```

4. Add Tailwind directives to src/index.css:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

6. Build for production:
   ```bash
   npm run build
   ```
### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd findl-feature-assignment
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your PostgreSQL database URL:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/findl_db"
   ```

4. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the server**
   ```bash
   npm run dev
   ```

## Database Schema

### Models

| Model | Description |
|-------|-------------|
| **User** | System users with email, name, and avatar |
| **FeatureRequest** | Feature requests with title, description, and status |
| **Vote** | User votes on feature requests (one vote per user per feature) |
| **Reaction** | User comments/reactions on feature requests |

### FeatureStatus Enum
- `PENDING` - Awaiting review
- `APPROVED` - Feature approved
- `REJECTED` - Feature rejected
- `IN_PROGRESS` - Currently being developed
- `COMPLETED` - Feature completed
