from langchain_openai import OpenAIEmbeddings
from flask import Blueprint, request, jsonify
from middlewares.authentications import authenticateUser
from werkzeug.exceptions import BadRequest, UnsupportedMediaType
from mongoengine.errors import DoesNotExist
from openai import OpenAI
from models import AssistantData, Organization
from langchain_community.document_loaders import DirectoryLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain_openai import ChatOpenAI

chatbot_bp = Blueprint("chatbot_blueprint", __name__)

# client = OpenAI()

@chatbot_bp.route("/langchain/<id>", methods=["POST"])
def chat(id):
  org = Organization.objects(id=id).first()
  if not org:
    raise DoesNotExist("Organization does not exist")
  data = request.get_json()
  if not data.get("messages"):
    raise BadRequest("Messages is empty")
  
  # dir_loader = DirectoryLoader(f"./file/{id}", glob="*.txt")
  # index = VectorstoreIndexCreator().from_loaders([dir_loader])

  assistant_data = AssistantData.objects(organization=id).first()
  messages = []
  if len(messages) < 3:
    messages.append(
      {"role": "system", "content": f"You are named '{assistant_data.name}'. Serving the organization, '{org.organization_name}'"},
    )
    if assistant_data.instruction == "":
      messages.append(
        {
        "role": "system", "content": 
          (
          "You are made as a customer service assistant. "
          "The user is the owner of the organization. And this is your testing field. "
          "The user can customize you to fit their organization by giving you data. Tell them to customize your instruction in the 'Testing' section. "
          "Refrain from answering questions beyond your scope as a customer service. "
          )
        }
      )
    else:
      messages.append(
        {
          "role": "system",
          "content": assistant_data.instruction
        }
      )
  # messages.append(
  #   {
  #   "role": "system",
  #   "content" : index.query("write the important information from the documents")
  #   }
  # )
  messages.append(
    {
    "role": "system",
    "content" : "use markdown syntax"
    }
  )
  for message in data.get("messages"):
    messages.append(message)
  # completion = client.chat.completions.create(
  #   model="gpt-3.5-turbo",
  #   messages=messages,
  #   max_tokens=500,
  #   temperature=0.0
  # )
  # for message in messages:
  #   print(message)
  return jsonify(
    {
      "completion" : "Chatbot has been disabled to save resources (API Key Credits)",
      "assistant_data": assistant_data,
      "messages": messages
    }
  ), 200
  
@chatbot_bp.route("/default/<id>", methods=["POST"])
def chat_customized(id):
  org = Organization.objects(id=id).first()
  if not org:
    raise DoesNotExist("Organization does not exist")
  data = request.get_json()
  if not data.get("messages"):
    raise BadRequest("Messages is empty")
  assistant_data = AssistantData.objects(organization=id).first()
  messages = []
  if len(messages) < 3:
    messages.append(
      {"role": "system", "content": f"You are named '{assistant_data.name}'. Serving the organization, '{org.organization_name}'"},
    )
    if assistant_data.instruction == "":
      messages.append(
        {
        "role": "system", "content": 
          (
          "You are made as a customer service assistant. "
          "The user is the owner of the organization. And this is your testing field. "
          "The user can customize you to fit their organization by giving you data. Tell them to customize your instruction in the 'Testing' section. "
          "Refrain from answering questions beyond your scope as a customer service. "
          )
        }
      )
    else:
      messages.append(
        {
          "role": "system",
          "content": assistant_data.instruction
        }
      )
  for message in data.get("messages"):
    messages.append(message)
  # completion = client.chat.completions.create(
  #   model="gpt-3.5-turbo",
  #   messages=messages,
  #   max_tokens=500,
  #   temperature=0.0
  # )
  # for message in messages:
  #   print(message)
  return jsonify(
    {
      "completion" : "Chatbot has been disabled to save resources (API Key Credits)",
      "assistant_data": assistant_data,
      "messages": messages
    }
  ), 200