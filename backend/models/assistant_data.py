from mongoengine import Document, ListField, StringField, FileField
class AssistantData(Document):
  instruction = StringField(
        required=True, 
        default="",
        max_length=400
  )
  organization = StringField(required=True)
  files = ListField(StringField(default=[]))
  name = StringField(required=True, default="Customer Service Sentinel")
  image = FileField()
  meta = {"collection" : "AssistantDatas"}
