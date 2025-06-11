from flask import Flask, request, jsonify # type: ignore
from ai_utils import fetch_product_data, generate_summary
from flask_cors import CORS # type: ignore


app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes

@app.route("/askAI", methods=["POST"])
def ask_ai():
    data = request.get_json()
    query = data.get("query", "")
    print("[+] Received query:", query)

    product_keyword = query
    products = fetch_product_data(product_keyword)
    print(f"[+] Retrieved {len(products)} products")

    if not products:
        return jsonify({"error": "No products found"}), 404

    response = generate_summary(query, products)
    print("[+] AI Response:", response)

    return jsonify({
        "summary": response
    })


if __name__ == "__main__":
    app.run(port=5000)
