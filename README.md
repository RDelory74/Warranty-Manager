# Warranty Manager

A modern, responsive web application designed to streamline product warranty claims. Built with Nuxt 4, it provides a seamless interface for customers to submit claims and for staff to manage them through a role-based workflow.

## 🚀 Overview

The **Warranty Manager** replaces manual email-based processes with a structured portal. It centralizes warranty requests, manages claim statuses, and notifies the technical team automatically, with future plans for ERP integration (Sage 100).

## 🛠 Tech Stack

- **Frontend:** [Nuxt 4](https://nuxt.com/) (Vue.js)
- **UI Components:** [Nuxt UI](https://ui.nuxt.com/) (Tailwind CSS)
- **Backend-as-a-Service:** [Supabase](https://supabase.com/) (PostgreSQL & Auth)
- **Email Service:** [Resend](https://resend.com/) (API-based notifications)
- **Deployment:** [Vercel](https://vercel.com/)

## 👥 User Roles & Permissions

| Role | Description |
| :--- | :--- |
| **Customer** | Submit new claims and track their own request history. |
| **Sales Rep** | View all claims to assist customers; can edit details but not change statuses. |
| **Tech Support** | Manage the full lifecycle of a claim (CRUD) and update statuses. |
| **Admin** | Full system access, including user management and system settings. |

## 🏗 Database Schema (MVP)

The application uses a relational PostgreSQL database (via Supabase) with the following core entities:
- `profiles`: User data linked to authentication roles.
- `warranties`: Core claim data (Product ref, serial number, description, photos).
- `status`: Claim workflow states (Pending, Received, Under Review, Validated, Rejected).
- `products`: Local cache of product references for improved UX.

## 🛣 Roadmap

- [ ] **Phase 1:** MVP with Form submission, Supabase storage, and Email notifications (Resend).
- [ ] **Phase 2:** Advanced Dashboard for Tech/Sales teams with filters.
- [ ] **Phase 3:** Spare parts management and "Recycled Parts" inventory.
- [ ] **Phase 4:** Sage 100 ERP Integration (automated credit notes and exchanges).
- [ ] **Phase 5:** Excel/CSV bulk import for product lists.

## 🔧 Getting Started

### Prerequisites
- Node.js (latest LTS)
- A Supabase project and API keys
- A Resend API key

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/warranty-manager.git](https://github.com/your-username/warranty-manager.git)
