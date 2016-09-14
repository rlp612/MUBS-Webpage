from flask_wtf import Form
from wtforms import IntegerField, HiddenField, SubmitField
from wtforms.widgets import CheckboxInput
from wtforms_sqlalchemy.orm import model_form

from . import db
from .models import CommunityAttributes


CommunityAttributesForm = model_form(
    CommunityAttributes, db_session=db.session, base_class=Form,
    exclude_pk=False
)

class MysqlBooleanField(IntegerField):
    widget = CheckboxInput()

    def process_formdata(self, value):
        self.data = bool(value)


# tinyint = boolean, thanks mysql, never change
fieldOverrides = {
    'address': HiddenField,
    'Gated_Access': MysqlBooleanField,
    'On_site_management': MysqlBooleanField,
    'Clubhouse': MysqlBooleanField,
}

for (fieldname, fieldtype) in fieldOverrides.items():
    try:
        getattr(CommunityAttributesForm, fieldname).field_class = fieldtype
    except:
        pass

# finally, a way to submit the form
CommunityAttributesForm.submit = SubmitField('Update')
