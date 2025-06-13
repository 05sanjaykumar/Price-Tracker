from langchain_core.prompts import ChatPromptTemplate # type: ignore
from langchain_core.output_parsers import StrOutputParser # type: ignore
from langchain_openai import ChatOpenAI #type: ignore
import requests # type: ignore
import os
from dotenv import load_dotenv #type: ignore

# Load .env.local ONLY if not running in Docker
if os.getenv("IS_DOCKER") != "true":
    from dotenv import load_dotenv  # type: ignore
    dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    load_dotenv(dotenv_path)

# Choose API host based on Docker environment
BACKEND_HOST = "backend" if os.getenv("IS_DOCKER") == "true" else "localhost"
BACKEND_URL = f"http://{BACKEND_HOST}:3000"

def fetch_product_data(query):
    url = f"{BACKEND_URL}/getPrice?name={query}"
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
    llm = ChatOpenAI(
        base_url=os.getenv("GROQ_API_BASE"),
        api_key=os.getenv("GROQ_API_KEY"),
        model=os.getenv("GROQ_MODEL"),
        temperature=0.7
    )

    # Compose the chain using the pipe operator: prompt -> llm -> output parser
    chain = prompt | llm | StrOutputParser()

    # Invoke the chain with input variables, returns output string directly
    result = chain.invoke({
        "instruction": user_instruction,
        "product_data": product_text
    })

    return result