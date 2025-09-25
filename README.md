# AdminCMS - Beautiful CMS/Admin Dashboard

A modern, full-featured Content Management System built with React, TypeScript, and Node.js, designed to work seamlessly with XAMPP MySQL.

## 🚀 Features

### ✨ Core Features
- **Beautiful Admin Dashboard** - Modern, responsive design with dark mode support
- **User Authentication** - Secure login/register with JWT tokens
- **User Management** - Complete CRUD operations for users with role-based permissions
- **Page Builder** - Drag-and-drop interface for creating dynamic webpages
- **Plugin System** - Extensible architecture with built-in plugins
- **Database Integration** - Full MySQL integration with XAMPP support

### 🔌 Built-in Plugins
- **WYSIWYG Editor** - Rich text editor with formatting tools
- **Markdown Editor** - Professional markdown editor with live preview
- **Image Uploader** - Advanced drag-and-drop image upload system
- **Notifications System** - Real-time notification management
- **SEO Optimizer** - Tools for optimizing content for search engines
- **Analytics Dashboard** - Comprehensive analytics and reporting

### 🛠 Admin Tools
- **Database Manager** - Visual database management interface
- **Settings Panel** - Comprehensive configuration options
- **Analytics Dashboard** - User engagement and performance tracking
- **Security Features** - Role-based access control and security monitoring

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v16 or higher)
2. **XAMPP** installed and running
3. **MySQL** service started in XAMPP Control Panel

## 🚀 Quick Start

### 1. Clone and Install Dependencies

\`\`\`bash
git clone <repository-url>
cd admin-cms
npm install
\`\`\`

### 2. Setup XAMPP Database

1. Start XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. The database `admin_cms` will be created automatically when you start the server

### 3. Configure Environment

The `.env` file is already configured for XAMPP defaults:

\`\`\`env
# Database Configuration (XAMPP Defaults)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=admin_cms

# JWT Secret (Change in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3001
NODE_ENV=development
\`\`\`

### 4. Start the Application

\`\`\`bash
# Start both frontend and backend
npm run dev:full

# Or start them separately:
# Terminal 1 - Backend API
npm run server

# Terminal 2 - Frontend
npm run dev
\`\`\`

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

### 6. Default Login Credentials

\`\`\`
Email: admin@cms.com
Password: admin123
\`\`\`

## 📁 Project Structure

\`\`\`
admin-cms/
├── src/                          # Frontend React application
│   ├── components/              # React components
│   │   ├── Auth/               # Authentication components
│   │   ├── Dashboard/          # Dashboard components
│   │   ├── Database/           # Database management
│   │   ├── Layout/             # Layout components
│   │   ├── PageBuilder/        # Page builder components
│   │   ├── Plugins/            # Plugin components
│   │   ├── Settings/           # Settings panel
│   │   └── Users/              # User management
│   ├── services/               # API services
│   └── App.tsx                 # Main application component
├── server/                      # Backend Node.js application
│   ├── config/                 # Database configuration
│   ├── middleware/             # Express middleware
│   ├── routes/                 # API routes
│   └── server.js               # Main server file
├── .env                        # Environment variables
└── package.json                # Dependencies and scripts
\`\`\`

## 🗄️ Database Schema

The application automatically creates the following tables:

- **users** - User accounts and authentication
- **pages** - Website pages and content
- **plugins** - Plugin management and settings
- **media** - File uploads and media management
- **notifications** - System notifications
- **analytics** - Website analytics data
- **settings** - Application configuration

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (admin/editor)
- `POST /api/users` - Create user (admin)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Pages
- `GET /api/pages` - Get all pages
- `POST /api/pages` - Create page (admin/editor)
- `PUT /api/pages/:id` - Update page (admin/editor)
- `DELETE /api/pages/:id` - Delete page (admin/editor)

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-based Access Control** - Admin, Editor, and User roles
- **Password Hashing** - Bcrypt password encryption
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Configured for development and production

## 🎨 Customization

### Themes and Styling
- Built with Tailwind CSS for easy customization
- Dark mode support included
- Responsive design for all screen sizes

### Plugin Development
The plugin system allows for easy extension:

1. Create a new component in `src/components/Plugins/`
2. Add plugin metadata to the plugin management system
3. Register the plugin in the main application

## 🚀 Deployment

### Production Build

\`\`\`bash
# Build frontend
npm run build

# Start production server
NODE_ENV=production npm run server
\`\`\`

### Environment Variables for Production

Update `.env` for production:

\`\`\`env
NODE_ENV=production
DB_HOST=your-production-host
DB_USER=your-production-user
DB_PASSWORD=your-production-password
JWT_SECRET=your-very-secure-jwt-secret
\`\`\`

## 🐛 Troubleshooting

### Database Connection Issues

1. **XAMPP not running**: Ensure MySQL service is started in XAMPP Control Panel
2. **Port conflicts**: Check if port 3306 is available
3. **Permission issues**: Run XAMPP as administrator if needed

### Common Errors

- **"Database connection failed"**: Check XAMPP MySQL service
- **"Port 3001 already in use"**: Change PORT in .env file
- **"JWT token invalid"**: Clear browser localStorage and login again

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review the API documentation
- Check XAMPP configuration

---

**Built with ❤️ using React, TypeScript, Node.js, and MySQL**
