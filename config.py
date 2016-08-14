import os

DEBUG = False


F_DBCRED = os.path.expanduser(
    os.path.join(
        os.path.realpath(os.path.dirname(__file__)),
        'acdc.mysql.cred.yaml'
    )
)

Q_ADDR = """SELECT address, unitcount
FROM ACDCMUBS2016.MUBS_Query
WHERE UnitCount > 10;"""
SP_VOL = "get_volunteers"
SP_VOT = "get_voters"
