from mongoengine import Document, StringField, DateField

class Message(Document):
  role = StringField(choices=["system", "user", "assistant"])
  content = StringField()
  date = DateField()
  status = StringField(choices=["pending", "sent", "failed"])

  meta = {"collection" : "Messages"}