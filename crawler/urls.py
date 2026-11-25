from urllib.parse import urlparse


def is_http(url):
    return urlparse(url).scheme in ('http', 'https')


def is_external(url, base):
    return urlparse(url).netloc != urlparse(base).netloc
