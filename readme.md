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
