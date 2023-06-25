"""D

Revision ID: 8019102b229e
Revises: 302178a781f9
Create Date: 2023-06-25 10:48:43.558442

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8019102b229e'
down_revision = '302178a781f9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('commands', schema=None) as batch_op:
        batch_op.add_column(sa.Column('selected_commands', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('marker_commands', sa.String(), nullable=True))
        batch_op.drop_column('command')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('commands', schema=None) as batch_op:
        batch_op.add_column(sa.Column('command', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('marker_commands')
        batch_op.drop_column('selected_commands')

    # ### end Alembic commands ###
