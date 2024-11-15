# Library Management System

## Project Description

The **Library Management System** is a comprehensive web-based application for managing a library's book inventory, borrowing, and returning processes. It offers functionalities for CRUD (Create, Read, Update, Delete) operations on books and members, as well as tracking borrow records and overdue books. The system also manages the available copies of books and ensures the proper maintenance of member records, supporting staff in monitoring library operations.

Key features include:

- **Book Management**: Create, read, update, and delete books, with the ability to track the number of available and total copies.
- **Member Management**: Manage library members, including adding new members and updating their records.
- **Borrowing & Returning Books**: Members can borrow and return books, updating the available copies in real time.
- **Overdue Tracking**: Track overdue books and manage penalties or notifications for overdue items.

## Live URL

You can access the live deployment of the backend at:  
[Library Management System Backend](https://library-management-system-api-omega.vercel.app)

## Technology Stack & Packages

This project is built using the following technologies:

- **Backend**:
  - Node.js
  - Express.js
  - Prisma (for database ORM)
  - TypeScript
  - Prisma Client
  - HTTP Status (http-status)
  - CORS (Cross-Origin Resource Sharing)
- **Database**:
  - PostgreSQL

## Setup Instructions

### Prerequisites

Before setting up the application, ensure you have the following installed:

- **Node.js** (version 14.x or above)
- **npm** or **yarn** for managing dependencies
- **PostgreSQL** (or any other database supported by Prisma)

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jayed-islam/phl2-assignment8-library-management-system-api
   cd lphl2-assignment8-library-management-system-api

   npm install
   ```
