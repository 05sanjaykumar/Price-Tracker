from langchain_core.prompts import ChatPromptTemplate # type: ignore
from langchain_ollama import OllamaLLM # type: ignore
from langchain_core.output_parsers import StrOutputParser # type: ignore
import requests # type: ignore
import os

base_url = os.getenv("OLLAMA_BASE_URL", "http://ollama:11434")

def fetch_product_data(query):
    url = f"http://backend:3000/getPrice?name={query}"
    response = requests.get(url)

    print(f"[DEBUG] Status Code: {response.status_code}")
    print(f"[DEBUG] Raw Response: {response.text}")

    try:
        data = response.json()
    except Exception as e:
        print(f"[ERROR] JSON Decode Failed: {e}")
        return []

    return data.get("products", [])


def generate_summary(user_instruction, products):
    # Format product data into text
    product_text = ""
    for product in products:
        product_text += f"- {product['title']} – {product['price']} – from {product['store']}\n"

    # Load prompt template from file
    with open("prompt_template.txt", "r") as f:
        template = f.read()

    # Create a ChatPromptTemplate from the raw template string
    prompt = ChatPromptTemplate.from_template(template)

    # Initialize Ollama LLM (local model like Mistral)
    llm = OllamaLLM(model="gemma:2b", base_url=base_url)

    # Compose the chain using the pipe operator: prompt -> llm -> output parser
    chain = prompt | llm | StrOutputParser()

    # Invoke the chain with input variables, returns output string directly
    result = chain.invoke({
        "instruction": user_instruction,
        "product_data": product_text
    })

    return result