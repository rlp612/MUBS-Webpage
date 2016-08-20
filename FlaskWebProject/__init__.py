import json

import mysql.connector
import requests
import yaml

from flask import Flask, render_template, request, url_for


app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config')


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
    return render_template(
        'building.html',
        building=bldng.title(),
        title=title,
        bname=bname,
        voterData=json.dumps(voterData),
        volunteerData=json.dumps(volunteerData)
    )


def get_buildings(fdbcred, addressQry, withurls=False):
    """simply mysql query of buildings"""
    dbcred = load_from_yaml(fdbcred)
    con = mysql.connector.connect(**dbcred)
    cur = con.cursor()
    cur.execute(addressQry)
    addr = [dict(zip(cur.column_names, row)) for row in cur]
    cur.close()
    con.close()
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


def get_building_name(fdbcred, bldngNameQry, buildingName):
    """given a building, find the building name (in the db called neighborhood)"""
    dbcred = load_from_yaml(fdbcred)
    con = mysql.connector.connect(**dbcred)
    cur = con.cursor()
    cur.execute(bldngNameQry)
    addr = [dict(zip(cur.column_names, row)) for row in cur]
    cur.close()
    con.close()
    addr = sorted(addr, key=lambda row: -row['unitcount'])
    for row in addr:
        row['address'] = row['address'].strip().lower()
        row['neighborhood'] = (row['neighborhood'] or '').strip().lower().title()
        if withurls:
            row['url'] = url_for('building', bldng=row['address'])
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


def load_from_yaml(fyaml):
    with open(fyaml, 'r') as f:
        return yaml.load(f)


app.debug = True
if __name__ == "__main__":
    app.run()
