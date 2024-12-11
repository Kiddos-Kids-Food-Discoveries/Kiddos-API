#!/bin/bash

# Set environment variables
GOOGLE_CLOUD_PROJECT="kiddos-442812"
PROJECT_NAME="kiddos-442812"

# Set Google Cloud project
gcloud config set project "$GOOGLE_CLOUD_PROJECT"

# Submit the build to Google Cloud Build
gcloud builds submit \
    --tag "gcr.io/$GOOGLE_CLOUD_PROJECT/$PROJECT_NAME"

# Deploy the application to Google Cloud Run
gcloud run deploy "$PROJECT_NAME" \
    --image "gcr.io/$GOOGLE_CLOUD_PROJECT/$PROJECT_NAME" \
    --platform=managed \
    --region=asia-southeast2 \
    --allow-unauthenticated \
    --max-instances=1 \
    --cpu-boost \
    --cpu=2 \
    --memory=4096Mi
