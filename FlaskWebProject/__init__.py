import datetime
import mysql.connector
import requests
import yaml

from flask import Flask, json, redirect, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy

from .utils import load_from_yaml, set_sqlalchemy_params


app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config')

db = SQLAlchemy(app)
# this is all bending over backwards to reflect the db structure into db.Model
set_sqlalchemy_params(app)
db.init_app(app)
db.Model.metadata.reflect(db.engine)

from .models import BuildingEvent


@app.route('/')
def index():
    """load the buildings and display them in a datatable"""
    buildingData = get_buildings(
        fdbcred=app.config['F_DBCRED'],
        addressQry=app.config['Q_ADDR'],
        withurls=True
    )
    return render_template("index.html", buildingData=json.dumps(buildingData))


@app.route('/building/<bldng>')
def building(bldng):
    bldng = requests.utils.unquote(bldng)

    # we may have just passed the buidling name in as a query param
    bname = requests.utils.unquote(request.args.get('bname', ''))
    if bname:
        title = '{} ({})'.format(bldng.title(), bname.title())
    else:
        title = bldng.title()

    voterData = stored_procedure(
        fdbcred=app.config['F_DBCRED'],
        sp=app.config['SP_VOT'],
        args=(bldng,)
    )
    volunteerData = stored_procedure(
        fdbcred=app.config['F_DBCRED'],
        sp=app.config['SP_VOL'],
        args=(bldng,)
    )
    ambassadorData = get_ambassadors(
        fdbcred=app.config['F_DBCRED'],
        ambassadorQry=app.config['Q_AMBA'],
        bldng=bldng
    )
    eventData = get_building_events(bldng)
    return render_template(
        'building.html',
        building=bldng.title(),
        title=title,
        bname=bname,
        simplebldng=bldng,
        voterData=json.dumps(voterData),
        volunteerData=json.dumps(volunteerData),
        ambassadorData=json.dumps(ambassadorData),
        eventData=json.dumps(eventData),
        eventtypes=BuildingEvent.eventTypes
    )


# ------------------------- #
# ambassador CRUD routes    #
# ------------------------- #

@app.route('/ambassadors/<id>', methods=['POST'])
def update_ambassador(id):
    """update the ambassador directly in mysql"""
    ambaForm = request.form.copy()
    bldng = ambaForm.pop('bldng')
    x = update_ambassador_in_db(
        fdbcred=app.config['F_DBCRED'],
        ambassadorUpdateQry=app.config['Q_AMBA_UPDATE'],
        id=id,
        updatedict=ambaForm
    )
    print(bldng)
    return redirect(url_for('building', bldng=bldng))


@app.route('/ambassador/', methods=['POST'])
def new_ambassador():
    """add an ambassador directly in mysql"""
    ambaForm = request.form.copy()
    x = new_ambassador_in_db(
        fdbcred=app.config['F_DBCRED'],
        ambassadorInsertQry=app.config['Q_AMBA_ADD'],
        newAmbaDict=ambaForm
    )
    return redirect(url_for('building', bldng=ambaForm['simple_bldng']))


@app.route('/delete_ambassadors/<id>', methods=['POST'])
def delete_ambassador(id):
    """update the ambassador directly in mysql"""
    x = delete_ambassador_in_db(
        fdbcred=app.config['F_DBCRED'],
        ambassadorDeleteQry=app.config['Q_AMBA_DELETE'],
        id=id
    )
    return redirect(url_for('building', bldng=request.form['bldng']))


# ------------------------- #
# event CRUD routes         #
# ------------------------- #

@app.route('/events/<eventId>', methods=['POST'])
def update_event(eventId):
    """update the event directly in mysql"""
    ev = BuildingEvent.query.filter_by(Event_ID=eventId).first_or_404()
    evForm = request.form.copy()
    bldng = evForm.pop('bldng')

    # update event and commit
    for (k, v) in evForm.items():
        try:
            if k == 'Event_ID':
                # don't update pks, even if they're the same by virtue of qry
                continue
            if k == 'Event_date':
                if v == '':
                    v = None
                else:
                    try:
                        v = datetime.datetime.strptime(v, '%m/%d/%Y')
                    except:
                        continue
            if k == 'Refused_Event':
                v = (v == 'on')
            setattr(ev, k, v)
        except Exception as e:
            print('error adding event: {}'.format(e))
    db.session.commit()

    return redirect(url_for('building', bldng=bldng))


@app.route('/event/', methods=['POST'])
def new_event():
    """add an event directly in mysql"""
    evForm = request.form.copy()
    nev = BuildingEvent()
    for (k, v) in evForm.items():
        try:
            if k == 'Event_date' and v:
                v = datetime.datetime.strptime(v, '%m/%d/%Y')
            setattr(nev, k, v)
        except Exception as e:
            print('error adding event: {}'.format(e))
    db.session.add(nev)
    db.session.commit()
    return redirect(url_for('building', bldng=evForm['simple_bldng']))


@app.route('/delete_event/<eventId>', methods=['POST'])
def delete_event(eventId):
    """update the event directly in mysql"""
    ev = BuildingEvent.query.filter_by(Event_ID=eventId).first()
    db.session.delete(ev)
    db.session.commit()
    return redirect(url_for('building', bldng=request.form['bldng']))


def _qry_to_dict(fdbcred, q, qrykwargs={}):
    """wrapper to query and get a list dict"""
    dbcred = load_from_yaml(fdbcred)
    con = mysql.connector.connect(**dbcred)
    cur = con.cursor()
    cur.execute(q, qrykwargs)
    x = [dict(zip(cur.column_names, row)) for row in cur]
    cur.close()
    con.close()
    return x


def get_buildings(fdbcred, addressQry, withurls=False):
    """simply mysql query of buildings"""
    addr = _qry_to_dict(fdbcred, addressQry)
    addr = sorted(addr, key=lambda row: -row['unitcount'])
    for row in addr:
        row['address'] = row['address'].strip().lower()
        row['neighborhood'] = (row['neighborhood'] or '').strip().lower().title()
        if withurls:
            row['url'] = url_for(
                'building', bldng=row['address'],
                bname=requests.utils.quote(row['neighborhood'])
            )
        row['address'] = row['address'].title()
    return addr


def stored_procedure(fdbcred, sp, args):
    dbcred = load_from_yaml(fdbcred)
    con = mysql.connector.connect(**dbcred)
    cur = con.cursor()
    cur.callproc(sp, args)
    x = [
        dict(zip(bufferedCur.column_names, row))
        for bufferedCur in cur.stored_results()
        for row in bufferedCur.fetchall()
    ]
    cur.close()
    con.close()
    return x


def get_ambassadors(fdbcred, ambassadorQry, bldng):
    """simply mysql query of ambassadors located in a given bldng"""
    amba = _qry_to_dict(fdbcred, ambassadorQry, {'building': bldng})
    for row in amba:
        row['editurl'] = url_for('update_ambassador', id=row['ambassadorID'])
        row['deleteurl'] = url_for('delete_ambassador', id=row['ambassadorID'])
        row['bldng'] = bldng
    return amba


def update_ambassador_in_db(fdbcred, ambassadorUpdateQry, id, updatedict):
    """simply update the row matching the id with the details provided in
    updatedict

    """
    dbcred = load_from_yaml(fdbcred)
    con = mysql.connector.connect(**dbcred)
    cur = con.cursor()
    updatedict['ambassadorID'] = id
    cur.execute(ambassadorUpdateQry, updatedict)
    con.commit()
    x = [dict(zip(cur.column_names, row)) for row in cur]
    cur.close()
    con.close()
    return x


def delete_ambassador_in_db(fdbcred, ambassadorDeleteQry, id):
    """simply delete the row with ambassadorID = id"""
    dbcred = load_from_yaml(fdbcred)
    con = mysql.connector.connect(**dbcred)
    cur = con.cursor()
    cur.execute(ambassadorDeleteQry, {'ambassadorID': id})
    con.commit()
    x = [dict(zip(cur.column_names, row)) for row in cur]
    cur.close()
    con.close()
    return x


def new_ambassador_in_db(fdbcred, ambassadorInsertQry, newAmbaDict):
    dbcred = load_from_yaml(fdbcred)
    con = mysql.connector.connect(**dbcred)
    cur = con.cursor()
    cur.execute(ambassadorInsertQry, newAmbaDict)
    con.commit()
    x = [dict(zip(cur.column_names, row)) for row in cur]
    cur.close()
    con.close()
    return x


def get_building_events(bldng):
    events = [
        event.__dict__
        for event in BuildingEvent.query.filter_by(Apt_address=bldng).all()
    ]
    for event in events:
        del event['_sa_instance_state']
        event['editurl'] = url_for('update_event', eventId=event['Event_ID'])
        event['deleteurl'] = url_for('delete_event', eventId=event['Event_ID'])
        event['bldng'] = bldng
    return events


app.debug = True
if __name__ == "__main__":
    app.run()
