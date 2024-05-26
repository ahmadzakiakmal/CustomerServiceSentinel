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
  user_bubble_color = StringField(required=True, default="#ffc2c2")
  user_text_color = StringField(required=True, default="#000000")
  background_color = StringField(required=True, default="#ffffff")
  bot_bubble_color = StringField(required=True, default="#df4343")
  bot_text_color = StringField(required=True, default="#ffffff")
  error_text_color = StringField(required=True, default="#ffee33")
  
  meta = {"collection" : "AssistantDatas"}
