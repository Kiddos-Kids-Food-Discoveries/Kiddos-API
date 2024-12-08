from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from starlette.responses import JSONResponse
from tensorflow.keras.models import load_model
from predict import predict_food_category
from config import load_api_key
import os