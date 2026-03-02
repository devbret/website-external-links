# Mapping A Website's External Links

![Preview Of Resulting Visualization](https://hosting.photobucket.com/bbcfb0d4-be20-44a0-94dc-65bff8947cf2/e5e2ac60-d42b-49b5-aa69-caddcf013f7b.png)

A lightweight web crawler and interactive network visualizer which maps the relationship between a website’s internal pages and the external links they reference.

## Overview

The Python script recursively crawls a starting URL, records internal pages, collects external links along with their referring internal pages, logs discoveries to a CSV file with timestamps and exports a JSON file. The JavaScript frontend then loads this JSON file and renders a network graph in which internal and external URLs are represented as color-coded nodes connected by links. With zooming, dragging, highlighting and click-to-open behavior, allowing users to visually explore how a site connects outward to external domains.

## Set Up Instructions

Below are the set up steps and prerequisite software programs needed for this application.

### Programs Needed

- [Git](https://git-scm.com/downloads)

- [Python](https://www.python.org/downloads/)

### Steps

1. Install the above programs

2. Open a terminal

3. Clone this repository using git by running the following command: `git clone git@github.com:devbret/website-external-links.git`

4. Navigate to the repo's directory by running: `cd website-external-links`

5. Install the needed dependencies for running the script by running: `pip install -r requirements.txt`

6. Edit the app.py file on line 51 to include the website you would like to visualize

7. You can also change the maximum number of URLs that this program will visit at a given domain by editing the `max_links` value on line 11 in the app.py file, which is set to 50 by default

8. Run the script with the command: `python3 app.py`

9. To view the website's connections in the index.html file you will need to run a local web server with: `python3 -m http.server`
