from flask import Blueprint, request, jsonify
from mongoengine.errors import NotUniqueError, ValidationError
from app import User

user_bp = Blueprint('user_blueprint', __name__)

@user_bp.route("/register", methods=["POST"])
def create_user(): 
  try:
    data = request.get_json()
    user = User(
      email = data["email"],
      user_name = data["user_name"],
      organizations = []
    )
    user.save()
    return jsonify({
      "message": "User registered successfully",
      "id": str(user.id)
    }), 201
  except NotUniqueError:
    return jsonify({
      "message": "This email is already registered",
    }), 400
  except ValidationError as e:
    return jsonify({'message': str(e)}), 400