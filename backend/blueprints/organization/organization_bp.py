from flask import Blueprint, request, jsonify, g
from app import Organization
from models import Membership
from werkzeug.exceptions import BadRequest, NotFound, Conflict
from middlewares.authentications import authenticateUser
from jwt import decode
import os

organization_bp = Blueprint("organization_blueprint", __name__)

@organization_bp.route("/", methods=["POST"])
@authenticateUser
def create_organization():
  try:
    data = request.get_json()
    
    payload = g.payload

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
  
@organization_bp.route("/member", methods=["POST"], endpoint="Add Member")
@authenticateUser
def add_member():
  try:
    data = request.get_json()
    
    payload = g.payload

    if not data.get("organizationId") or not data.get("email"):
      raise BadRequest("Missing required parameters")
    
    org = Organization.objects(id=data["organizationId"]).first()
    if not org:
      raise NotFound("Organization Not Found")
    
    check_duplicate = Membership.objects(organization=data["organizationId"], user=data["email"])
    print(check_duplicate)
    if check_duplicate:
      raise Conflict("This membership relation already exist")
    
    membership = Membership(
      user = data["email"],
      organization = str(org.id)
    )
    membership.save()

    return jsonify({
      "organizationId": org.id,
      "email": str(org.id)
    })
  except NotFound as e:
    return jsonify({
      "message": str(e)
    }), 404
  except BadRequest as e:
    return jsonify({
      "message": str(e)
    }), 404
  except Conflict as e:
    return jsonify({
      "message": str(e)
    })