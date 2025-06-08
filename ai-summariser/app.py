from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)
summarizer = pipeline("text2text-generation", model="google/flan-t5-small")


@app.route("/summarize", methods=["GET"])
def summariser():
    return jsonify(message="Hello, World!")

if __name__ == "__main__":
    app.run(port=5000)
