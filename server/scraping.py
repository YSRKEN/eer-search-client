from typing import List, Dict

import requests
from lxml import html


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
    @staticmethod
    def post_html(url: str, parameter: Dict[str, any]) -> str:
        page = requests.post(url=url, data=parameter)
        return page.content
