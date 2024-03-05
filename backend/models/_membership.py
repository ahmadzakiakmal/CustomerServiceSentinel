from mongoengine import Document, ReferenceField, StringField
from .user import User
from .organization import Organization

class Membership(Document):
    user = StringField()
    organization = ReferenceField(Organization)

    meta = {"collection": "_Memberships"}
