from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader
from starlette.responses import JSONResponse
from tensorflow.keras.models import load_model
from predict import predict_food_category
from config import load_api_key
import os

# Inisialisasi FastAPI
app = FastAPI()

# Load API Key
api_key = load_api_key()

# Load model terlatih
MODEL_PATH = 'ML_Model/Model/model.h5'
model = load_model(MODEL_PATH)

# Setup API Key Header
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

# Validasi API Key
async def get_api_key(api_key_header: str = Depends(api_key_header)):
    if api_key_header == api_key:
        return api_key_header
    else:
        raise HTTPException(status_code=400, detail="Invalid API Key")

# Endpoint untuk prediksi
@app.post("/predict_food")
async def predict_food_route(file: UploadFile = File(...), api_key: str = Depends(get_api_key)):
    try:
        # Simpan file sementara
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, "wb") as temp_file:
            temp_file.write(await file.read())

        # Prediksi kelas makanan
        predicted_class, confidence = predict_food_category(model, temp_file_path)

        # Hapus file sementara
        os.remove(temp_file_path)

        # Kembalikan hasil prediksi
        result = {"predicted_class": predicted_class, "confidence": f"{confidence:.2f}%"}
        return JSONResponse(content=result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint default
@app.get("/")
async def home():
    return {"message": "Food Prediction API is running!"}