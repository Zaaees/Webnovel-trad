import json
import os
import sys
import time

DATA_PATH = r"f:\Dossiers Utilisateur\Desktop\Traduction Webnovel\data\projects.json"
PUBLIC_DATA_PATH = r"f:\Dossiers Utilisateur\Desktop\Traduction Webnovel\public\data\projects.json"
LOCK_PATH = r"f:\Dossiers Utilisateur\Desktop\Traduction Webnovel\data\projects.json.lock"

def acquire_lock():
    while True:
        try:
            # Atomic creation of lock file
            fd = os.open(LOCK_PATH, os.O_CREAT | os.O_EXCL | os.O_RDWR)
            os.close(fd)
            break
        except FileExistsError:
            time.sleep(0.1)

def release_lock():
    try:
        if os.path.exists(LOCK_PATH):
            os.remove(LOCK_PATH)
    except Exception:
        pass

def update_chapter(ch_number, title, draft_text, validation_notes, translated_text, new_lore_terms=None):
    acquire_lock()
    try:
        for file_path in [DATA_PATH, PUBLIC_DATA_PATH]:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            project = data[0]
            
            # Update glossary if new terms provided
            if new_lore_terms:
                existing_originals = {g.get("original", "").lower() for g in project.get("glossary", [])}
                for item in new_lore_terms:
                    orig = item.get("original", "").strip()
                    if orig and orig.lower() not in existing_originals:
                        term_id = item.get("id") or f"g-auto-{int(time.time() * 1000)}"
                        project.setdefault("glossary", []).append({
                            "id": term_id,
                            "original": orig,
                            "translation": item.get("translation", ""),
                            "notes": item.get("notes", "")
                        })
                        existing_originals.add(orig.lower())

            # Find chapter
            target_ch = None
            for ch in project.get("chapters", []):
                ch_id = ch.get("id", "")
                ch_title = ch.get("title", "")
                if (ch_id.endswith(f"-{ch_number}") or 
                    ch_title == f"Chapter {ch_number}" or 
                    ch_title == f"Chapitre {ch_number}" or
                    f"Chapter {ch_number} " in ch_title or 
                    f"Chapter {ch_number}:" in ch_title or 
                    f"Chapitre {ch_number} " in ch_title or
                    f"Chapitre {ch_number}:" in ch_title):
                    target_ch = ch
                    break
                    
            if not target_ch:
                raise ValueError(f"Chapter {ch_number} not found in {file_path}")
                
            target_ch["title"] = title
            target_ch["draftText"] = draft_text
            target_ch["validationNotes"] = validation_notes
            target_ch["translatedText"] = translated_text
            target_ch["status"] = "done"
            
            # Write back
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                
            print(f"Successfully updated Chapter {ch_number} in {file_path}")
    finally:
        release_lock()

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        print("Update script ready with atomic locking.")
