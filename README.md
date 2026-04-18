# Mapping A Website's External Links

![Preview Of Resulting Visualization](https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/e5e2ac60-d42b-49b5-aa69-caddcf013f7b.png)

A lightweight web crawler and interactive network visualizer which maps the relationship between a website’s internal pages and the external links they reference.

## Overview

The Python script recursively crawls a starting URL, records internal pages, collects external links along with their referring internal pages, logs discoveries to a CSV file with timestamps and exports a JSON file. The JavaScript frontend then loads this JSON file and renders a network graph in which internal and external URLs are represented as color-coded nodes connected by links. With zooming, dragging, highlighting and click-to-open behavior, allowing users to visually explore how a site connects outward to external domains.

## Set Up Instructions

Below are the set up steps and prerequisite software programs needed for this application to run on a Linux machine.

### Programs Needed

- [Git](https://git-scm.com/downloads)

- [Python](https://www.python.org/downloads/)

### Steps

1. Install the above programs

2. Open a terminal

3. Clone this repository using `git` by running the following command: `git clone git@github.com:devbret/website-external-links.git`

4. Navigate to the repo's directory: `cd website-external-links`

5. Create a virtual environment: `python3 -m venv venv`

6. Activate your virtual environment: `source venv/bin/activate`

7. Install the needed dependencies for running the script: `pip install -r requirements.txt`

8. Edit the `app.py` file on line 51 to include the website you would like to visualize
   - You can also change the maximum number of URLs visited by editing the `max_links` value on line 11 in the `app.py` file

9. Run the script: `python3 app.py`

10. To view the scanned website's connections, you will need to run a local web server: `python3 -m http.server`

11. Exit the virtual environment when finished: `deactivate`

## Other Considerations

This project repo is intended to demonstrate an ability to do the following:

- Crawl a website recursively to map internal pages and extract all external links

- Transform discovered link relationships into structured JSON data and visualize them as an interactive D3.js network graph

- Enable exploration of link connectivity to inspect relationships between internal and external URLs

If you have any questions or would like to collaborate, please reach out either on GitHub or via [my website](https://bretbernhoft.com/).
