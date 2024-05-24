from flask import Flask, jsonify
from openai import OpenAI
import os
from flask_mongoengine import MongoEngine
from mongoengine.base.common import get_document
import models
from werkzeug.exceptions import NotFound, BadRequest, Conflict, UnsupportedMediaType, Unauthorized, RequestEntityTooLarge
from mongoengine.errors import (
    NotRegistered, InvalidDocumentError, LookUpError, DoesNotExist,
    MultipleObjectsReturned, InvalidQueryError, OperationError, NotUniqueError,
    BulkWriteError, FieldDoesNotExist, ValidationError, SaveConditionError,
    DeprecatedError
)
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv()

if not os.environ.get("OPENAI_API_KEY") or not os.environ.get("MONGODB_URI") or not os.environ.get("JWT_SECRET"):
  raise ValueError("Required environment variables are not found.")  

app = Flask(__name__)
origins = ["http://localhost:3000"]
if os.environ.get("FLASK_ENV") != "development":
  origins = ["http://4.246.226.161:3000"]

CORS(app, supports_credentials=True, origins=origins)
app.config["MAX_CONTENT_LENGTH"] = 2 * 1024 * 1024
app.config["MONGODB_SETTINGS"] = {
  "db": os.environ.get("MONGODB_DB"),
  "host": os.environ.get("MONGODB_URI")
} 
db = MongoEngine(app)

# Register Blueprints
from blueprints import user_bp, chatbot_bp, organization_bp
from blueprints import user_bp, chatbot_bp, organization_bp, assistant_data_bp
app.register_blueprint(user_bp, url_prefix="/user")
app.register_blueprint(chatbot_bp, url_prefix="/chatbot")
app.register_blueprint(organization_bp, url_prefix="/organization")
app.register_blueprint(assistant_data_bp, url_prefix="/assistant-data")

if __name__ == '__main__':
  app.run(debug=True)

@app.errorhandler(Exception)
def handle_exception(e):
  return jsonify({
        "code": 500,
        "message": "Unhandled Exception",
        "description": str(e),
    }), 500

@app.errorhandler(Exception)
def error_handler(e):
  print(e)
  if isinstance(e, NotFound):
    return jsonify({"message": str(e)}), 404
  elif isinstance(e, BadRequest):
    return jsonify({"message": str(e)}), 400
  elif isinstance(e, Conflict):
    return jsonify({"message": str(e)}), 409
  elif isinstance(e, UnsupportedMediaType):
    return jsonify({"message": str(e)}), 415
  elif isinstance(e, Unauthorized):
    return jsonify({"message": str(e)}), 401
  elif isinstance(e, DoesNotExist):
    return jsonify({"message": "Object does not exist: " + str(e)}), 404
  elif isinstance(e, RequestEntityTooLarge):
    return jsonify({"message": str(e)}), 413
  else:
    return jsonify({"message": "Unexpected error: " + str(e)}), 500


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
        Version 1.0
      </p>
    </div>
  </body>
  """


