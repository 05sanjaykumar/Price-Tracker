# 🛒 AI-Powered Price Tracker

A full-stack AI-enhanced product tracker that scrapes real-time listings, summarizes them using LLMs (via Groq), and displays results through a clean React frontend.

Built by a solo developer. Powered by real engineering, DevOps, and AI integrations.

---

## 🚀 Features

- 🔎 **Real-Time Scraping:** Collects product listings from e-commerce sites and custom Bing search using Puppeteer.
- 🤖 **AI Summarization:** Uses **Groq-hosted LLMs** (`LLaMA 4 Scout`, `Mixtral`, etc.) to summarize the best results per user query.
- 🌐 **Full Stack System:**
  - React + Vite frontend
  - Flask backend
  - MongoDB for storing queries
  - LangChain for model abstraction
- 🐳 **Containerized:** Fully Dockerized system via `docker-compose`.

---

## 🧠 Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| **Frontend**   | React, Vite, Axios                  |
| **Backend**    | Flask, LangChain, Python 3.12       |
| **AI Models**  | Groq API (`LLaMA`, `Mixtral`)       |
| **Scraping**   | Bing Search API, Puppeteer (Node.js)|
| **Database**   | MongoDB                             |
| **DevOps**     | Docker, Docker Compose              |

---

## 🧰 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/05sanjaykumar/Price-Tracker
cd price-tracker-ai
````

### 2. Create `.env.local` you have given an `.env.example`, you just just replace that in the root folder

In the `./ or root` folder:

```env
MONGO_URI=mongodb://localhost:27017/mydbname
JWT_SECRET=supersecretkey
GROQ_API_KEY=your_groq_api_key
GROQ_API_BASE=https://api.groq.com/openai/v1
MODEL_NAME=meta-llama/llama-4-scout-17b-16e-instruct
```


### 3. Run with Docker

```bash
docker-compose up --build
```

This spins up:

* MongoDB
* Backend (Flask)
* AI summariser service
* Frontend (React)

---

### 🧪 How to Use

Visit the frontend:

```bash
http://localhost:5173
```

You’ll find a simple UI where you can enter a natural language query like:

> 💬 **"Best gaming laptops under ₹1 lakh"**

The system will:

1. Scrape the latest product listings
2. Summarize the best options using LLMs (Groq or local)
3. Return a clear, ranked summary to the user interface

---

## 🧪 Sample Prompt Use Cases

* "Best phones under ₹30k"
* "Top smart TVs under ₹50,000"
* "Most affordable noise-canceling headphones"

---

## 💡 Learnings & Highlights

* Full-stack Docker orchestration
* LangChain LLM orchestration (prompt → AI → result)
* Using AI API key: cloud-hosted Groq API
* Custom scraping with Bing + Puppeteer
* Real-time summarization with semantic filtering
* Truly scalable backend architecture

---

## 👨‍💻 Built By

**Sanjay Kumar**
💡 Self-taught developer | Polyglot Dev | Indie Hacker
🛠️ Built from scratch at 20 to show my real-world projects skills
🌍 [GitHub](https://github.com/yourusername) • [X](#) (https://x.com/sanjaykuma49595)

---

## 🧠 Future Improvements

* ✅ Frontend AI summary display (done)
* ⏳ Add filtering/sorting by price/category
* 💾 Optional user login & saved queries
* 📱 Mobile responsive layout
* ⚙️ Cloud deployment (e.g., Vercel + Render/Fly.io)

---

## 📸 Demo Preview 

<img width="1435" alt="Screenshot 2025-06-12 at 9 17 30 PM" src="https://github.com/user-attachments/assets/34685183-002b-4bf0-9fad-eca5516b458d" />

---

## 📄 License

MIT
