from flask import Blueprint, request, jsonify, make_response, g
from werkzeug.exceptions import BadRequest, Unauthorized, NotFound, Conflict
from models import User
from middlewares.authentications import authenticateUser
import bcrypt
import jwt
import datetime
import os

user_bp = Blueprint("user_blueprint", __name__)

@user_bp.route("/register", methods=["POST"])
def create_user(): 
  data = request.get_json()
  salt = bcrypt.gensalt()

  if not data.get("email") or not data.get("user_name") or not data.get("password"):
    raise BadRequest("Missing required parameters")
  
  check_duplicate = User.objects(email = data['email'])
  if check_duplicate == []:
    raise Conflict("Email already registered")

  user = User(
    email = data['email'],
    user_name = data['user_name'],
    password = bcrypt.hashpw(data['password'].encode("utf-8"), salt),
    salt = salt
  )
  user.save()
  return jsonify({
    "message": "User registered successfully",
    "id": str(user.id)
  }), 201

@user_bp.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  if not data.get("email") or not data.get("password"):
    raise BadRequest("Missing required parameters")
  
  user = User.objects(email=data['email']).first()
  if not user:
    raise NotFound("User does not exist")
  jw_token = jwt.encode({
    "_id" : str(user.id),
    "email" : user.email,
    "exp" : datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=6)
  }, os.environ.get("JWT_SECRET"), algorithm="HS256")
  if not bcrypt.checkpw(data['password'].encode("utf-8"), user.password.encode("utf-8")):
    raise Unauthorized("Invalid credentials")
  response = make_response(jsonify({
    "message" : "login success",
    "data" : {"username" : user.user_name}
    }))
  response.set_cookie("Authentication", jw_token, max_age=6*3600, samesite=None)
  return response, 200
  
@user_bp.route("/logout", methods=["POST"])
def logout():
  response = make_response(jsonify({"message": "logout success."}))
  a_day_ago = datetime.datetime.utcnow() - datetime.timedelta(days=1)
  response.set_cookie("Authentication", "", max_age=0, expires=a_day_ago,)
  return response

@user_bp.route("/", methods=["GET"])
@authenticateUser
def get_user_data():
  payload = g.payload
  print(payload.get("email"))
  user = User.objects(email=payload.get("email")).first()
  print(user.user_name)
  return jsonify({
    "data": {
      "username": user.user_name,
      "email": payload.get("email")
    }
  })