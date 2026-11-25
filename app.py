from crawler import crawl_site, save_links_as_json

START_URL = 'https://www.example.com/'


def main():
    external_links = crawl_site(START_URL)
    save_links_as_json(external_links)


if __name__ == '__main__':
    main()
