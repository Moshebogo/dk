"""stuff

Revision ID: 912d2fe6ecea
Revises: 9cb20c8f8968
Create Date: 2023-05-28 00:52:14.991360

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '912d2fe6ecea'
down_revision = '9cb20c8f8968'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('commands',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('command', sa.String(), nullable=False),
    sa.Column('user', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('commands')
    # ### end Alembic commands ###
