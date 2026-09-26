from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=set();self.links=[];self.assets=[];self.h1=0;self.title=False;self.description=False;self.images=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if 'id' in a:self.ids.add(a['id'])
  if t=='h1':self.h1+=1
  if t=='title':self.title=True
  if t=='meta' and a.get('name')=='description':self.description=True
  if t=='a':self.links.append(a.get('href',''))
  if t=='img':self.images.append(a);self.assets.append(a.get('src',''))
  if t=='script' and 'src' in a:self.assets.append(a['src'])
  if t=='link' and a.get('rel')=='stylesheet':self.assets.append(a.get('href',''))
pages={};errors=[]
for p in ROOT.rglob('*.html'):
 if 'node_modules' in p.parts or p.name.startswith('_'):continue
 d=Page();d.feed(p.read_text());pages[p]=d
for p,d in pages.items():
 name=str(p.relative_to(ROOT))
 for cond,msg in [(d.h1==1,f'h1 count {d.h1}'),(d.title,'title missing'),(d.description,'description missing')]:
  if not cond:errors.append([name,msg])
 for im in d.images:
  if 'alt' not in im:errors.append([name,'image missing alt'])
 for url in d.links+d.assets:
  if not url or url=='#':errors.append([name,'empty link']);continue
  u=urlsplit(url)
  if u.scheme or u.netloc:continue
  dest=(p.parent/unquote(u.path)).resolve() if u.path else p
  if dest.is_dir():dest/= 'index.html'
  if not dest.exists():errors.append([name,'missing '+url])
  elif u.fragment and dest in pages and u.fragment not in pages[dest].ids:errors.append([name,'missing anchor '+url])
 for bad in ['〇〇','Lorem ipsum','850棟','口コミ評価','92%','180社','320件','いちばん人気']:
  if bad in p.read_text():errors.append([name,'forbidden text '+bad])
report={'pages':len(pages),'local_links':sum(len(x.links) for x in pages.values()),'assets':sum(len(x.assets) for x in pages.values()),'errors':errors}
print(json.dumps(report,ensure_ascii=False,indent=2));(ROOT/'docs'/'static-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
