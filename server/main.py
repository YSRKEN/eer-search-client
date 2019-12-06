import re

import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

from constant import SERVER_PORT
from scraping import DomObject, HttpClient

app = Flask(__name__)
CORS(app)
http_client = HttpClient()


@app.route('/')
def hello():
    return 'Hello World!'


@app.route('/search')
def search():
    # 検索キーワード
    item_name = request.args.get('item_name')
    if item_name is None:
        return jsonify({'status': 'NG', 'body': []})

    # 検索カテゴリー(new、またはused)
    item_category = request.args.get('item_category')
    if item_category is None:
        return jsonify({'status': 'NG', 'body': []})

    # HTTPリクエスト・スクレイピングを実施
    url = 'https://www.e-earphone.jp/shop/shopbrand.html'
    parameter = {
        'search_page': 1,
        'search': '',
        'category': 'ct3264' if item_category == 'new' else 'ct3265',
        'company1': '',
        'prize1': item_name,
        'content1': '',
        'money1': '',
        'money2': '',
        'originalcode1': ''
    }
    tree = DomObject.from_string(http_client.post_html(url, parameter))
    result = []
    for record in tree.select_all('ul.M_innerList > li'):
        name = record.select_all('p.M_cl_name')[0].text_content()
        price = record.select_all('span.M_cl_consPrice')[0].text_content()
        result.append({
            'price': int(re.sub('[^0-9]', '', price)),
            'name': name
        })

    return jsonify({
        'status': 'OK',
        'body': result
    })


if __name__ == '__main__':
    app.run(debug=True, port=SERVER_PORT)
