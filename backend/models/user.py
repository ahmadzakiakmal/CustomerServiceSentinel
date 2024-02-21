from mongoengine import Document, StringField, ListField, LazyReferenceField, PULL

class User(Document):
  email = StringField(required=True, unique=True)
  user_name = StringField(required=True, max_length=40)
  password = StringField()
  salt = StringField()

  meta = {"collection" : "Users"}