from flask import Blueprint, request, jsonify, g
from models import Membership, AssistantData, Organization, User
from werkzeug.exceptions import BadRequest, NotFound, Conflict, Unauthorized
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
    org_assistant_data = AssistantData(organization=str(org.id))
    org_assistant_data.save()
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

@organization_bp.route("/member/<id>", methods=["POST"], endpoint="Add Member")
@authenticateUser
def add_member(id):
  try:
    data = request.get_json()
    
    payload = g.payload
    
    org = Organization.objects(id=id).first()
    if not org:
      raise NotFound("Organization Not Found")
    
    if payload.get("email") != org.owner:
      raise Unauthorized("Only organization owner can add members")
    
    check_duplicate = Membership.objects(organization=id, user=data["email"])

    if check_duplicate:
      raise Conflict("This membership relation already exist")
    
    membership = Membership(
      user = data["email"],
      organization = str(id)
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
  
@organization_bp.route("/", methods=["GET"], endpoint="Get Organizations")
@authenticateUser
def get_orgs():
  payload = g.payload
  owned_orgs = Organization.objects(owner=payload.get("email"))
  owned_orgs_ids = []
  for org in owned_orgs:
    owned_orgs_ids.append(org.id)
  memberships = Membership.objects(user=payload.get("email"))
  # filter owned_orgs oid != membership org oid
  filtered_membership = []
  for membership in memberships:
    if membership.organization.id not in owned_orgs_ids:
      filtered_membership.append(membership.organization.id)

  return jsonify({
    "owned": owned_orgs_ids,
    "member": filtered_membership
  })

@organization_bp.route("/member/<id>", methods=["GET"], endpoint="Get Members")
@authenticateUser
def get_org_members(id):
  memberships = Membership.objects(organization=id)
  organization = Organization.objects(id=id).first()
  members = []
  for membership in memberships:
    if membership.user != organization.owner:
      member = User.objects(email=membership.user).first()
      members.append({
        "email": member.email,
        "username": member.user_name
      })
  return jsonify({
    "organization" : organization.organization_name,
    "owner" : organization.owner,
    "members" : members
  })