from flask import Flask, request
from openai import OpenAI
import os

from dotenv import load_dotenv
load_dotenv()
print(os.environ.get("OPENAI_API_KEY"))
if not os.environ.get("OPENAI_API_KEY"):
  raise ValueError("API Key not found.")  

app = Flask(__name__)

if __name__ == '__main__':
  app.run(debug=True)

@app.route("/")
def hello_world():
  return "<div style='min-height: 100vh; display: flex; justify-content: center; align-items: center; font-size: 20'>CustomerServiceSentinel</div>"