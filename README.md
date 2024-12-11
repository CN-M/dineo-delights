# 🍰 Dineo Delights E-Commerce

Welcome to the **Dineo Delights E-Commerce** project! This is a full-featured e-commerce application designed to provide a seamless shopping experience. The application is built using modern web technologies and integrates with Sanity for real-time content management.

---

## ✨ Features
- 🛍️ User-friendly interface for browsing products.
- 📂 Organized product categories and detailed product pages.
- 🛒 Shopping cart functionality for easy purchasing.
- 👤 User account management.
- 📡 Real-time content management with **Sanity**.
- 📱 Responsive design for both mobile and desktop devices.

---

## 🛠️ Technologies Used

### Frontend
- ⚛️ React
- ⚡ Vite
- 🎨 CSS/Sass

### Backend
- 🗄️ Sanity (for content management)

### Deployment
- 🌐 Netlify

### State Management
- 🌟 Context API

### Styling
- 💅 Styled-components
- 🎨 CSS Modules

---

## 🚀 Getting Started

Follow the instructions below to get started with the **Dineo Delights E-Commerce** application.

---

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CN-M/dineo-delights.git
   cd dineo-delights
   ```

2. Install dependencies for both the **Client** and **CMS**:
   ```bash
   # For Client
   cd Client
   npm install

   # For CMS
   cd ../CMS/delights
   npm install
   ```

3. Set up environment variables for Sanity:
   Create a `.env` file in the **Client** directory and add your Sanity project configuration:
   ```plaintext
   VITE_PROJECT_ID=your_project_id
   VITE_DATASET=your_dataset
   VITE_TOKEN=your_token
   ```

---

## 🖥️ Usage

To run the application in development mode, use the following commands:

1. Start the CMS:
   ```bash
   cd CMS/delights
   npm run dev
   ```

2. Start the Client:
   ```bash
   cd ../Client
   npm run dev
   ```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📄 License

This project is licensed under the **MIT License**. Goodluck navigating my sphagetti code.
```