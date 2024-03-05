from flask import Flask, jsonify
from openai import OpenAI
import os
from flask_mongoengine import MongoEngine
from mongoengine.base.common import get_document
import models

User = get_document("User")
Organization = get_document("Organization")

from dotenv import load_dotenv
load_dotenv()

if not os.environ.get("OPENAI_API_KEY") or not os.environ.get("MONGODB_URI") or not os.environ.get("JWT_SECRET"):
  raise ValueError("Required environment variables are not found.")  

app = Flask(__name__)
app.config["MONGODB_SETTINGS"] = {
  "db": os.environ.get("MONGODB_DB"),
  "host": os.environ.get("MONGODB_URI")
} 
db = MongoEngine(app)

# Register Blueprints
from blueprints import user_bp, chatbot_bp, organization_bp
app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(chatbot_bp, url_prefix="/chatbot")
app.register_blueprint(organization_bp, url_prefix="/organization")

if __name__ == '__main__':
  app.run(debug=True)

@app.errorhandler(Exception)
def handle_exception(e):
  return jsonify({
        "code": 500,
        "message": "Unhandled Exception",
        "description": str(e),
    }), 500

@app.errorhandler(404)
def not_found(e):
  print(e)
  return "404: Route not found", 404

@app.route("/")
def hello_world():
  return """
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <body>
    <div style='min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 24px; font-family: "Poppins"; text-align: center'>
      <p style='font-weight: 600; margin: 0'>
        CustomerServiceSentinel 
        <br /> 
        Backend
      </p>
      <p style='margin: 0; font-size: 20px'>
        Version 0.0.1
      </p>
    </div>
  </body>
  """


