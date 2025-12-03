# AI-Powered Furniture Generator

This project is a modern web application that allows users to generate unique furniture designs using AI. Users can select a furniture type, style, and material from a simple form, and the application interfaces with a backend workflow to generate and display the result.

## Features

*   **Intuitive UI:** A clean and simple form to select furniture options from dropdown menus.
*   **Dynamic AI Content:** Interfaces with an n8n workflow powered by Gemini to generate custom designs on the fly.
*   **Responsive Design:** The user interface is fully responsive and works seamlessly on both desktop and mobile devices.
*   **Modern User Experience:** Features a sleek card-based layout, smooth animations, and clear loading states to provide an engaging user experience.
*   **Asynchronous Operations:** Utilizes modern JavaScript (async/await) for non-blocking API calls, ensuring the UI remains fast and responsive while waiting for the AI to generate a design.

## How It Works

1.  The user selects their desired furniture attributes from the form on the main page.
2.  Upon clicking "Generate," the application sends the form data as a JSON payload to a predefined webhook URL.
3.  The UI transitions to a loading state, displaying an animation while it awaits the response.
4.  A backend workflow (powered by n8n) receives the data, processes it using the Gemini AI model, and returns an HTML snippet containing the generated design.
5.  The frontend receives the HTML and dynamically injects it into the result container for the user to view.

## Getting Started

To get this project running on your local machine for development and testing, follow these steps.

### Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Safari).
*   A local web server to serve the project files. The [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code is an excellent choice.
*   An active backend workflow (e.g., on n8n) with a webhook trigger that is configured to accept JSON data and return an HTML response.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/janmarccoloma/ai-powered-furniture.git
    cd ai-powered-furniture
    ```

2.  **Configure the Webhook URL:**
    Open the `script.js` file. The webhook URL is set near the top of the `handleFormSubmit` function. For development, you can modify the fallback URL directly. For production, it is recommended to manage this via environment variables.

    ```javascript
    // Best practice: Use an environment variable for the webhook URL if available.
    // You can create a config.js file for this in a real application.
    const webhookUrl = window.N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL_HERE';
    ```

3.  **Run the application:**
    If you are using the Live Server extension in VS Code, simply right-click the `index.html` file and select "Open with Live Server". Otherwise, serve the project directory with your preferred local server.
    If you are using a local server with PHP support like XAMPP or MAMP, place the project in the web root and navigate to it in your browser. For VS Code, the "PHP Server" extension is a good alternative to "Live Server" for `.php` files.

## Technologies Used

*   **PHP**
*   **HTML5 & CSS3:** Custom Properties (Variables), Flexbox, and Keyframe Animations
*   **JavaScript (ES6+):** DOM Manipulation, Fetch API, and Async/Await
*   **n8n & Gemini (Backend):** For workflow automation and AI-powered content generation.