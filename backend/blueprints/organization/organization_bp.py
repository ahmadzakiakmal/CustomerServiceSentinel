from flask import Blueprint, request, jsonify
from app import Organization
from werkzeug.exceptions import BadRequest

organization_bp = Blueprint("organization_blueprint", __name__)

@organization_bp.route("/", methods=["POST"])
def create_organization():
  try:
    data = request.get_json()
    if not data.get("organizationName"):
      raise BadRequest("Missing required parameters")
    org = Organization(
      organization_name = data["organizationName"]
    )
    org.save()
    return jsonify({
      "message": "Organization created successfully",
      "data": {
        "id": org.id,
        "name": data["organizationName"],
      }
    }), 201
  except BadRequest as e:
    return jsonify({
      "message": str(e)
    }), 400