"""Extract the chapter outline and two figures from the supplied manuscript."""
import json
from pathlib import Path

import pypdfium2 as pdfium
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/paper/Physical_AI___Monograph.pdf"
reader = PdfReader(SOURCE)
outline = reader.outline
parts = []
chapter_number = 0
for index, item in enumerate(outline):
    if not isinstance(item, dict) or not item["/Title"].startswith(("I ", "II ", "III ")):
        continue
    children = outline[index + 1] if index + 1 < len(outline) and isinstance(outline[index + 1], list) else []
    chapters = []
    for child_index, child in enumerate(children):
        if not isinstance(child, dict) or child["/Title"] == "References":
            continue
        chapter_number += 1
        sections = children[child_index + 1] if child_index + 1 < len(children) and isinstance(children[child_index + 1], list) else []
        chapters.append({
            "number": chapter_number,
            "title": child["/Title"].strip(),
            "page": reader.get_destination_page_number(child) + 1,
            "sections": [
                {"number": f"{chapter_number}.{section_index + 1}", "title": section["/Title"].strip(), "page": reader.get_destination_page_number(section) + 1}
                for section_index, section in enumerate(x for x in sections if isinstance(x, dict))
            ],
        })
    title = item["/Title"]
    roman, name = title.split(" ", 1)
    parts.append({"id": roman.lower(), "number": roman, "title": name, "chapters": chapters})

(ROOT / "src/data/contents.json").write_text(json.dumps(parts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
(ROOT / "reference/abstract.txt").write_text(reader.pages[0].extract_text().split("Abstract", 1)[1].split("Contents", 1)[0], encoding="utf-8")
print(json.dumps({"pages": len(reader.pages), "parts": len(parts), "chapters": chapter_number, "titles": [c["title"] for p in parts for c in p["chapters"]]}, ensure_ascii=False))

document = pdfium.PdfDocument(str(SOURCE))
for page, name, box in [
    (12, "progression", (88, 92, 524, 226)),
    (18, "closed-loop", (90, 97, 522, 395)),
]:
    output = ROOT / "reference" / f"page-{page}"
    scale = 200 / 72
    page_image = document[page - 1].render(scale=scale).to_pil()
    page_image.save(output.with_suffix(".png"))
    image = page_image.crop(tuple(round(value * scale) for value in box))
    image.save(ROOT / "public/images/monograph" / f"{name}.png", optimize=True)
    print(name, image.size)
