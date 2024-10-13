# LaundryMoneyAlly

![Build Status](https://img.shields.io/github/actions/workflow/status/maboni/laundry-money-ally/docker-publish.yml?branch=main&style=for-the-badge)
![License](https://img.shields.io/github/license/maboni/laundry-money-ally?style=for-the-badge)
![Repo Size](https://img.shields.io/github/repo-size/maboni/laundry-money-ally?style=for-the-badge)
[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-laundry--money--ally-blue?logo=docker&style=for-the-badge)](https://hub.docker.com/r/maboni82/laundry-money-ally)
[![Docker Pulls](https://img.shields.io/docker/pulls/maboni82/laundry-money-ally?style=for-the-badge)](https://hub.docker.com/r/maboni82/laundry-money-ally)

A fun, lightweight app to help you track tasks for your kids and manage their pocket money! **LaundryMoneyAlly** features a mobile-friendly React frontend, a Python-based API backend with SQLAlchemy, and easy-to-use Dockerized setup.

## Features
- **Easy Task Management** – Keep track of chores and completed tasks for each child.
- **Allowance Tracking** – Automatically calculate and track earned pocket money.
- **User-Friendly Interface** – Large buttons and a blue color scheme make it kid-friendly on mobile.
- **Dockerized Setup** – Quick and easy deployment with Docker.

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/maboni/laundry-money-ally.git
    cd laundry-money-ally
    ```

2. **Build and run the Docker container**:
    ```bash
    docker-compose up -d
    ```

3. Your app is now accessible at `http://localhost:3000`, ready for you to start managing tasks and allowances!

### Exposing with Nginx Proxy Manager
If you are using [![Nginx Proxy Manager](https://img.shields.io/badge/Nginx_Proxy_Manager-GitHub-blue?logo=github)](https://github.com/NginxProxyManager/nginx-proxy-manager), configure it to point to this app, using `http://<your-server-ip>:3000`.

## Usage
Log in to the app to add tasks, mark them as complete, and automatically calculate your kids' allowances. Each task logs the completion date, and the backend API makes it easy to integrate with other systems if desired.

### Example Task Entry
```markdown
{
  "task": "Empty dishwasher",
  "child": "Naja",
  "completed": true,
  "date": "2024-10-13",
  "amount": 5
}
```

## Demo
Access a live demo of this service at [https://demo-lma.bondit.dk](https://demo-lma.bondit.dk)

## Technologies Used
- **React** – Frontend framework for an interactive UI.
- **Python** – Backend language for API development.
- **SQLAlchemy** – ORM for managing and interacting with the database.
- **alembic** - A lightweight database migration tool for usage with SQLAlchemy. 
- **Docker** – Ensures a consistent and reproducible deployment environment.

## Docker Hub Repository
You can pull the Docker image directly from Docker Hub:
[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-laundry-money-ally-blue?logo=docker&style=for-the-badge)](https://hub.docker.com/r/maboni82/laundry-money-ally)

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Built to encourage kids to learn about responsibility and earning their allowance.
- Created with love for easy deployment and family-friendly use.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

## Repobeats Analytics
---

![Alt](https://repobeats.axiom.co/api/embed/3ec5342430d0e6a88653e4756fb02c6692b1d50b.svg "Repobeats analytics image")

---