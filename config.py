import os

DEBUG = False


F_DBCRED = os.path.expanduser(
    os.path.join(
        os.path.realpath(os.path.dirname(__file__)),
        'acdc.mysql.cred.yaml'
    )
)

Q_ADDR = """SELECT
    lft.address
    , lft.unitcount
    , lft.neighborhood
    , doors.doorcount
    , voters.votercount
    , volunteers.volcount
FROM
    ACDCMUBS2016.MUBS_Query lft
    LEFT JOIN ACDCMUBS2016.VAN_Door_Count doors
        ON (LOWER(TRIM(lft.address)) = doors.apt_address)
    LEFT JOIN ACDCMUBS2016.VAN_Voter_Count voters
        ON (LOWER(TRIM(lft.address)) = voters.apt_address)
    LEFT JOIN ACDCMUBS2016.VAN_Volunteer_Count volunteers
        ON (LOWER(TRIM(lft.address)) = volunteers.apt_address)
;"""
SP_VOL = "get_volunteers"
SP_VOT = "get_voters"
