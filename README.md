# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Task Manager App built with React.js & Express for Backend

It allows users to add, track, and manage tasks efficiently, with data persistence through localStorage. The app includes a login/logout system, dynamic routing with React Router, and a clean, responsive layout.

## 🚀 Features

✅ Add Tasks: Add new people and their tasks dynamically.

🗑️ Delete Tasks: Remove tasks and automatically update local storage.

✏️ Progress Tracking: Set task progress as “Done”, “In Progress”, or “Delayed”.

💾 Persistent Data: Tasks are saved in localStorage and stay even after page refresh.

## 🔐 Login / Logout Routing:

Navigate to a login page using React Router.

Logout button redirects back to the login screen.

## 🎨 Custom Styling:

Google Fonts integration.

Modular CSS files for clean UI organization.

⚡ Responsive Design: Works smoothly across devices.

## 🧠 Technologies Used

React.js (Frontend Framework)

React Router DOM (Routing & Navigation)

CSS Modules / Custom Styles

LocalStorage API (Frontend data persistence)

## 🧩 Component Structure (Simplified)

src/
│
├── components/
│ ├── AddPerson.jsx # Form to add new tasks
│ ├── RenderTasks.jsx # Displays list of tasks and manages state
│ ├── LoginPage.jsx # Login layout component
│ ├── LogoutLink.jsx # Handles logout redirect
│
├── App.jsx # Root component, renders routes
├── main.jsx # React entry point
└── index.css # Global styles (Google Fonts imported here)

## ⚙️ How It Works

When the user opens the app, the RenderTasks component loads saved tasks from localStorage (if any).

The user can fill out the Add Task form and click Add to create a new entry.

The new task appears instantly in the task list.

Clicking Logout redirects to the Login Page using useNavigate() from React Router.

Deleting tasks or adding new ones automatically updates localStorage.

## 🖋️ Example Code Snippet

const handleSubmit = (e) => {
e.preventDefault();

if (
!formData.name.trim() ||
!formData.task.trim() ||
!formData.progress.trim()
) {
alert("Please fill out all fields before adding a person.");
return;
}

const newPerson = { id: Date.now(), ...formData };
onAdd(newPerson);
setFormData({ name: "", task: "", progress: "" });
};

## 🧱 Installation & Setup

1. Clone the repository: git clone https://github.com/your-username/task-manager-app.git

2. Navigate into the project folder: cd task-manager-app

3. Install dependencies: npm install

4. Run the development server: npm run dev

5. Open your browser and visit: http://localhost:5173/

## 🗃️ Future Improvements

🔐 Integrate real backend authentication (MongoDB + Node.js).

🧾 Add user-specific task storage.

📅 Add task deadlines and sorting options.

🌓 Add dark mode toggle.

✅ Implement Redux or Context for global state management.

## 🧑‍💻 Author

David Garcia
Frontend Developer | Aspiring Full Stack Engineer
📧 dgarcia123david@gmail.com
