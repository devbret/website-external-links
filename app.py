import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import json
import re

def is_external(url, base):
    return urlparse(url).netloc != urlparse(base).netloc

def crawl_site(start_url, max_links=100):
    visited = set()
    external_links = {}

    def crawl(url):
        if len(visited) >= max_links:
            return
        if url in visited:
            return
        visited.add(url)
        print(f"Crawling: {url}")

        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.text, 'html.parser')

            for link in soup.find_all('a', href=True):
                href = link.get('href')
                full_url = urljoin(url, href)
                if is_external(full_url, start_url):
                    if full_url not in external_links:
                        external_links[full_url] = []
                    external_links[full_url].append(url)

        except requests.exceptions.RequestException as e:
            print(f"Failed to crawl {url}: {e}")

        for link in soup.find_all('a', href=True):
            full_url = urljoin(url, link.get('href'))
            if not is_external(full_url, start_url) and full_url not in visited:
                crawl(full_url)

    crawl(start_url)
    return external_links

def save_links_as_json(external_links, filename='external_links.json'):
    with open(filename, 'w') as file:
        json.dump(external_links, file, indent=2)

external_links = crawl_site('https://www.example.com/')
save_links_as_json(external_links)
