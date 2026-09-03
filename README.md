# Mapping A Website's External Links

![Preview Of Resulting Visualization](https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/e5e2ac60-d42b-49b5-aa69-caddcf013f7b.png)

Lightweight web crawler and interactive network visualizer which maps the relationship between a website’s internal pages and the external links they reference.

## Application Overview

Operates as a two-part system designed to map and visualize the external link architecture of a website. The backend is a Python web crawler which navigates through a starting URL, identifying internal pages and extracting every external link referenced therein. To maintain efficiency, it limits the total number of crawled pages and generates two outputs to map the exact relationships between the internal source pages and their external destinations.

The frontend utilizes this data to generate an interactive, network graph using the D3.js library. This UI allows users to explore the site's connectivity by representing URLs as color-coded nodes. Users can interact with the graph by dragging nodes and clicking on individual nodes to open the corresponding web pages in their browser.

## Basic Setup Instructions

Below are the set up steps and prerequisite software programs needed for this application to run on a Linux machine.

### Programs Needed

- [Git](https://git-scm.com/downloads)

- [Python](https://www.python.org/downloads/)

### Steps

1. Install the above programs

2. Open a terminal

3. Clone this repository: `git clone git@github.com:devbret/website-external-links.git`

4. Navigate to the repo's directory: `cd website-external-links`

5. Create a virtual environment: `python3 -m venv venv`

6. Activate your virtual environment: `source venv/bin/activate`

7. Install the needed dependencies: `pip install -r requirements.txt`

8. Edit the `app.py` file on line 63 to include target website

9. Run the script: `python3 app.py`

10. Start an HTTP server: `python3 -m http.server`

11. Visit the application in your browser: `http://localhost:8000`

12. When finished, stop the HTTP server: `Ctrl + C`

13. Exit the virtual environment: `deactivate`

## Other Considerations

Below you will find information not covered in the installation and use sections above. Including the abilities this repo is intended to demonstrate. As well as an overview of the license this code is made available with. And a way to contact the maintainer with questions, suggestions and collaboration opportunities.

### Abilities Demonstrated

This project repo is intended to demonstrate an ability to do the following:

- Crawl a specified website to identify internal pages and map out all the external links referenced within them

- Log the crawl data into a CSV file with timestamps and export a structured JSON file mapping external URLs to their internal source pages

- Generate an interactive, network graph where nodes represent URLs color-coded as either internal or external

- Enable users to explore the site's link architecture by zooming, dragging nodes and clicking nodes to open the actual web pages

### License Information

This repository is distributed under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense and sell copies of this software, including as part of proprietary or commercial work. The single condition is the copyright and permission notices contained in the LICENSE file must be included with any copy or substantial portion of the software that you redistribute. The software is provided "as is", without warranty of any kind, and the copyright holder is not liable for any claim or damages arising from its use.

If you have any questions or would like to collaborate, please reach out either on GitHub or via [my website](https://bretbernhoft.com/).
