"""Format static deliverables without changing inline text or dependencies."""
from pathlib import Path
import re
root = Path(__file__).resolve().parents[1]
block = r'(?=<(?:/?(?:head|body|header|nav|main|section|article|footer|div|p|h[1-6]|figure|figcaption|ul|ol|li|dl|dt|dd|table|thead|tbody|tr|form|fieldset|details)|meta|link)\b)'
for p in root.rglob('*.html'):
    if any(x in p.parts for x in ['node_modules', '.sites-runtime']) or p.name.startswith('_'):
        continue
    s = re.sub(block, '\n', p.read_text())
    p.write_text(re.sub(r'\n\s*\n+', '\n', s).strip() + '\n')
for p in [*root.glob('assets/*.css'), *root.glob('works/*/*.css')]:
    p.write_text(re.sub(r'}\s*', '}\n', p.read_text()).strip() + '\n')
