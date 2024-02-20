from mongoengine import Document, ReferenceField
from .user import User
from .organization import Organization

class Membership(Document):
    user = ReferenceField(User)
    organization = ReferenceField(Organization)

    meta = {"collection": "_Memberships"}
