from . import db


class BuildingEvent(db.Model):
    __table__ = db.Model.metadata.tables['Building_Events']
    eventTypes = [
        'Voter Registration',
        'GOTV',
        'Canvass',
        'Messenger Week'
    ]

    def __repr__(self):
        return '<BuildingEvent (desc: {})>'.format(self.Event_description)


class CommunityAttributes(db.Model):
    __table__ = db.Model.metadata.tables['Community_Attributes']

    def __repr__(self):
        return '<CommunityAttribute (desc: {})>'.format(self.address)
