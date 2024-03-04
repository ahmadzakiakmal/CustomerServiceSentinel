from flask import Blueprint, request, jsonify
from app import Organization
from werkzeug.exceptions import BadRequest
from middlewares.authentications import authenticateUser
from jwt import decode
import os

organization_bp = Blueprint("organization_blueprint", __name__)

@organization_bp.route("/", methods=["POST"])
@authenticateUser
def create_organization():
  try:
    data = request.get_json()
    cookies = request.headers.get("Cookie", "")
    auth_cookie = next((cookie for cookie in cookies.split("; ") if cookie.startswith("Authentication=")), None)
    token = auth_cookie.split("=")[1]
    payload = decode(token, os.environ.get("JWT_SECRET"), algorithms=["HS256"])
    print(payload.get("email"))
    if not data.get("organizationName"):
      raise BadRequest("Missing required parameters")
    org = Organization(
      organization_name = data["organizationName"],
      owner=payload.get("email")
    )
    org.save()
    return jsonify({
      "message": "Organization created successfully",
      "data": {
        "id": org.id,
        "name": data["organizationName"],
        "owner": payload.get("email")
      }
    }), 201
  except BadRequest as e:
    return jsonify({
      "message": str(e)
    }), 400