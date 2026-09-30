from pathlib import Path

from bs4 import BeautifulSoup
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

root = Path(r"C:\Users\TA26083\OneDrive - Stellantis\Documents\AI-QUALITY-INSPECTION- APP")
html_path = root / "Created" / "CI_CD_Deployment_Plan.html"
pdf_path = Path(r"C:\Users\TA26083\Downloads\CI_CD_Deployment_Plan_v2.pdf")

html = html_path.read_text(encoding="utf-8", errors="ignore")
soup = BeautifulSoup(html, "html.parser")

for tag in soup(["style", "script"]):
    tag.decompose()

doc = SimpleDocTemplate(
    str(pdf_path),
    pagesize=A4,
    leftMargin=14 * mm,
    rightMargin=14 * mm,
    topMargin=14 * mm,
    bottomMargin=14 * mm,
)

styles = getSampleStyleSheet()
body = ParagraphStyle(
    "Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.2, leading=12
)
h2 = ParagraphStyle(
    "H2", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, spaceBefore=6, spaceAfter=3
)
h3 = ParagraphStyle(
    "H3", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=10.4, spaceBefore=4, spaceAfter=2
)

story = []

for node in soup.find_all(["h1", "h2", "h3", "p", "li", "tr"]):
    name = node.name
    text = " ".join(node.get_text(" ", strip=True).split())
    if not text:
        continue

    if name == "h1":
        story.append(Paragraph(text, styles["Title"]))
        story.append(Spacer(1, 4))
    elif name == "h2":
        story.append(Paragraph(text, h2))
    elif name == "h3":
        story.append(Paragraph(text, h3))
    elif name == "li":
        story.append(Paragraph(f"- {text}", body))
    elif name == "tr":
        cols = [
            " ".join(td.get_text(" ", strip=True).split())
            for td in node.find_all(["th", "td"])
        ]
        if cols:
            story.append(Paragraph(" | ".join(cols), body))
    else:
        story.append(Paragraph(text, body))

story.append(Spacer(1, 8))
story.append(Paragraph("Generated from updated CI_CD_Deployment_Plan.html", body))

doc.build(story)
print(f"PDF_CREATED:{pdf_path}")
