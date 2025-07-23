# Code Hustle 🚀

A modern competitive programming platform built for developers who demand excellence. Code Hustle provides a cutting-edge environment for solving algorithmic challenges, competing with developers worldwide, and mastering competitive programming skills.

![Code Hustle](https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🎯 Core Features
- **Advanced Code Editor**: Monaco Editor with syntax highlighting, IntelliSense, and multi-language support
- **Lightning Fast Execution**: Secure Docker containers with optimized runtime environments
- **Global Leaderboards**: Compete with developers worldwide and track your progress
- **Real-time Contests**: Live competitions with instant feedback and rankings
- **AI Assistant**: Get hints, debugging help, and code optimization suggestions
- **Collaboration Tools**: Real-time code sharing and pair programming capabilities

### 💻 Supported Languages
- Python
- JavaScript
- C++

### 🏆 Competition Features
- Live contests and competitions
- Global leaderboard rankings
- Problem difficulty levels (Easy, Medium, Hard)
- Comprehensive test case coverage
- Detailed performance analytics

### 🤖 AI-Powered Features
- Intelligent code hints and suggestions
- Automated debugging assistance
- Algorithm optimization recommendations
- Real-time collaboration support

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Monaco Editor** for code editing
- **React Router** for navigation
- **Zustand** for state management
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **JWT** authentication
- **bcryptjs** for password hashing
- **CORS** enabled

### Development Tools
- **Vite** for fast development and building
- **ESLint** for code linting
- **TypeScript** for type safety
- **Nodemon** for development server

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-hustle.git
   cd code-hustle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=code_hustle
   DB_USER=your_username
   DB_PASSWORD=your_password

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key

   # Server Configuration
   PORT=5000
   ```

4. **Set up the database**
   ```bash
   # Create the database and run migrations
   psql -U your_username -c "CREATE DATABASE code_hustle;"
   psql -U your_username -d code_hustle -f supabase/migrations/20250531061427_patient_ocean.sql
   ```

5. **Start the development servers**

   **Frontend (Terminal 1):**
   ```bash
   npm run dev
   ```

   **Backend (Terminal 2):**
   ```bash
   npm run server:dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
code-hustle/
├── public/                 # Static assets
├── src/                   # Frontend source code
│   ├── components/        # Reusable React components
│   │   ├── common/       # Common UI components
│   │   └── features/     # Feature-specific components
│   ├── contexts/         # React contexts (Auth, Theme)
│   ├── layouts/          # Page layouts
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions and data
│   └── main.tsx          # Application entry point
├── server/               # Backend source code
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── validators/      # Input validation
│   └── index.js         # Server entry point
├── supabase/            # Database migrations
└── package.json         # Project dependencies
```

## 🎮 Usage

### For Users
1. **Sign Up**: Create an account to start solving problems
2. **Browse Problems**: Explore the problem set with various difficulty levels
3. **Code & Submit**: Use the advanced code editor to write and submit solutions
4. **Compete**: Join live contests and climb the leaderboards
5. **Learn**: Use the AI assistant for hints and learning opportunities

### For Administrators
- Access the admin dashboard at `/admin`
- Manage problems, users, and contests
- View platform analytics and statistics

## 🏗️ Development

### Available Scripts

```bash
# Frontend development
npm run dev              # Start Vite dev server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint

# Backend development
npm run server          # Start production server
npm run server:dev      # Start development server with nodemon
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling
- Component-based architecture

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔐 Authentication

The platform uses JWT-based authentication with the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/protected` - Protected route example

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 🎨 UI/UX Features

- **Dark Theme**: Developer-focused dark theme by default
- **Responsive Design**: Works seamlessly on all device sizes
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Smooth Animations**: Subtle animations for better user experience
- **Modern Design**: Clean, professional interface inspired by VS Code

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:

```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
Deploy the backend to any Node.js hosting service:

1. Set up environment variables on your hosting platform
2. Install dependencies: `npm install --production`
3. Start the server: `npm run server`

## 📊 Performance

- **Fast Loading**: Optimized bundle sizes with Vite
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Efficient caching strategies
- **Database Optimization**: Indexed queries and connection pooling

## 🔧 Configuration

### Theme Customization
The platform uses Tailwind CSS with a custom color palette optimized for developers. Colors can be customized in `tailwind.config.js`.

### Editor Settings
Monaco Editor settings can be modified in the problem detail page component to customize:
- Font family and size
- Theme preferences
- Language-specific settings

## 📈 Analytics & Monitoring

- User submission tracking
- Performance metrics
- Error logging and monitoring
- Real-time contest statistics

## 🤝 Community

- **Discord**: Join our developer community
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Comprehensive guides and tutorials

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Monaco Editor team for the excellent code editor
- Tailwind CSS for the utility-first CSS framework
- React team for the amazing frontend library
- All contributors who help make this project better

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/code-hustle/issues) page
2. Create a new issue with detailed information
3. Join our community Discord for real-time help

---

**Built with ❤️ for developers by developers**

*Code Hustle - Where competitive programming meets modern development*