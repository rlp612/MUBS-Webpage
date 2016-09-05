import yaml


def load_from_yaml(fyaml):
    with open(fyaml, 'r') as f:
        return yaml.load(f)


def set_sqlalchemy_params(app):
    """because we're storing our credentials externally, let's not hard-code the
    required sql alchemy app params but instead load them dynamically. just have
    to remember this in startup scripts

    """
    # allow env param configs
    if app.config['SQLALCHEMY_DATABASE_URI'] is None:
        uri = 'mysql+mysqlconnector://{user:}:{password:}@{host:}/{database:}'.format(
            **load_from_yaml(app.config['F_DBCRED'])
        )
        app.config['SQLALCHEMY_DATABASE_URI'] = uri
    else:
        print('param SQLALCHEMY_DATABASE_URI set via environment variables')
