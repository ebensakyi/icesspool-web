# iCesspool Web App Specifications and Requirements

## 1. Overview
The iCesspool Web App is a comprehensive platform designed to manage liquid waste management services. It facilitates the connection between Service Providers (operating Toilet Trucks, Water Tankers, and Biodigester services) and Clients (Customers), while providing robust administrative tools for configuration, monitoring, and financial management.

## 2. User Roles
The application supports the following user roles, each with specific permissions and interfaces:

*   **Administrator (Admin)**:
    *   Full system access.
    *   Configures service areas, pricing, and system settings.
    *   Manages all user accounts (Service Providers, Clients, Scanners).
    *   Views comprehensive dashboards and financial reports.
    *   Handles withdrawals and payouts.
*   **Service Provider (SP)**:
    *   Fulfills service requests.
    *   Manages their profile, including vehicle details (insurance, roadworthiness).
    *   Views their transaction history and earnings.
    *   Requests withdrawals of earnings.
*   **Client (Customer)**:
    *   Initiates service requests for Toilet Trucks, Water Tankers, or Biodigesters.
    *   Tracks the status of their requests.
    *   Views transaction history.
*   **Scanner**:
    *   Operates at designated Service Points (e.g., dumping sites).
    *   Verifies transactions and users using a scanning interface.
    *   Ensures authorized access/dumping.

## 3. Core Modules & Features

### 3.1. Authentication & User Management
*   **Secure Login**: Powered by NextAuth.js.
*   **Role-Based Access Control (RBAC)**: Ensures users only access features relevant to their role.
*   **User Profiles**:
    *   **Service Providers**: Includes license numbers, company details, office location, and vehicle information.
    *   **Clients**: Basic contact information.
*   **Account Management**:
    *   Password reset functionality (via SMS/OTP).
    *   Account deletion requests.
    *   Activity logging.

### 3.2. Service Configuration (Admin)
*   **Service Areas**: Define geographical regions where services are active.
*   **Service Points**: Manage locations for specific service activities (e.g., dumping).
*   **Services Management**: Configure the three main service types:
    *   Toilet Truck
    *   Water Tanker
    *   Biodigester
*   **Truck Classification**: Categorize trucks based on capacity to apply appropriate pricing models.
*   **Pricing & Charges**:
    *   Set base costs, unit costs, and distance-based factors.
    *   Configure platform commissions, taxes (e.g., E-Levy), and other charges.
    *   Manage penalties for non-compliance.

### 3.3. Service Requests & Transactions
*   **Request Lifecycle**:
    *   **Pending**: Request made by client, waiting for SP acceptance.
    *   **Accepted**: SP has agreed to fulfill the request.
    *   **In Progress**: Service is being delivered.
    *   **Completed**: Service finished and verified.
    *   **Cancelled**: Request terminated by Client or SP.
*   **Pricing Engine**: Automatically calculates costs based on:
    *   Service type.
    *   Truck classification/capacity.
    *   Distance/Location.
    *   Number of trips.
*   **Biodigester Offers**: Specific workflow for managing offers related to biodigester services.

### 3.4. Operations & Monitoring
*   **Scanner Interface**:
    *   Dedicated view for Scanner users.
    *   Verify user details and transaction validity at service points.
    *   Search and filter users/transactions.
*   **Vehicle Management**:
    *   Track Service Provider vehicles.
    *   Monitor compliance documents (Insurance, Road Worthiness) and their expiry.
*   **Dashboard**:
    *   Real-time overview of system health.
    *   **Metrics**:
        *   Total Transactions (All, Pending, Completed, Cancelled).
        *   Breakdown by Service Type (Biodigester, Water Tanker, Toilet Truck).
        *   User Counts (Admins, Customers, Scanners, SPs).

### 3.5. Finance
*   **Revenue Tracking**: Monitor total transaction values.
*   **Earnings Split**: Calculate and track:
    *   Service Provider Earnings.
    *   Platform Revenue.
    *   Commissions.
*   **Withdrawals**:
    *   Service Providers can request payouts.
    *   Integration with Mobile Money (Momo) for disbursements.
    *   Admin approval workflow for withdrawals.

## 4. Technical Architecture

### 4.1. Tech Stack
*   **Frontend**: Next.js (React), Tailwind CSS, Bootstrap.
*   **Backend**: Next.js API Routes.
*   **Database**: MySQL (managed via Prisma ORM).
*   **Authentication**: NextAuth.js.
*   **Maps**: Google Maps API / Leaflet (for location services and geofencing).
*   **Storage**: AWS S3 (for storing user documents, vehicle images, etc.).
*   **Notifications**: Hubtel SMS integration.
*   **Visualization**: Chart.js / React-Chartjs-2.

### 4.2. Data Model (Key Entities)
*   **User**: Central entity for all roles.
*   **Transaction**: Records service requests and their status.
*   **ServiceArea**: Defines operational zones.
*   **ServicePoint**: Physical locations for service operations.
*   **Vehicle**: Linked to Service Providers.
*   **Pricing Models**: Complex relationships defining costs based on service, area, and truck type.
*   **Wallet/Balance**: Tracks financial standing of Service Providers and the Platform.

## 5. Future Considerations / To-Do
*   **Mobile App Integration**: The web app likely serves as the backend/admin panel for a mobile app used by Clients and SPs.
*   **Advanced Analytics**: More granular reporting on service efficiency and user retention.
*   **Automated Dispatch**: Potential for algorithm-based assignment of requests to SPs.
