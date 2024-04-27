from flask import Flask, Blueprint, request, g, jsonify, Response
from models import Organization, AssistantData
from werkzeug.exceptions import NotFound, BadRequest, Conflict, Unauthorized, RequestEntityTooLarge
from werkzeug.utils import secure_filename
from mongoengine.errors import DoesNotExist
import os

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

@assistant_data_bp.route("/file/<id>", methods=["POST"])
def upload_file(id):
  if "file" not in request.files:
    raise BadRequest("No file found")
  
  file = request.files["file"]
  if file.filename == "":
    raise BadRequest("No selected file")
  
  if file:
    filename = secure_filename(file.filename)
    directory = os.path.join("file", str(id))
    os.makedirs(directory, exist_ok=True)
    file.save(os.path.join("file", str(id), filename))

    assistant_data = AssistantData.objects(organization=id).first()

    duplicate_check = list(filter(lambda file: file == filename, assistant_data.files))
    if len(duplicate_check) != 0:
      raise Conflict("File of the same name already exist")

    assistant_data.files.append(filename)
    assistant_data.save()

    return jsonify({
      "message": "File upload successful"
    }), 200
  
@assistant_data_bp.route("/file/<id>/<filename>", methods=["DELETE"])
def delete_file(id, filename):
  assistant_data = AssistantData.objects(organization=id).first()
  filtered_files = list(filter(lambda file: file != filename, assistant_data.files))
  assistant_data.files = filtered_files
  assistant_data.save()

  try:
    os.remove(os.path.join("file", str(id), filename))
  except FileNotFoundError:
    raise DoesNotExist("File does not exist")
  except PermissionError:
    raise Unauthorized("Permission denied, unable to delete file")

  return jsonify({
    "message": f"File '{filename}' deleted succesfully",
    "files": filtered_files
  }), 200

@assistant_data_bp.route("/image/<id>", methods=["POST"])
def upload_image(id):
  if 'file' not in request.files:
    raise BadRequest("No file found")
  assistant_data = AssistantData.objects(organization=id).first()
  if not assistant_data:
    raise DoesNotExist("Organization does not exist")
  image = request.files['file']
  if not image or image.filename == '':
    raise BadRequest("No selected file")

  assistant_data.image.replace(image, content_type='image/jpeg', filename='image.jpg')
  assistant_data.save()
  return jsonify({
    "message": "Image uploaded successfully"
  }), 200

@assistant_data_bp.route('/image/<org_id>', methods=["GET"])
def serve_image(org_id):
  print(org_id)
  assistant_data = AssistantData.objects(organization=org_id).first()
  if not assistant_data or not assistant_data.image:
    raise DoesNotExist("Image not found")
  
  response = Response(assistant_data.image.read())
  response.headers['Content-Type'] = assistant_data.image.content_type
  return response