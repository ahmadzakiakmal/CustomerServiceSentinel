from flask import Flask, Blueprint, request, g, jsonify
from models import Organization, AssistantData
from werkzeug.exceptions import NotFound

assistant_data_bp = Blueprint("data_blueprint", __name__)


@assistant_data_bp.route("/instruction", methods=["POST"])
def create_instruction():
  try:
    data = request.get_json()
    org = Organization.objects(id=data.get("orgId")).first()
    if not org:
      raise NotFound("Organization does not exist")
    instruction = AssistantData(instruction=data.get("instruction"), organization=str(org.id))
    instruction.save()
    return jsonify({"message": f"Successfully added instruction to {org.organization_name}"}), 201
  except NotFound as e:
    return str(e), 404
  except Exception as e:
    return str(e), 500
  
@assistant_data_bp.route("/instruction/<id>", methods=["DELETE"])
def delete_instruction(id):
  try:
    instruction = AssistantData.objects(id=id).first()
    if not instruction:
      raise NotFound(f"Instruction with id {id} not found")
    instruction.delete()
    return jsonify({"message": "Instruction deleted successfully"}), 200
  except NotFound as e:
    return jsonify({"message": str(e)}), 404