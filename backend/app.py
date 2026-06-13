from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Load trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    # Ensure request contains JSON
    if not request.is_json:
        return jsonify({"error": "Request must be application/json"}), 400

    data = request.get_json(force=True)

    # Validate required fields
    try:
        area = float(data.get("area"))
        bedrooms = float(data.get("bedrooms"))
        bathrooms = float(data.get("bathrooms"))
    except Exception:
        return jsonify({"error": "Invalid or missing fields. Expected numeric 'area', 'bedrooms', 'bathrooms'."}), 400

    # Make prediction
    try:
        prediction = model.predict([[area, bedrooms, bathrooms]])
        predicted = round(float(prediction[0]), 2)
    except Exception as e:
        return jsonify({"error": "Model prediction failed", "details": str(e)}), 500

    return jsonify({"predicted_price": predicted})

if __name__ == "__main__":
    app.run(debug=True)
