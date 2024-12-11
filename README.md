# Kiddos API Documentation

## Table of Contents
- [Introduction](#introduction)
- [Cloud Infrastructure](#cloud-infrastructure)
- [Setup Project](#setup-project)
- [Environment Configuration](#environment-configuration)
- [Prediction Classes](#prediction-classes)
- [Deploying to Cloud Run](#deploying-to-cloud-run)
- [Endpoint Routes](#endpoint-routes)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction
The **Kiddos API** is designed to classify food items using a Machine Learning model. This API provides endpoints for user management, food prediction, and history tracking. It also supports integration with Firebase and Google Cloud services.

---

## Cloud Infrastructure
![Cloud Infrastructure](https://i.postimg.cc/YqfkwTkV/Cloud-Infrastructure-Kiddos-drawio.png)

---

## Setup Project
To run this project, clone the repository and install the required dependencies.

### Steps
```bash
# Clone the repository
git clone https://github.com/Kiddos-Kids-Food-Discoveries/Kiddos-API.git

# Change directory to the server folder
cd Kiddos-API/server

# Install server dependencies
npm install

# Change directory to the ML server folder
cd ../server-ml

# Install ML server dependencies
pip install -r requirements.txt
```

---

## Environment Configuration

### Create a Service Account
1. Go to **Google Cloud Console** and create a service account.  
2. Assign the following permissions:
   - **Storage Object Admin**
   - **Storage Object Viewer**

### Create a Private Configuration File
Create a `key.json` file in your project to store API keys and configurations:
```json
{
    "api_key": "",
    "storage_bucket": "kiddos-bangkit-2024",
    "ml_backend": "",
}
```

### Add Firebase and Firestore Keys
#### 1. Firebase Configuration
- Go to **Firebase Console** and navigate to your project.
- Open **Project Settings** > **Service Accounts**.
- Generate a new private key by clicking **Generate New Private Key**.
- Download the `serviceAccount.json` file.
- Copy the content of this file into a new file named `firebase.json`. This file will contain the Firebase service account credentials and configuration.
- Save the file as `firebase.json` in your `private` folder.

#### 2. Google Cloud Platform (GCP) Configuration
- Go to **Google Cloud Console** and navigate to **IAM & Admin** > **Service Accounts**.
- Create a new service account for Cloud Admin by clicking on **Create Service Account**.
- After creating the service account, go to the **Keys** section and add a new key in **JSON** format.
- Download the key and rename it to `key.json`.
- Store the `key.json` file in the `private` folder.

#### File Structure
Ensure the following two files are stored in the `private` folder:
1. **`key.json`**: Contains the Google Cloud service account credentials.
2. **`firebase.json`**: Contains the Firebase service account credentials and configuration.

This setup will securely manage the service account keys for both Google Cloud and Firebase.

---
## Deploying to Cloud Run
- ### Preconditions
  Before deploying your app to Google Cloud Run, ensure that you meet the following prerequisites:
  - Create a Google Cloud Platform (GCP) account and manage projects.
  - Install and configure the Google Cloud SDK on your local machine.
    
  >  Please note that "prerequisites" is a plural noun, so it is more appropriate to use "meet the following prerequisites" instead of "meet the following prerequisite" in this context.

- ### Steps
  - Prepare the application
    Ensure that your application is ready for deployment on Google Cloud Run. This involves conducting local testing and ensuring that the necessary configuration is in place.
  - Create a container image
    Google Cloud Run requires the application to be packaged as a distributable container image. Build container images of your applications using tools like Docker.
  - Upload the container image
    Upload the container image you created to the Google Container Registry (GCR) using the gcloud command. Before proceeding, ensure that you are signed in to the correct Google Cloud Platform (GCP) account.
    Example command to upload a container image:
    ```
    gcloud builds submit --tag gcr.io/[PROJECT-ID]/[IMAGE-NAME]
    ```
  - Deploy to Google Cloud Run
    Use the gcloud run deploy command to deploy your application to Google Cloud Run. Specify the service name, select the uploaded container image, and configure any additional options as necessary.
    Example command to deploy an application to Google Cloud Run:
    ```
    gcloud run deploy [SERVICE-NAME] --image gcr.io/[PROJECT-ID]/[IMAGE-NAME] --platform managed
    ```
  - Accessing the application
    After the deployment process is complete, you will receive a URL that provides access to the deployed application. Utilize this URL to access the app through a web browser or by employing an API testing tool such as cURL or Postman.

---

## Prediction Classes

The API supports classification for 19 food-related classes:

- `apple`  
- `avocado`  
- `banana`  
- `broccoli`  
- `carrot`  
- `chicken`  
- `corn`  
- `dragon fruit`  
- `egg`  
- `grape`  
- `green vegetables`  
- `orange`  
- `porridge`  
- `potato`  
- `rice`  
- `tempeh`  
- `tofu`  
- `tomato`  
- `watermelon`  

---

## Endpoint Routes

### General Endpoints

| Route                           | HTTP Method | Description                                  |
|---------------------------------|-------------|----------------------------------------------|
| `/database`                     | GET         | Get all data                                 |
| `/database`                     | DELETE      | Delete all data                              |

### User Management

| Route                           | HTTP Method | Description                                  |
|---------------------------------|-------------|----------------------------------------------|
| `/users`                        | GET         | Get all users                                |
| `/users`                        | DELETE      | Delete all users                             |
| `/users/{{idUser}}`             | GET         | Get user by ID                               |
| `/users/{{idUser}}`             | PUT         | Update user by ID                            |
| `/users/{{idUser}}`             | DELETE      | Delete user by ID                            |

### Article Management

| Route                           | HTTP Method | Description                                  |
|---------------------------------|-------------|----------------------------------------------|
| `/articles`                     | GET         | Get all articles                             |
| `/articles/{{idarticles}}`      | GET         | Get article by ID                            |
| `/articles`                     | POST        | Add an article                               |
| `/articles/{{idarticles}}`      | PUT         | Update article by ID                         |
| `/articles/{{idarticles}}`      | DELETE      | Delete article by ID                         |

### Other

| Route                           | HTTP Method | Description                                  |
|---------------------------------|-------------|----------------------------------------------|
| `/login`                        | POST        | User login                                   |
| `/register`                     | POST        | User registration                            |
| `/forgotPassword`               | POST        | Reset password                               |

### Food Prediction and History

| Route                           | HTTP Method | Description                                  |
|---------------------------------|-------------|----------------------------------------------|
| `/predict_food`                 | POST        | Predict food using the ML server             |
| `/predict`                      | POST        | Predict food                                 |
| `/predicthisto`                 | POST        | Predict food with user history               |
| `/history/{{user_id}}`          | GET         | Get prediction history for a user            |
| `/history/{{history_id}}`       | DELETE      | Delete prediction history by ID              |

### Food Management

| Route                           | HTTP Method | Description                                  |
|---------------------------------|-------------|----------------------------------------------|
| `/makanan`                      | GET         | Get all food                                 |
| `/makanan`                      | POST        | Add food                                     |
| `/makanan/{{kategori}}/{{idmakanan}}` | GET   | Get specific food                            |
| `/makanan/{{kategori}}/{{idmakanan}}` | PUT   | Update specific food                         |
| `/makanan/{{kategori}}`         | GET         | Get food by category                         |
| `/makanan/{{kategori}}`         | DELETE      | Delete food by category                      |

---

## API Documentation

- **Postman Workspace**:  
  [API Workspace Documentation](https://documenter.getpostman.com/view/28165109/2sAYBaAVFe#152b4c90-4c0b-4a67-8752-3cc95b0b02e0)  

- **Complete Documentation**:  
  [Full API Documentation](https://documenter.getpostman.com/view/28165109/2sAYBaAVFe#152b4c90-4c0b-4a67-8752-3cc95b0b02e0)  

---

## Contributing
We welcome contributions to improve this API. To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request describing your changes.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
