import json
with open('data/projects.json', encoding='utf-8') as f:
    data = json.load(f)

for p in data:
    for ch in p['chapters']:
        if str(ch['id']).endswith('154'):
            with open('ch154_clean.txt', 'w', encoding='utf-8') as out:
                out.write(ch['title'] + '\n---\n' + ch['originalText'])
            print(f"Found {ch['id']} and saved to ch154_clean.txt")
            break
