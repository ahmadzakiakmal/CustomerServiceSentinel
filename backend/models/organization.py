from mongoengine import Document, StringField, ListField, LazyReferenceField, PULL, CASCADE

class Organization(Document):
  organization_name = StringField(required=True, max_length=50)
  chat_records = ListField(LazyReferenceField("Thread", reverse_delete_rule=CASCADE)) 
  owner = StringField(required=True)

  meta = {"collection" : "Organizations"}