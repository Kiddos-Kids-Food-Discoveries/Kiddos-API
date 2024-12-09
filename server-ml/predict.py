from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

IMG_SIZE = 128  # Ukuran gambar input
CLASS_INDICES = {
    0: "apple", 1: "avocado", 2: "banana", 3: "broccoli", 4: "carrot",
    5: "chicken", 6: "corn", 7: "dragon fruit", 8: "egg", 9: "grape",
    10: "green vegetables", 11: "orange", 12: "porridge", 13: "potato",
    14: "rice", 15: "tempeh", 16: "tofu", 17: "tomato", 18: "watermelon"
}

def preprocess_image(image_path):
    """Preprocess image for prediction."""
    img = load_img(image_path, target_size=(IMG_SIZE, IMG_SIZE))
    img_array = img_to_array(img) / 255.0  # Normalisasi
    img_array = np.expand_dims(img_array, axis=0)  # Tambahkan dimensi batch
    return img_array

def predict_food_category(model, image_path):
    """Predict food category using the model."""
    processed_image = preprocess_image(image_path)
    predictions = model.predict(processed_image)
    predicted_index = np.argmax(predictions[0])
    predicted_class = CLASS_INDICES[predicted_index]
    confidence = predictions[0][predicted_index] * 100
    return predicted_class, confidence
