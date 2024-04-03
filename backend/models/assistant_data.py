from mongoengine import Document, ListField, StringField
class AssistantData(Document):
  instruction = StringField(
        required=True, 
        default=""
  )
  organization = StringField(required=True)
  files = ListField(StringField(default=[]))

  meta = {"collection" : "AssistantDatas"}
