from flask import request, jsonify
from werkzeug.exceptions import Unauthorized
from jwt import decode, ExpiredSignatureError, InvalidTokenError
import os

def authenticateUser(f):
  def wrapper(*args, **kwargs):
    try:
      cookies = request.headers.get("Cookie")
      print(cookies)
      print("Authentication=" in cookies)
      if not cookies:
        raise Unauthorized("No cookie found.")
      if not "Authentication=" in cookies:
        raise Unauthorized("No authentication cookie found.")
      
      auth_cookie = next((cookie for cookie in cookies.split("; ") if cookie.startswith("Authentication=")), None)
      if not auth_cookie:
        raise Unauthorized("Authentication cookie is missing.")

      token = auth_cookie.split("=")[1]
      payload = decode(token, os.environ.get("JWT_SECRET"), algorithms=["HS256"])
      print(payload)
      return f(*args, **kwargs)
    except Unauthorized as e:
      return jsonify({"error" : str(e)}), 401
    except ExpiredSignatureError as e:
      return jsonify({"error" : str(e), "message" : "Token expired"}), 401
    except InvalidTokenError as e:
      return jsonify({"error" : str(e), "message" : "Invalid token"}), 401
  return wrapper
