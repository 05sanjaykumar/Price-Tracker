from flask import Flask, request, jsonify
from ai_utils import fetch_product_data, generate_summary

app = Flask(__name__)

@app.route("/askAI", methods=["POST"])
def ask_ai():
    data = request.get_json()
    query = data.get("query", "")

    # Extract keywords (for now, use query itself)
    product_keyword = query  # Later: use NLP to extract product type

    # Fetch product data
    products = fetch_product_data(product_keyword)

    # Get AI summary
    response = generate_summary(query, products)

    return jsonify({
        "summary": response
    })

if __name__ == "__main__":
    app.run(port=5000)
