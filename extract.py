import json

with open('data/projects.json', encoding='utf-8-sig') as f:
    d = json.load(f)

nm = next(p for p in d if p['id'] == 'nanomachine')
ch = next(c for c in nm['chapters'] if c['id'] == 'nm-153')

with open('ch_153.txt', 'w', encoding='utf-8') as f:
    f.write(ch['title'] + '\n\n' + ch['originalText'])
