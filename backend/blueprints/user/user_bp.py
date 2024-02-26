from flask import Blueprint, request, jsonify
from werkzeug.exceptions import BadRequest, Unauthorized
from mongoengine.errors import NotUniqueError, ValidationError
from app import User
import bcrypt

user_bp = Blueprint('user_blueprint', __name__)

@user_bp.route("/register", methods=["POST"])
def create_user(): 
  try:
    data = request.get_json()
    salt = bcrypt.gensalt()

    if not data.get("email") or not data.get("user_name") or not data.get("password"):
      raise BadRequest("Missing required parameters")

    user = User(
      email = data["email"],
      user_name = data["user_name"],
      password = bcrypt.hashpw(data["password"].encode("utf-8"), salt),
      salt = salt
    )
    user.save()
    return jsonify({
      "message": "User registered successfully",
      "id": str(user.id)
    }), 201
  except NotUniqueError:
    return jsonify({
      "message": "This email is already registered",
    }), 409
  except ValidationError as e:
    return jsonify({"message": str(e)}), 400
  except BadRequest as e:
    return jsonify({"message": str(e)}), 400

@user_bp.route("/login", methods=["POST"])
def login():
  try:
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
      raise BadRequest("Missing required parameters")
    
    user = User.objects(email=data["email"]).first()
    print(bcrypt.checkpw(data["password"].encode("utf-8"), user.password.encode("utf-8")))
    if not bcrypt.checkpw(data["password"].encode("utf-8"), user.password.encode("utf-8")):
      raise Unauthorized
    return jsonify({"user": user})
    
  except BadRequest as e:
    return jsonify({"message": str(e)}), 400
  except Unauthorized as e:
    return jsonify({"message": str(e)}), 401