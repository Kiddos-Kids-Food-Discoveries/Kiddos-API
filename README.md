# Kiddos API Documentation

## Table of Contents
- [Introduction](#introduction)
- [Cloud Infrastructure](#cloud-infrastructure)
- [Setup Project](#setup-project)
- [Environment Configuration](#environment-configuration)
- [Prediction Classes](#prediction-classes)
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
    "storage_bucket": "kiddos-bangkit-2024"
}
```

### Add Firebase and Firestore Keys
1. **Firebase Configuration**  
   - Go to Firebase Console > Project Settings > Service Accounts.  
   - Generate a new private key and download the `serviceAccount.json` file.  

2. **Google Cloud Platform**  
   - Go to Google Cloud Console > IAM & Admin > Service Accounts.  
   - Create a new service account for cloud admin.  
   - Download the generated JSON key and save it in the private folder.

Ensure the following files are stored in the `private` folder:
- `firebase-config.js`
- `serviceAccount.json`

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
