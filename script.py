import sys
import os

def prompt_for_info(input_lines):
    sections = []
    links = []
    process_links_next = False  # new variable to flag when the next line should be processed as links

    for line in input_lines:
        line = line.strip()  # removing leading and trailing whitespaces
        if process_links_next:  # if the flag is True, process the line as links
            links = line.split(",")
            process_links_next = False  # reset the flag
            continue  # skip to the next line
        if "Do you want" in line:
            response = line.split(":")[1].strip().lower()
            if response == "yes":
                section = line.split(" ")[4].strip("?")
                if section == "other":
                    section = "other-page"
                elif section == "contact":
                    section = "contact-me"
                sections.append(section)
        if "Please enter any additional links" in line:
            process_links_next = True  # set the flag to True because the links will be on the next line

    return sections, links


def classify_links(links):
    google_doc_links = []
    google_spread_links = []
    for link in links:
        if "docs.google.com/document" in link:
            google_doc_links.append(link)
        elif "docs.google.com/spreadsheets" in link:
            google_spread_links.append(link)
    return google_doc_links, google_spread_links

def write_meta(file, google_docs, google_spreadsheets):
    file.write("<!DOCTYPE html>\n")
    file.write("<html lang='en'>\n")
    file.write("<head>\n")
    file.write("<meta charset='UTF-8'>\n")
    file.write("<meta http-equiv='X-UA-Compatible' content='IE=edge'>\n")
    file.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n")
    file.write("<title>Senior Project</title>\n")
    file.write("<script src='https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js' onerror=\"this.onerror=null;this.src='assets/js/gsap.min.js';\"></script>\n")
    file.write("<script src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js' onerror=\"this.onerror=null;this.src='assets/js/three.min.js';\"></script>\n")
    file.write("<script src='assets/js/app.js'></script>\n")
    file.write("<script src='assets/js/project.js'></script>\n")
    file.write("<script src='assets/js/title.js'></script>\n")
    file.write("<script src='assets/js/introduction.js' type='module'></script>\n")
    file.write("<script src='assets/js/carousel.js'></script>\n")
    file.write("<link rel='stylesheet' href='assets/css/styles.css'>\n")
    file.write("<link rel='stylesheet' href='assets/css/introduction.css'>\n")
    file.write("<link rel='stylesheet' href='assets/css/project.css'>\n")
    file.write("<link rel='stylesheet' href='assets/css/title.css'>\n")
    file.write("<link rel='stylesheet' href='assets/css/contactme.css'>\n")
    file.write("<link rel='stylesheet' href='assets/css/other.css'>\n")
    file.write("<link rel='preconnect' href='https://fonts.googleapis.com'>\n")
    file.write("<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>\n")
    file.write("<link href='https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@300&display=swap' rel='stylesheet'>\n")
    file.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css' />\n")
    file.write("</head>\n")

    # Ensure there is at least one link for each type, otherwise insert a placeholder
    doc_link = google_docs[0] if google_docs else 'N/A'
    spread_link = google_spreadsheets[0] if google_spreadsheets else 'N/A'
    
    file.write(f"<body data-introduction-doc-url='{doc_link}' data-introduction-sheets-url='{spread_link}'>\n")



def write_links(file, links):
    file.write("<div>\n")
    for link in links:
        file.write(f'<a href="{link}">{link}</a>\n')
    file.write("</div>\n")

def write_section(file, section):
    file.write(f"<!-- {section} start -->\n")
    file.write(f"<div class='{section}' id='{section}'>\n")
    file.write(f"<section>\n")
    if section == "contact-me":
        file.write("<div class='contact-me container'>\n")
        file.write("<h1>Contact Me</h1>\n")
        file.write("<form id='contact-form' action='submit_form.php' method='POST'>\n")
        file.write("<div class='form-group'>\n")
        file.write("<label for='name'>Name:</label>\n")
        file.write("<input type='text' id='name' name='name' required>\n")
        file.write("</div>\n")
        file.write("<div class='form-group'>\n")
        file.write("<label for='email'>Email:</label>\n")
        file.write("<input type='email' id='email' name='email' required>\n")
        file.write("</div>\n")
        file.write("<div class='form-group'>\n")
        file.write("<label for='subject'>Subject:</label>\n")
        file.write("<input type='text' id='subject' name='subject' required>\n")
        file.write("</div>\n")
        file.write("<div class='form-group'>\n")
        file.write("<label for='message'>Message:</label>\n")
        file.write("<textarea id='message' name='message' required></textarea>\n")
        file.write("</div>\n")
        file.write("<button type='submit'>Submit</button>\n")
        file.write("</form>\n")
        file.write("</div>\n")
    elif section == "introduction":
        file.write("<h1>Introduction</h1>\n")
        file.write("<div class='introduction subcontainer'>\n")
        file.write("<h2 class ='name'>YourName</h2>\n")  # Replace 'YourName' as needed
        file.write("<ul class='links' id='links-container'></ul>\n") 
        file.write("<div class='image-container' id='google-doc-images'></div>\n")
        file.write("<div class='aboutme subcontainer' id='google-doc-content'></div>\n")
        file.write("</div>\n")  # close 'introduction subcontainer'
    else:
        file.write(f"<h1>{section}</h1>\n")
        file.write(f"<div class='{section} subcontainer'>\n")
        file.write(f"Content for {section}\n")
        file.write(f"</div>\n")
    file.write(f"</section>\n")
    file.write(f"</div>\n")
    file.write(f"<!-- {section} end -->\n\n")


def write_end(file):
    file.write("</body>\n")
    file.write("</html>")

def create_html(input_lines):
    sections, links = prompt_for_info(input_lines)
    google_docs, google_spreadsheets = classify_links(links)
    print("Google Doc Links: ", google_docs)
    print("Google Spreadsheet Links: ", google_spreadsheets)
    filename = 'my_index.html'
    try:
        with open(filename, 'x') as file:
            write_meta(file, google_docs, google_spreadsheets)
            for section in sections:
                write_section(file, section)
            write_end(file)

        print("New HTML file created successfully!")
    except FileExistsError:
        ...
        with open(filename, 'w') as file:
            write_meta(file, google_docs, google_spreadsheets)
            for section in sections:
                write_section(file, section)
            write_end(file)

        print("HTML file modified successfully!")


if __name__ == "__main__":
    input_file = "input.txt"  # Specify the name of the input file
    script_directory = os.path.dirname(os.path.abspath(__file__))
    input_file_path = os.path.join(script_directory, input_file)

    with open(input_file_path, "r") as file:
        input_lines = file.readlines()
    create_html(input_lines)


