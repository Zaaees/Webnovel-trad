import json
import sys

DATA_PATH = r"f:\Dossiers Utilisateur\Desktop\Traduction Webnovel\data\projects.json"

def get_chapter(ch_number):
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
        
    res = {
        "id": target_ch.get("id"),
        "number": ch_number,
        "title": target_ch.get("title"),
        "status": target_ch.get("status"),
        "originalText": target_ch.get("originalText"),
        "glossary": glossary
    }
    print(json.dumps(res, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_chapter(sys.argv[1])
