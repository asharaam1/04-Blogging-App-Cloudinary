# BlogApp - Modern Blogging Platform

A full-stack blogging application built with modern web technologies, featuring user authentication, blog post management, and image upload capabilities.


## 🌟 Features

- **User Authentication**
  - Secure login and registration system
  - User profile management
  - Session handling

- **Blog Management**
  - Create, read, update, and delete blog posts
  - Rich text formatting
  - Image upload support via Cloudinary
  - Blog post categorization

- **User Dashboard**
  - Personalized dashboard for content management
  - Post analytics
  - User profile customization

- **Modern UI/UX**
  - Responsive design for all devices
  - Dark mode support
  - Smooth animations and transitions
  - Intuitive navigation

- **Additional Features**
  - Newsletter subscription
  - Social media integration
  - Search functionality
  - User notifications

## 🛠️ Technologies Used

### Frontend
- HTML5
- Tailwind CSS
- Font Awesome Icons
- Google Fonts (Roboto)

### Backend
- Firebase Authentication
- Firebase Firestore
- Cloudinary (Image Management)

## 📁 Project Structure

```
BlogApp/
├── index.html              # Main landing page
├── login.html             # User login page
├── register.html          # User registration page
├── dashboard.html         # User dashboard
├── userprofile.html       # User profile page (Private)
├── singleuser.html        # Individual user view (Public)
├── scripts/
│   ├── app.js            # Main application logic
│   ├── dashboard.js      # Dashboard functionality
│   ├── firebaseconfig.js # Firebase configuration
│   ├── login.js          # Login functionality
│   └── register.js       # Registration functionality
└── .gitignore            # Git ignore file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (if running locally)
- Firebase account
- Cloudinary account

### Installation

1. Clone the repository
```bash
git clone https://github.com/asharaam1/04-Blogging-App-Cloudinary.git
```

2. Set up Firebase
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Add your Firebase configuration to `scripts/firebaseconfig.js`

3. Set up Cloudinary
   - Create a Cloudinary account
   - Configure your upload widget

4. Open the project
   - Use a local server to run the project
   - Or deploy to your preferred hosting service

## 🔧 Configuration

### Firebase Configuration
Add your Firebase configuration in `scripts/firebaseconfig.js`:
```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};
```

### Cloudinary Configuration
Configure your Cloudinary upload widget in the relevant JavaScript files.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👥 Authors

- **AshaRam** - *Initial work* - [Asha Ram](https://github.com/asharaam1)

## 🙏 Acknowledgments

- Firebase for backend services
- Cloudinary for image management
- Tailwind CSS for styling
- Font Awesome for icons

## 📞 Contact

For any queries or support, please reach out to:
- Email: lohanaasharaam1@gmail.com
- Instagram: [AR Official](https://www.instagram.com/_ar_official__/)
- LinkedIn: [Asha Ram](https://www.linkedin.com/in/asha-ram/)

---

Made with ❤️ by AshaRam
