from flask import Flask, Blueprint, request, g, jsonify
from models import Organization, AssistantData
from werkzeug.exceptions import NotFound, BadRequest
from mongoengine.errors import DoesNotExist

assistant_data_bp = Blueprint("data_blueprint", __name__)

@assistant_data_bp.route("/<id>", methods=["PATCH"])
def update_instruction(id):
  body = request.get_json()
  if not body.get("instruction") and body.get("name"):
    raise BadRequest("Missing required parameter")
  assistant_data = AssistantData.objects(organization=id).first()
  if not assistant_data:
    raise NotFound("Organization does not exist")
  if body.get("instruction"):
    assistant_data.instruction = body.get("instruction")
  if body.get("name"):
    assistant_data.name = body.get("name")
  assistant_data.save()
  return jsonify({"message": "Updated instruction successfully", "assistant-data": assistant_data}), 200

@assistant_data_bp.route("/<id>")
def get_assistant_data(id):
  assistant_data = AssistantData.objects(organization=id).first()
  if not assistant_data:
    raise DoesNotExist("Organization does not exist")
  return jsonify(assistant_data), 200