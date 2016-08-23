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
