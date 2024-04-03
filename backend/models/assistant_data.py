from mongoengine import Document, ListField, StringField
class AssistantData(Document):
  instruction = StringField(
        required=True, 
        default=(
        "You are CustomerServiceSentinel."
        "Made to as a customer service assistant."
        "The user can customize you to fit their organization by giving you data. Tell them to customize your data"
        "Refrain from answering questions beyond your job as a customer service."
        )
  )
  organization = StringField(required=True)
  files = ListField(StringField(default=[]))

  meta = {"collection" : "AssistantDatas"}
