import time
from typing import List, Dict

import requests
from lxml import html

from constant import WAIT_TIME


class DomObject:
    dom: html.HtmlElement

    @staticmethod
    def from_string(page_data: str):
        dom = DomObject()
        dom.dom = html.fromstring(page_data)
        return dom

    @staticmethod
    def from_html_element(html_element: html.HtmlElement):
        dom = DomObject()
        dom.dom = html_element
        return dom

    def select_all(self, css_query: str) -> List['DomObject']:  # PEP484
        return [DomObject.from_html_element(x) for x in self.dom.cssselect(css_query)]

    def text_content(self) -> str:
        return self.dom.text_content()


class HttpClient:
    def __init__(self):
        self.last_request = time.time()

    def post_html(self, url: str, parameter: Dict[str, any]) -> str:
        wait_time = self.last_request + WAIT_TIME - time.time()
        if wait_time > 0.0:
            time.sleep(wait_time)
        self.last_request = time.time()

        # ヘッダーを設定
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                          ' Chrome/62.0.3202.94 Safari/537.36',
            'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
        }

        # ページを取得
        page = requests.post(url=url, data=parameter, headers=headers)
        return page.content

    def get_html(self, url: str, parameter: Dict[str, any] = None) -> str:
        wait_time = self.last_request + WAIT_TIME - time.time()
        if wait_time > 0.0:
            time.sleep(wait_time)
        self.last_request = time.time()

        # ヘッダーを設定
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
                          ' Chrome/62.0.3202.94 Safari/537.36',
            'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8'
        }

        # ページを取得
        if parameter is not None:
            url += '?' + '&'.join([f'{key}={val}' for key, val in parameter.items()])
        page = requests.get(url=url, headers=headers)
        return page.content
