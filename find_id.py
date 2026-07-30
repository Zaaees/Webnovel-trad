import json

with open('data/projects.json', encoding='utf-8-sig') as f:
    d = json.load(f)

for p in d:
    print("Project ID:", p['id'])
    for c in p['chapters']:
        if '153' in str(c['id']):
            print("  Found chapter 153:", c['id'])
