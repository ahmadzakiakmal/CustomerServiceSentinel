from mongoengine import Document, ListField, StringField
class AssistantData(Document):
  instruction = StringField(required=True)
  organization = StringField(required=True)

  meta = {"collection" : "AssistantDatas"}
