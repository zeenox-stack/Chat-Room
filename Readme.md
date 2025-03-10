# ChatRoom Project

## Introduction:

- ### Description:

  This a online chatroom project to demonstrate my understanding of **Go's** WebSocket, this app can store upto users and has basic chat functionality.

- ### Tech Stack Used:

  - Frontend:
    - **React** + **Typescript**
    - **Tailwindcss**
    - **GSAP**
  - Backend:
    - **Go**
    - **Gorilla Websocket**

- ### Live Url: [Live](https://chat-room-one-dun.vercel.app/)

- ### Architecture:

  - Frontend:
    The frontend follows a **hybrid modular approach**, organizing the code into separate folders for **Hooks, Animations, and Components**.

  - Backend:
    The backend follows a **microservice-like design**, but it is deployed as a single service rather than separate microservices.

---

## Getting Started:

- ### Installation Guide:
  1. Clone The Repository
     - **Copy the repository URL** from GitHub.
     - **Open your terminal** (Git Bash, Command Prompt, or macOS/Linux Terminal).
     - Run the following command:
       `bash
    git clone https://github.com/username/repository.git
    ` - Navigate to the current repository:
       `bash 
cd repository
 `
  2. Run The Project:
     - Frontend:
       - Navigate to Frontend:
         ```bash
             cd Frontend
         ```
       - Now Run the Following code:
         ```bash
             npm run dev
         ```
       - That's it now your **Frontend's** running on port **5173**.
     - Backend:
       - Navigate to Backend:
         ```bash
         go run main.go
         ```
       - Wait till you see the message in terminal:
         ```bash
         Backend is running on http:localhost:8000/
         ```
       - That's it now the **Backend's** also running.
  3. Connect to the **Backend** from the **Frontend**:
     - Locate to the Frontend in your browser:
       - Go to: http://localhost:5173/
     - Now Enter a Username, it must be more than 3 characters long and hit submit.
     - It will send a socket handshake request to the backend at `/join`.

And that's how the app works, now you can chat with others and have fun.

## Folder Structure:

```bash
project-root/
├── Backend/ # Go backend (WebSockets)
│ ├── handlers/ # Request & WebSocket handlers
│ ├── main.go # Main entry point
│ ├── go.mod # Dependencies
│ ├── go.sum # Lockfile
├── Frontend/ # React frontend
│ ├── public/ # Static assets
│ ├── src/ # React source files
│ │ ├── Animations/ # GSAP animations
│ │ ├── assets/ # Static images/icons
│ │ ├── Components/ # Reusable UI components
│ │ ├── Hooks/ # Custom hooks
│ │ ├── App.tsx # Root component
│ │ ├── main.tsx # React entry point
├── .gitignore # Ignore unnecessary files
├── index.html # Main HTML file
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
