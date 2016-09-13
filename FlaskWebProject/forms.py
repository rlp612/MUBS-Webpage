from flask_wtf import Form
from wtforms import SubmitField
from wtforms_sqlalchemy.orm import model_form

from . import db
from .models import CommunityAttributes


CommunityAttributesForm = model_form(
    CommunityAttributes, db_session=db.session, base_class=Form
)
CommunityAttributesForm.submit = SubmitField('Update')
