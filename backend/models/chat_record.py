from mongoengine import Document, ListField, ReferenceField, StringField, DateField, CASCADE

class ChatRecord(Document):
  chats = ListField(ReferenceField("Message", reverse_delete_rule=CASCADE))
  topic = StringField()
  date = DateField()

  meta = {"collection" : "ChatRecords"}