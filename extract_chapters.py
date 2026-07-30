import json
import os

DATA_PATH = r"f:\Dossiers Utilisateur\Desktop\Traduction Webnovel\data\projects.json"

with open(DATA_PATH, "r", encoding="utf-8") as f:
    data = json.load(f)

project = data[0]

for ch_number in range(173, 183):
    for ch in project.get("chapters", []):
        ch_title = ch.get("title", "")
        if f"Chapter {ch_number}" in ch_title or f"Chapter {ch_number}:" in ch_title:
            out_file = f"ch_{ch_number}.json"
            with open(out_file, "w", encoding="utf-8") as out:
                json.dump({"title": ch_title, "originalText": ch.get("originalText", "")}, out, ensure_ascii=False, indent=2)
            break
