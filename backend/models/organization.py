from mongoengine import Document, StringField, ListField, LazyReferenceField, PULL, CASCADE

class Organization(Document):
  organization_name = StringField(required=True, max_length=50)
  chat_records = ListField(LazyReferenceField("ChatRecord", reverse_delete_rule=CASCADE)) 

  meta = {"collection" : "Organizations"}