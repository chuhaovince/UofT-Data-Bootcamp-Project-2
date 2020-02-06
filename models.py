from app import db


class Station(db.Model):
    __tablename__ = 'stationinfo'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    pocode = db.Column(db.String(10))
    state = db.Column(db.String(10))
    country = db.Column(db.String(10))
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    website = db.Column(db.String(255))
    contactinfo = db.Column(db.String(15))


    def __repr__(self):
        return '<Station %r>' % (self.name)