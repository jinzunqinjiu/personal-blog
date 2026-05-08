"""backfill vip users by registration order

Revision ID: 20260508_0003
Revises: 20260508_0002
Create Date: 2026-05-08 18:08:00
"""

from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "20260508_0003"
down_revision: Union[str, None] = "20260508_0002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 业务规则：按注册顺序前 100 名用户标记为 VIP（以自增 id 近似注册顺序）。
    op.execute("UPDATE users SET is_vip = 1 WHERE id <= 100")


def downgrade() -> None:
    op.execute("UPDATE users SET is_vip = 0 WHERE id <= 100")

