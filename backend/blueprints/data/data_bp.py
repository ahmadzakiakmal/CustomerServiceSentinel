from flask import Flask, Blueprint, request, g, jsonify
from models import Organization, AssistantData
from werkzeug.exceptions import NotFound, BadRequest

assistant_data_bp = Blueprint("data_blueprint", __name__)

@assistant_data_bp.route("/instruction/<id>", methods=["PATCH"])
def update_instruction(id):
  body = request.get_json()
  if not body.get("instruction"):
    raise BadRequest("Missing required parameter: instruction")
  assistant_data = AssistantData.objects(organization=id).first()
  if not assistant_data:
    raise NotFound("Organization does not exist")
  assistant_data.instruction = body.get("instruction")
  assistant_data.save()
  return jsonify({"message": "Updated instruction successfully", "assistant-data": assistant_data}), 200