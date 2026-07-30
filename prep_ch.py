import json
import sys

DATA_PATH = r"f:\Dossiers Utilisateur\Desktop\Traduction Webnovel\data\projects.json"

def prep(ch_number):
    with open(DATA_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    project = data[0]
    glossary = project.get("glossary", [])
    
    target_ch = None
    for ch in project.get("chapters", []):
        ch_id = ch.get("id", "")
        ch_title = ch.get("title", "")
        if ch_id.endswith(f"-{ch_number}") or ch_title == f"Chapter {ch_number}" or f"Chapter {ch_number} " in ch_title or f"Chapter {ch_number}:" in ch_title or f"Chapitre {ch_number}" in ch_title:
            target_ch = ch
            break
            
    if not target_ch:
        print(f"ERROR: Chapter {ch_number} not found")
        sys.exit(1)
        
    text = target_ch.get("originalText", "")
    title = target_ch.get("title", "")
    
    matched_glossary = []
    for g in glossary:
        if g['original'].lower() in text.lower() or g['original'].lower() in title.lower():
            matched_glossary.append(g)
            
    res = {
        "id": target_ch.get("id"),
        "number": ch_number,
        "title": title,
        "originalText": text,
        "matched_glossary": matched_glossary
    }
    with open(f"ch{ch_number}_prep.json", "w", encoding="utf-8") as f:
        json.dump(res, f, ensure_ascii=False, indent=2)
    print(f"Prepped ch{ch_number}_prep.json")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        prep(sys.argv[1])
