import json

with open('ch134_data.json', 'r', encoding='utf-16') as f:
    data = json.load(f)

print(f"TITLE: {data.get('title')}")
print("--- ORIGINAL TEXT ---")
print(data.get('originalText'))
