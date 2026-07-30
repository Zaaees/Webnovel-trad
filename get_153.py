import json

with open('data/projects.json', encoding='utf-8-sig') as f:
    d = json.load(f)

project = d[0]
glossary = project.get("glossary", [])
target_ch = next(c for c in project['chapters'] if '153' in str(c['id']) and str(c['id']).endswith('-153'))

with open('ch_153.txt', 'w', encoding='utf-8') as f:
    f.write(target_ch['title'] + '\n\n' + target_ch['originalText'])

with open('glossary_153.json', 'w', encoding='utf-8') as f:
    json.dump(glossary, f, ensure_ascii=False, indent=2)
