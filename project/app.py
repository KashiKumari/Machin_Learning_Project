from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import numpy as np
import requests
import os

app = Flask(__name__)
CORS(app)  # ✅ allow React frontend

# ✅ Load model once
model = pickle.load(open("model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

# ✅ Home route for deployment health check
@app.route("/")
def home():
    return "Backend is live 🚀"

# ✅ Prediction route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # 🔥 Random API call
        try:
            response = requests.get(
                "https://www.randomnumberapi.com/api/v1.0/random?min=-0.05&max=0.05&count=1",
                timeout=5
            )
            if response.status_code == 200:
                random_factor = response.json()[0]
            else:
                random_factor = 0.0
        except requests.exceptions.RequestException:
            random_factor = 0.0

        # 🔥 Adjust energy efficiency
        adjusted_energy_efficiency = data["energy_efficiency"] + random_factor
        adjusted_energy_efficiency = max(0.0, min(1.0, adjusted_energy_efficiency))

        # 🔥 Prepare input
        arr = [[
            data["production_volume"],
            data["production_cost"],
            data["defect_rate"],
            data["quality_score"],
            data["maintenance_hours"],
            data["stockout_rate"],
            adjusted_energy_efficiency
        ]]

        arr = scaler.transform(arr)

        prob = model.predict_proba(arr)[0]
        pred = model.predict(arr)[0]

        return jsonify({
            "prediction": "Defective" if pred == 1 else "Non-Defective",
            "confidence": float(max(prob)),  # ✅ better for frontend
            "random_factor": float(random_factor)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Required for Render deployment
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)