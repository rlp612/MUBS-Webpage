import os

DEBUG = False

SECRET_KEY = os.environ.get(
    'SECRET_KEY',
    '\xd7T\xd3k4G\x05<\xd5\xed\xdbK\x14\xdb\xf6\xa3\xad\x18q\xbd\xc3\xfc\xbbJ'
)

# you can override this here; it will be set automatically in run.py and
# __init__.py based on the fdbcred parameter (so we don't hardcode any of this)
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', None)
SQLALCHEMY_TRACK_MODIFICATIONS = False

F_DBCRED = os.path.expanduser(
    os.path.join(
        os.path.realpath(os.path.dirname(__file__)),
        'acdc.mysql.cred.yaml'
    )
)

Q_ADDR = "SELECT * FROM ACDCMUBS2016.MUBS_Page_View;"
Q_ADDR_BAK = """SELECT
    lft.address
    , lft.unitcount
    , lft.neighborhood
    , doors.doorcount
    , voters.votercount
    , volunteers.volcount
    , precinct.precinct
FROM
    ACDCMUBS2016.MUBS_Query lft
    LEFT JOIN ACDCMUBS2016.VAN_Door_Count doors
        ON (LOWER(TRIM(lft.address)) = doors.apt_address)
    LEFT JOIN ACDCMUBS2016.VAN_Voter_Count voters
        ON (LOWER(TRIM(lft.address)) = voters.apt_address)
    LEFT JOIN ACDCMUBS2016.VAN_Volunteer_Count volunteers
        ON (LOWER(TRIM(lft.address)) = volunteers.apt_address)
    LEFT JOIN ACDCMUBS2016.Precinct_Lookup precinct
        ON (LOWER(TRIM(lft.address)) = LOWER(TRIM(TRAILING "\r" FROM TRIM(precinct.address))))
;"""
SP_VOL = "get_volunteers"
SP_VOT = "get_voters"
SP_NO_VOTER = "no_voter_apts"

Q_AMBA = """SELECT * FROM MUB_Ambassadors WHERE address = %(building)s;"""
Q_AMBA_UPDATE = """UPDATE MUB_Ambassadors
    SET
        Ambassador_Name = %(Ambassador_Name)s
        , Amb_Apartment = %(Amb_Apartment)s
        , Email = %(Email)s
        , Phone = %(Phone)s
    WHERE
        ambassadorID = %(ambassadorID)s
;"""
Q_AMBA_ADD = """INSERT INTO MUB_Ambassadors
    SET
        Address = %(Address)s
        , Building_Name = %(Building_Name)s
        , Ambassador_Name = %(Ambassador_Name)s
        , Email = %(Email)s
        , Phone = %(Phone)s
        , Amb_Apartment = %(Amb_Apartment)s
;"""
Q_AMBA_DELETE = """DELETE FROM MUB_Ambassadors
WHERE ambassadorID = %(ambassadorID)s
;"""
