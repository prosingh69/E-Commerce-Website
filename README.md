# 🚀 CyberMart: Modern E-Commerce UI & Payment Demo

**CyberMart** is a modern and visually striking e-commerce web application designed to showcase a premium online store experience. This project primarily focuses on the sleek frontend UI, built with a dark, cyber-themed aesthetic, and features a functional **Razorpay payment integration** demonstrating a core e-commerce workflow.

It serves as a **UI/UX prototype** ready for immediate scale-up into a full-stack application.

-----

## ✨ Key Features

### 💻 Frontend & UI/UX

  * **Cyber-Themed Aesthetic:** Features a dark, futuristic look with strong orange/amber accents and smooth transitions, styled using custom CSS.
  * **Dynamic Visuals:** Utilizes the **particles.js** library to create an engaging, animated background on the main page.
  * **Interactive Product Gallery:** Allows users to smoothly switch between product images based on color selection and thumbnail clicks using vanilla JavaScript.
  * **Responsive Design:** Optimized to provide a seamless user experience across all modern devices.

### 💳 Payment & Order Flow

  * **Razorpay Integration:** Demonstrates a functional order flow. The order modal dynamically calculates the total price, which is then passed to the **Razorpay Checkout SDK** upon submission.
  * **Order Modal:** A dedicated modal handles user details collection and dynamic price display before redirecting to the payment gateway.

-----

## 🛠️ Tech Stack Used

This project leverages client-side technologies and is structured for migration to a popular full-stack environment.

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **HTML5, CSS3, JavaScript (Vanilla)** | Core UI structure, styling, and client-side logic. |
| **Payment Gateway** | **Razorpay Checkout SDK** | Initiates the secure payment pop-up and transaction flow. |
| **Visual Effects** | `particles.js` | Provides the dynamic, animated background visual. |
| **Styling** | Custom CSS (`style.css`, `auth.css`) | Implementing the dark theme, glow effects, and responsive layout. |

-----

## 💡 Future Scope & Backend Readiness

The project's structure is fully prepared for implementing a secure, scalable backend, turning the UI demo into a fully functional application.

| Area | Plan | Technologies |
| :--- | :--- | :--- |
| **Authentication** | Implement full user registration and login functionality. | **Node.js, Express.js, MongoDB** |
| **Security** | Secure user data by hashing passwords and managing user sessions. | **Bcryptjs, JSON Web Tokens (JWT)** |
| **Navbar State** | Dynamically update the Navbar upon login, replacing the buttons with the user's profile picture/logo. | JavaScript/DOM Manipulation |
| **Server-Side Payments** | Shift Razorpay key usage and order creation to the server for enhanced security. | Node.js/Express.js |

-----

## ⚙️ Setup and Running Locally

To get a copy of the project up and running on your local machine:

1.  **Initialize Git (Optional):** If your current directory isn't a Git repository, you can initialize one (this is why you saw the error `not a git repository`).
    ```bash
    git init
    ```
2.  **Clone the Repository:**
    ```bash
    # Replace [Your Repository URL] with the actual GitHub link
    git clone [Your Repository URL]
    cd CyberMart
    ```
3.  **Open in Browser:** Simply open the `index.html` file in any modern web browser to view the main product page.
4.  **Test Authentication UI:** Open `auth.html` to view the Login and Sign Up form structure.

> **Note:** The Razorpay integration is functional in test mode. To use it in production, you must move the API key usage to a secure backend environment.
-----

## 🧑‍💻 Author

  * **Your Name** prosingh69
