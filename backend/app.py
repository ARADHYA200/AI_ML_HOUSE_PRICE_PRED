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
    data = request.json

    area = data["area"]
    bedrooms = data["bedrooms"]
    bathrooms = data["bathrooms"]

    prediction = model.predict([[area, bedrooms, bathrooms]])

    return jsonify({
        "predicted_price": round(prediction[0], 2)
    })

if __name__ == "__main__":
    app.run(debug=True)
