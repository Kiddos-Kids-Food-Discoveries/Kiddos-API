# Cloud Infrastructure
<img src="https://i.postimg.cc/YqfkwTkV/Cloud-Infrastructure-Kiddos-drawio.png">

# API Documentation

This document provides information on how to use the API endpoints and their functionalities.

# Setup Project
To run this project, install it locally using npm on your pc
```
# clone repository
$ git clone https://github.com/Kiddos-Kids-Food-Discoveries/Kiddos-API.git

# change directory to server
$ cd server

# Install dependencies
npm install

# change directory to server-ml
$ cd ../server-ml

# Install dependencies
pip install -r requirements.txt
```
Please go to Google Cloud Console and create a service account with permissions for both Storage Object Admin and Storage Object Viewer

### Create private file and your key.json
```
{
    "api_key":"",
    "storage_bucket": "kiddos-bangkit-2024",
}
```

### Import file key firebase and fire store to private file 
This folder is used to store 2 file including firebase-config.js and serviceAccount.json. Use serviceAccount.json from Google Cloud Project
```
- In firebase create project => Go to project setting and in sevice account "Generate new private key"
- In Google Cloud Platform go to the IAM & Admin (if dont have project go make one) => go to service account and create a service account for the admin cloud => after create the service account go and clict the service account that have been made => go to key section and add key and then create new key

-after done 2 task above the file json that have downloaded store in private folder
```

## Endpoint Routes

There are 19 prediction classes:

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


| Route                           | HTTP Method | Description                                  |
|---------------------------------|-------------|----------------------------------------------|
| /database                          | GET         | Get All Data                              |
| /database               | DELETE         | Delete All Data                             |
| /users                          | GET        | Get All User                                     |
| /users                          | DELETE        | Delete All User                                     |
| /users/{{idUser}}               | GET         | Get users by id                                 |
| /users/{{idUser}}               | PUT         | Update users by id                                |
| /users/{{idUser}}               | DEL         | Delete users by id                                 |
| /articles                        | GET         | Get all articles                              |
| /articles/{{idarticles}}          | GET         | Get articles by Id                            |
| /articles                        | POST        | Add articles                                  |
| /articles/{{idarticles}}          | PUT         | Update articles  by id                              |
| /articles/{{idarticles}}          | DEL         | Delete articles by id                             |
| /login                   | POST         | Login                         |
| /register   | POST         | Register                        |
| /forgotPassword                   | POST        | Reset Password                             |
| /makanan                  | GET        | Get All Food                          |
| /makanan                  | POST        | Add Food                          |
| /makanan/{{kategori}}/{{idmakanan}}               | GET        | Get Spesifict Food          |
|  /makanan/{{kategori}}/{{idmakanan}}               | PUT        | Update Spesifict Food             |
|  /makanan/{{kategori}}              | GET        | Get Food by Kategori          |
|  /makanan/{{kategori}}              | DELETE        | DELETE Food by Kategori          |
|  /predict_food              | POST        | Predict Food in ML Server         |
|  /predict             | POST        | Predict Food         |
|  /predicthisto             | POST        | Predict Food with 'user_id' payload    |
|  /history/{{user_id}}            | GET        | Get history predict by 'user_id' payload    |
|  /history/{{history_id}}           | DELETE        | Delete history predict by id   |





## Documentation for this API
- Go to here for the workspace=> [https://documenter.getpostman.com/view/28165109/2sAYBaAVFe#152b4c90-4c0b-4a67-8752-3cc95b0b02e0](https://documenter.getpostman.com/view/28165109/2sAYBaAVFe#152b4c90-4c0b-4a67-8752-3cc95b0b02e0)

To see all documentation for this API 
- Go to here for all documentation=> https://documenter.getpostman.com/view/28165109/2sAYBaAVFe#152b4c90-4c0b-4a67-8752-3cc95b0b02e0
