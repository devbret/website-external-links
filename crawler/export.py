import json


def save_links_as_json(external_links, filename='external_links.json'):
    with open(filename, 'w') as file:
        json.dump(external_links, file, indent=2)
