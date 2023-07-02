"""added new_or_old_user

Revision ID: 9f561191aa9e
Revises: 6c47990b09b5
Create Date: 2023-07-02 14:10:07.824889

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f561191aa9e'
down_revision = '6c47990b09b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('commands', schema=None) as batch_op:
        batch_op.drop_constraint('uq_marker_commands', type_='unique')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('new_or_old_user', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('new_or_old_user')

    with op.batch_alter_table('commands', schema=None) as batch_op:
        batch_op.create_unique_constraint('uq_marker_commands', ['marker_commands'])

    # ### end Alembic commands ###
