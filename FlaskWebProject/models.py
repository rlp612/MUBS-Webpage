from . import db


class BuildingEvent(db.Model):
    __table__ = db.Model.metadata.tables['Building_Events']

    def __repr__(self):
        return '<BuildingEvent (desc: {})>'.format(self.Event_description)
