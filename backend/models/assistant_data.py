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
  user_bubble_color = StringField(required=True, default="#FFF3D9")
  user_text_color = StringField(required=True, default="#000000")
  background_color = StringField(required=True, default="#FFFFFF")
  bot_bubble_color = StringField(required=True, default="#EBEBEB")
  bot_text_color = StringField(required=True, default="#000000")
  error_text_color = StringField(required=True, default="#B12525")
  
  meta = {"collection" : "AssistantDatas"}
