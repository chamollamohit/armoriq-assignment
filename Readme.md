# ArmorIQ Banking API

A secure, RESTful banking application built with **Node.js**, **Express**, and **PostgreSQL**. Designed with a production-grade **MVC Architecture** for the ArmorIQ Internship assignment.

## 🚀 Tech Stack

-   **Runtime:** Node.js (Express.js)
-   **Database:** PostgreSQL (Neon Tech)
-   **Architecture:** MVC (Model-View-Controller)
-   **Deployment:** Render (Web Service)
-   **Tools:** `pg` (Connection Pooling), `uuid` (Secure IDs), `cors`

## ⚙️ Setup & Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/chamollamohit/armoriq-assignment
    cd armoriq-banking-node
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment** Create a `.env` file in the root:

    ```bash
    PORT=8000
    DATABASE_URL=postgres://user:pass@ep-xyz.aws.neon.tech/neondb?sslmode=require
    ```

4.  **Run Server**

    ```bash
    npm start
    ```

## API Endpoints

| Method   | Endpoint           | Description                       |
| :------- | :----------------- | :-------------------------------- |
| **GET**  | `/`                | Health Check                      |
| **POST** | `/api/accounts`    | Create new account (Returns UUID) |
| **POST** | `/api/deposit`     | Deposit funds                     |
| **POST** | `/api/withdraw`    | Withdraw funds                    |
| **GET**  | `/api/balance/:id` | Check account balance             |
| **GET**  | `/api/history/:id` | View transaction history          |
