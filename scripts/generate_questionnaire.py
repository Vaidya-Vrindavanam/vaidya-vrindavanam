from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def add_title_page(doc):
    """Create professional title page with instructions"""

    # Add title
    title = doc.add_paragraph()
    title.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    title_run = title.add_run("Vaidya Vrindavanam")
    title_run.font.size = Pt(24)
    title_run.font.bold = True
    title_run.font.color.rgb = RGBColor(44, 62, 80)  # Dark blue-gray

    # Add subtitle
    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
    subtitle_run = subtitle.add_run("About Us Discovery Questionnaire")
    subtitle_run.font.size = Pt(18)
    subtitle_run.font.color.rgb = RGBColor(52, 73, 94)

    # Add spacing
    doc.add_paragraph()
    doc.add_paragraph()

    # Add purpose section
    purpose_heading = doc.add_paragraph()
    purpose_heading_run = purpose_heading.add_run("Purpose")
    purpose_heading_run.font.size = Pt(12)
    purpose_heading_run.font.bold = True

    purpose_text = doc.add_paragraph(
        "This questionnaire is designed to gather comprehensive information about Vaidya Vrindavanam's "
        "mission, philosophy, team, facility, treatments, and patient outcomes. Your detailed responses "
        "will be used to create a compelling About Us page that resonates with both local patients and "
        "international wellness travelers."
    )
    purpose_text.paragraph_format.line_spacing = 1.5

    # Add how to use section
    doc.add_paragraph()
    how_heading = doc.add_paragraph()
    how_heading_run = how_heading.add_run("How to Use This Questionnaire")
    how_heading_run.font.size = Pt(12)
    how_heading_run.font.bold = True

    how_text = doc.add_paragraph(
        "1. You can complete this questionnaire at your own pace — tackle one section at a time if needed.\n"
        "2. Answer each question as fully and honestly as possible.\n"
        "3. Questions marked with [*] are open-ended narrative prompts where we'd love to hear your story.\n"
        "4. Don't worry about perfect grammar — we'll polish the copy once we have your information.\n"
        "5. If you run out of space in any section, continue on the overflow pages at the end (labeled 'Overflow')."
    )
    how_text.paragraph_format.line_spacing = 1.5

    # Add time estimate
    doc.add_paragraph()
    time_para = doc.add_paragraph()
    time_run = time_para.add_run("Estimated Completion Time: ")
    time_run.font.bold = True
    time_para.add_run("2-3 hours (flexible — can be done over multiple sessions)")
    time_para.paragraph_format.line_spacing = 1.5

    # Add page break
    doc.add_page_break()

# Initialize document with default settings
doc = Document()

# Call title page function
add_title_page(doc)

# Set default font
style = doc.styles['Normal']
style.font.name = 'Calibri'
style.font.size = Pt(11)
style.font.color.rgb = RGBColor(0, 0, 0)

# Set margins (1 inch all around)
sections = doc.sections
for section in sections:
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)

print("Document initialized successfully")
