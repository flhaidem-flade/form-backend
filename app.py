from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

FILE = "data.json"

if not os.path.exists(FILE):
    with open(FILE, "w") as f:
        json.dump([], f)

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json

    with open(FILE, "r") as f:
        old = json.load(f)

    old.append(data)

    with open(FILE, "w") as f:
        json.dump(old, f, indent=4)

    return jsonify({"status": "success"})

@app.route("/data", methods=["GET"])
def data():
    with open(FILE, "r") as f:
        return jsonify(json.load(f))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
