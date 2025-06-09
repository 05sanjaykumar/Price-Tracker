from flask import Flask, request, jsonify
from ai_utils import fetch_product_data, generate_summary

app = Flask(__name__)


@app.route("/askAI", methods=["POST"])
def summariser():
    return jsonify(message="Hello, World!")

if __name__ == "__main__":
    app.run(port=5000)
