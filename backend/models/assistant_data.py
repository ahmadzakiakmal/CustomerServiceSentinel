from mongoengine import Document, ListField, StringField
class AssistantData(Document):
  data = ListField(StringField)

  meta = {"collection" : "AssistantDatas"}
