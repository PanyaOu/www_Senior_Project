import os
import requests
from bs4 import BeautifulSoup

# Function to download a file
def download_file(url, path):
    response = requests.get(url)
    with open(path, 'wb') as output_file:
        output_file.write(response.content)

# Function to parse the HTML and download JavaScript files
def download_js_files(html_file_path, download_dir):
    with open(html_file_path, 'r') as file:
        soup = BeautifulSoup(file.read(), 'html.parser')
        script_tags = soup.find_all('script')

        if not os.path.exists(download_dir):
            os.makedirs(download_dir)

        for tag in script_tags:
            src = tag.get('src')
            if src and 'http' in src:
                file_name = os.path.join(download_dir, os.path.basename(src))
                download_file(src, file_name)


# Using the functions
html_file_path = 'index.html'
download_dir = 'js'

download_js_files(html_file_path, download_dir)

