import csv
from datetime import datetime
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup

from .urls import is_external, is_http


def crawl_site(start_url, max_links=50, csv_filename='discovered_links.csv'):
    visited = set()
    external_links = {}

    with open(csv_filename, mode='w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(['URL', 'Type', 'Timestamp'])

        def crawl(url):
            if len(visited) >= max_links:
                return
            visited.add(url)
            timestamp = datetime.now().isoformat()
            csv_writer.writerow([url, 'internal', timestamp])
            print(f"Crawling: {url}")
            try:
                response = requests.get(url, timeout=5)
                soup = BeautifulSoup(response.text, 'html.parser')
            except requests.exceptions.RequestException as e:
                print(f"Failed to crawl {url}: {e}")
                return

            for link in soup.find_all('a', href=True):
                href = urljoin(url, link.get('href'))

                if not is_http(href):
                    continue

                if is_external(href, start_url):
                    if href not in external_links:
                        external_links[href] = []
                    external_links[href].append(url)
                    csv_writer.writerow([href, 'external', timestamp])
                elif href not in visited:
                    crawl(href)

        crawl(start_url)

    return external_links
