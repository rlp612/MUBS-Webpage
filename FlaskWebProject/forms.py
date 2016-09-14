from flask_wtf import Form
from wtforms import BooleanField, SubmitField
from wtforms_sqlalchemy.orm import model_form

from . import db
from .models import CommunityAttributes


CommunityAttributesForm = model_form(
    CommunityAttributes, db_session=db.session, base_class=Form
)

# tinyint = boolean, thanks mysql, never change
fieldOverrides = {
    'Gated_Access': BooleanField,
    'On_site_management': BooleanField,
    'Clubhouse': BooleanField,
}

for (fieldname, fieldtype) in tinyintfields.items():
    try:
        getattr(CommunityAttributesForm, fieldname).field_class = fieldtype
    except:
        pass

# finally, a way to submit the form
CommunityAttributesForm.submit = SubmitField('Update')
