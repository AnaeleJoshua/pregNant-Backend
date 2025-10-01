# pregNant-Backend

## Overview
pregNant-Backend is a Node.js backend application for managing pregnancy care data, including patient records, diagnoses, ultrasound reports, and general medical reporting. It uses Express.js for routing and SQLite for data storage, providing RESTful APIs for CRUD operations across multiple healthcare domains.

# ![Project Screenshot](./11.09.2025_17.42.49_REC.png)

## Features
- **Patient Management**: Create, update, and retrieve patient records.
- **Diagnosis Management**: Record and manage patient diagnoses.
- **Ultrasound Reporting**: Store and access ultrasound data for patients.
- **General Reporting**: Generate and retrieve medical reports.
- **Authorization**: Basic authentication and authorization middleware.

## Project Structure
```
app.js                  # Main application entry point
authorization/          # Auth middleware and logic
  auth.js
common/                 # Shared models
  model/
    Diagnosis.js
    Patient.js
    Ultrasound.js
Diagnosis/              # Diagnosis routes and controllers
  routes.js
  controller/
    diagnosisController.js
Patient/                # Patient routes, controllers, and schemas
  routes.js
  controller/
    patientController.js
  schema/
    createPatientPayload.js
    updatePatientPayload.js
Report/                 # Report routes and controllers
  routes.js
  Controller/
    reportController.js
Ultrasound/             # Ultrasound routes and controllers
  routes.js
  controller/
    ultrasoundController.js
storage/                # Database file
  db.sqlite
utility/                # Utility functions
  utility.js
```

## Installation
1. **Clone the repository**
   ```powershell
   git clone https://github.com/AnaeleJoshua/pregNant-Backend.git
   cd pregNant-Backend
   ```
2. **Install dependencies**
   ```powershell
   npm install
   ```
3. **Start the server**
   ```powershell
   node app.js
   ```

## API Endpoints
### Patient
- `POST /patient` - Create a new patient
- `GET /patient/:id` - Get patient by ID
- `PUT /patient/:id` - Update patient
- `GET /patient` - List all patients

### Diagnosis
- `POST /diagnosis` - Add diagnosis
- `GET /diagnosis/:id` - Get diagnosis by ID
- `GET /diagnosis` - List all diagnoses

### Ultrasound
- `POST /ultrasound` - Add ultrasound report
- `GET /ultrasound/:id` - Get ultrasound report by ID
- `GET /ultrasound` - List all ultrasound reports

### Report
- `POST /report` - Create report
- `GET /report/:id` - Get report by ID
- `GET /report` - List all reports

## Authorization
Basic authentication is implemented in `authorization/auth.js`. Protect sensitive endpoints by including the middleware in your route definitions.

## Database
- SQLite database file is located at `storage/db.sqlite`.
- Models for Patient, Diagnosis, and Ultrasound are in `common/model/`.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a new Pull Request

## License
This project is licensed under the MIT License. See `LICENSE` for details.

## Author
Anaele Joshua

---
For more details, see the code in each module and the comments within. For questions or support, open an issue on GitHub.
