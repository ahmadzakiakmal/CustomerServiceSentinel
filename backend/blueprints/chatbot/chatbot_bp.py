from flask import Blueprint, request, jsonify
from middlewares.authentications import authenticateUser
from werkzeug.exceptions import BadRequest, NotFound
from openai import OpenAI
from models import AssistantData, Organization

chatbot_bp = Blueprint("chatbot_blueprint", __name__)

client = OpenAI()

@chatbot_bp.route("/chat", methods=["POST"])
@authenticateUser
def chat():
  try:
    data = request.get_json()
    if not data.get("message"):
      raise BadRequest("Message is empty")
    completion = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": 
         """
         You are CustomerServiceSentinel. 
         Made to as a customer service assistant. 
         The user can customize you to fit their organization by giving you data. 
         The user is the owner of the organization.
         """},
        {"role": "user", "content": data["message"]}
      ]
    )
    print(completion.choices[0].message.content)
    return jsonify(
      {
        "completion" : completion.choices[0].message.content
      }
    ), 200
  except BadRequest as e:
    return jsonify({
      "message" : str(e)
    }), 400
  
@chatbot_bp.route("/chat/<id>", methods=["POST"])
def chat_customized(id):
  try:
    org = Organization.objects(id=id)
    print(org)
    if not org:
      raise NotFound("Organization does not exist")
    data = request.get_json()
    if not data.get("message"):
      raise BadRequest("Message is empty")
    assistant_data = AssistantData.objects(organization=id).first()
    messages = []
    messages.append(
      {
      "role": "system", "content": 
      """
      Refrain from answering questions beyond your job as a customer service.
      """
      },
    )
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
  except BadRequest as e:
    return jsonify({
      "message" : str(e)
    }), 400
  except NotFound as e:
    return jsonify({
      "message": str(e)
    }), 404