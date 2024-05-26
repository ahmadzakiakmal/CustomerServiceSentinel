from flask import Blueprint, request, jsonify, g
from models import Membership, AssistantData, Organization, User
from werkzeug.exceptions import BadRequest, NotFound, Conflict, Unauthorized
from mongoengine.errors import DoesNotExist
from middlewares.authentications import authenticateUser
from jwt import decode
import os

organization_bp = Blueprint("organization_blueprint", __name__)

@organization_bp.route("/create", methods=["POST"])
@authenticateUser
def create_organization():
  data = request.get_json()
  
  payload = g.payload
  if not data.get("organizationName"):
    raise BadRequest("Missing required parameters")
  org = Organization(
    organization_name = data['organizationName'],
    owner=payload.get("email")
  )
  org.save()
  org_assistant_data = AssistantData(organization=str(org.id))
  org_assistant_data.save()
  return jsonify({
    "message": "Organization created successfully",
    "data": {
      "id": org.id,
      "name": data['organizationName'],
      "owner": payload.get("email")
    }
  }), 201

@organization_bp.route("/member/<id>", methods=["POST"], endpoint="Add Member")
@authenticateUser
def add_member(id):
  data = request.get_json()
  payload = g.payload

  if not data.get("email"):
    raise BadRequest("Missing required parameter, email")
  
  org = Organization.objects(id=id).first()
  if not org:
    raise NotFound("Organization Not Found")
  
  if payload.get("email") != org.owner:
    raise Unauthorized("Only organization owner can add members")
  
  check_duplicate = Membership.objects(organization=id, user=data['email'])

  if check_duplicate:
    raise Conflict("This membership relation already exist")
  
  membership = Membership(
    user = data['email'],
    organization = str(id)
  )
  membership.save()

  return jsonify({
    "message": f"Successfully added {data['email']} to {org.organization_name}"
  }), 200
  
@organization_bp.route("/member/<id>/<email>", methods=["DELETE"], endpoint="Remove Member")
@authenticateUser
def remove_member(id, email):
  payload = g.payload

  if not email:
    raise BadRequest("Missing required parameter, email")
  
  org = Organization.objects(id=id).first()
  if not org:
    raise NotFound("Organization Not Found")
  
  if payload.get("email") != org.owner:
    raise Unauthorized("Only organization owner can remove members")
  
  membership = Membership.objects(
    user = email,
    organization = str(id)
  ).first()

  if not membership:
    raise DoesNotExist("This user is not a member in the organization")
  
  membership.delete()
  membership.save()

  return jsonify({
    "message": f"Successfully deleted {email} from {org.organization_name}"
  }), 200

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
      print(membership.organization.id in owned_orgs_ids)
      filtered_membership.append(
          Organization.objects(id=membership.organization.id).first()
    )
      
  print(filtered_membership)

  return jsonify({
    "owned": owned_orgs,
    "member": filtered_membership
  })

@organization_bp.route("/member/<id>", methods=["GET"], endpoint="Get Members")
@authenticateUser
def get_org_members(id):
  payload = g.payload
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
    "members" : members,
    "user": payload.get("email")
  })

@organization_bp.route("/data/<id>", methods=["GET"], endpoint="Get Organization Data")
def get_org_data(id):
  organization = Organization.objects(id=id).first()
  if(not organization):
    raise DoesNotExist("Organization does not exist")
  assistant_data = AssistantData.objects(organization=id).first()
  if(not assistant_data):
    raise DoesNotExist("Can't find data for the organization")
  
  color_data = {
      "user_bubble_color": assistant_data.user_bubble_color,
      "user_text_color": assistant_data.user_text_color,
      "background_color": assistant_data.background_color,
      "bot_bubble_color": assistant_data.bot_bubble_color,
      "bot_text_color": assistant_data.bot_text_color,
      "error_text_color": assistant_data.error_text_color
  }

  return jsonify({"organization_name": organization.organization_name, "bot_name": assistant_data.name, "files": assistant_data.files, "colors": color_data}), 200

