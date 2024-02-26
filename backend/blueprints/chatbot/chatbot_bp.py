from flask import Blueprint
from middlewares.authentications import authenticateUser

chatbot_bp = Blueprint("chatbot_blueprint", __name__)

@chatbot_bp.route("/chat", methods=["POST"])
@authenticateUser
def chat():
  return "hello", 200