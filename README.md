# AgriLink - Frontend Setup Guide

This repository is the frontend for the AgriLink project, built using Vite, React, TailwindCSS, and ShadCN UI components. Follow the steps below to clone the repository, set up your development environment, and start making changes to the code.

## Prerequisites

- **Git** - To clone the repository
- **Node.js** - Ensure you have [Node.js](https://nodejs.org/) installed (preferably version 16 or higher)

## Steps to Setup

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/Junaid059/AgriLink-Complete-Frontend-.git

```
Once the repository is cloned, navigate into the project directory

### 2. Open the Project in Visual Studio Code

Open the project folder in Visual Studio Code (VS Code). If you're using VS Code, you can do this directly from the terminal:

```bash
code .

```
### 3. Install Dependencies

I am using Vite for fast development and React for building the user interface. TailwindCSS is used for styling, and ShadCN UI components are included for reusable UI components.

In your terminal, navigate to the Frontend directory and install the dependencies:

```bash
cd Frontend
npm install

```
This will install the following:

- **Vite** - A build tool for fast development and production-ready builds.
- **React** - The JavaScript library for building user interfaces.
- **TailwindCSS** - A utility-first CSS framework for styling.
- **ShadCN UI** - A set of customizable UI components.

### 4. Explore the Folder Structure

After installing the dependencies, you can explore the following structure:

- **src/components** : This folder contains the ShadCN UI components.
- **src/comps** : This folder contains various microservice-specific components. Inside this folder, you will find subfolders named after each microservice.

### 5. Modify Your Microservice Components

To modify components related to your microservice:

- **Navigate** to the src/comps directory.
- **Find** the folder named after your microservice (e.g., collaboration, loan, etc.).
- **Open the folder** , and you'll find several components for your service.
- **Edit the components**  as needed for your microservice. You can add new components, update existing ones, or make other changes to fit your requirements.

## Branching and Collaboration

This repository uses a branching model for group collaboration. There are 15 branches, each named after a specific group (e.g., group1, group2, etc.).

### 6. Switch to Your Group Branch

Switch to your assigned group branch:

```bash 
git checkout group<number>

```

Replace <number> with your group number.

### Making Changes

- **Make your changes** in the corresponding microservice folder or any relevant files.
- **Stage and commit**  your changes:

```bash
git add .
git commit -m "Your descriptive commit message"
```
- **Push your changes** to the remote branch:

```bash
git push origin group<number>
```

### Creating a Pull Request

Once changes are pushed, create a Pull Request (PR) to merge your branch into the main branch:

1. Go to the repository on GitHub.
2. Click on the Pull Requests tab.
3. Click New Pull Request.
4. Select your branch as the source and main as the target.
5. Add a description of your changes and submit the PR.

## Libraries Used

This project uses the following libraries and frameworks:

- **Vite** : Lightning-fast frontend tooling for modern web apps.
- **React** : A JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **ShadCN UI**: Component library for consistent and elegant UI design.
- **React Router**: For client-side routing.
- **context Api** for state management.
- **And more** (check package.json for the full list).

With this guide, you should be able to set up and work on the AgriLink Frontend project with ease. Happy coding! 🚀
