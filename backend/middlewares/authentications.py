from flask import request, jsonify
from werkzeug.exceptions import Unauthorized
from jwt import decode, ExpiredSignatureError, InvalidTokenError
import os

def authenticateUser(f):
  def wrapper(*args, **kwargs):
    try:
      cookies = request.headers.get("Cookie")
      auth_cookie = cookies.split(";")[0]
      token = auth_cookie.split("=")[1]
      if not "Authentication" in cookies:
        raise Unauthorized("No Authentication cookie found.")
      payload = decode(token, os.environ.get("JWT_SECRET"), algorithms=["HS256"])
      # print(payload)
      return f(*args, **kwargs)
    except Unauthorized as e:
      return jsonify({"error" : str(e)}), 401
    except ExpiredSignatureError as e:
      return jsonify({"error" : str(e), "message" : "Token expired"}), 401
    except InvalidTokenError as e:
      return jsonify({"error" : str(e), "message" : "Invalid token"}), 401
  return wrapper
