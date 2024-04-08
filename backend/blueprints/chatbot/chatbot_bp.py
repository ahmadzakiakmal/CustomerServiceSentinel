from flask import Blueprint, request, jsonify
from middlewares.authentications import authenticateUser
from werkzeug.exceptions import BadRequest, NotFound
from mongoengine.errors import DoesNotExist
from openai import OpenAI
from models import AssistantData, Organization

chatbot_bp = Blueprint("chatbot_blueprint", __name__)

client = OpenAI()

@chatbot_bp.route("/chat/<id>", methods=["POST"])
def chat_customized(id):
  org = Organization.objects(id=id)
  print(org)
  if not org:
    raise DoesNotExist("Organization does not exist")
  data = request.get_json()
  if not data.get("message"):
    raise BadRequest("Message is empty")
  assistant_data = AssistantData.objects(organization=id).first()
  messages = []
  messages.append(
      {"role": "system", "content": f"You are named '{assistant_data.name}'"},
    )
  if assistant_data.instruction == "" or not assistant_data.instruction:
    messages.append(
    {
    "role": "system", "content": 
    (
      "You are made as a customer service assistant. "
      "The user can customize you to fit their organization by giving you data. Tell them to customize your instruction. "
      "Refrain from answering questions beyond your job as a customer service. "
    )
    },
  )
  else:
    messages.append(
      {"role": "system", "content": assistant_data.instruction}
    )
  messages.append({"role": "user", "content": data.get("message")})
  completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=messages,
    max_tokens=500
  )
  return jsonify(
    {
      "completion" : completion.choices[0].message.content,
      "instructions": assistant_data
    }
  ), 200
