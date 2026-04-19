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

def add_section_header(doc, section_num, section_title):
    """Add a formatted section header"""
    header = doc.add_paragraph()
    header.paragraph_format.space_before = Pt(12)
    header.paragraph_format.space_after = Pt(6)
    header_run = header.add_run(f"Section {section_num}: {section_title}")
    header_run.font.size = Pt(14)
    header_run.font.bold = True
    header_run.font.color.rgb = RGBColor(44, 62, 80)

def add_question_number(doc, question_num, question_text):
    """Add a numbered question with consistent formatting"""
    q = doc.add_paragraph(style='List Number')
    q.paragraph_format.space_before = Pt(6)
    q.paragraph_format.space_after = Pt(3)
    q_run = q.add_run(question_text)
    q_run.font.size = Pt(11)

def add_structured_response_space(doc, placeholder_text, height_lines=2):
    """Add space for structured responses (short answers, checkboxes)"""
    response = doc.add_paragraph(placeholder_text)
    response.paragraph_format.left_indent = Inches(0.5)
    response.paragraph_format.space_after = Pt(12)
    response_run = response.runs[0]
    response_run.font.italic = True
    response_run.font.color.rgb = RGBColor(149, 165, 166)  # Light gray placeholder
    response_run.font.size = Pt(10)

def add_narrative_prompt(doc, prompt_text):
    """Add space for open-ended narrative response"""
    doc.add_paragraph()
    prompt = doc.add_paragraph()
    prompt_run = prompt.add_run(f"[*] Narrative Prompt: {prompt_text}")
    prompt_run.font.italic = True
    prompt_run.font.bold = True
    prompt_run.font.color.rgb = RGBColor(41, 128, 185)  # Blue for emphasis

    # Add expandable text box instruction
    instruction = doc.add_paragraph("(Please provide a 200-400 word response in the space below)")
    instruction_run = instruction.runs[0]
    instruction_run.font.italic = True
    instruction_run.font.size = Pt(9)
    instruction_run.font.color.rgb = RGBColor(127, 140, 141)

    # Add space for response (gray shaded box simulation)
    response_box = doc.add_paragraph()
    response_box.paragraph_format.left_indent = Inches(0.5)
    for i in range(6):  # 6 lines for text box
        doc.add_paragraph()
    response_box.paragraph_format.space_after = Pt(12)

def add_section_1_origins_mission(doc):
    """Section 1: Origins & Mission"""
    add_section_header(doc, 1, "Origins & Mission")

    doc.add_paragraph(
        "Capture the founding story, 'why we exist,' and current vision for the clinic."
    ).runs[0].font.italic = True

    # Q1
    add_question_number(doc, 1, "How was Vaidya Vrindavanam founded?")
    add_structured_response_space(doc, "Who founded it? When (year)? What inspired the founder/leadership to open this clinic?")

    # Q2
    add_question_number(doc, 2, "How long have you been operating?")
    add_structured_response_space(doc, "Years in operation: _____", height_lines=1)

    # Q3
    add_question_number(doc, 3, "What is your mission statement or core purpose?")
    add_structured_response_space(doc, "(Or: 'What problem do you solve for patients?') — 1-2 sentence mission statement")

    # Q4
    add_question_number(doc, 4, "What are your long-term goals for the clinic?")
    add_structured_response_space(doc, "3-5 bullet points or paragraph format")

    # Narrative Prompt
    add_narrative_prompt(
        doc,
        "Tell us the story of your clinic in 3-4 sentences — what makes it special to you and your patients?"
    )

    doc.add_page_break()

# Initialize document with default settings
doc = Document()

# Call title page function
add_title_page(doc)

# Call section 1 function
add_section_1_origins_mission(doc)

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
