import re

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


@app.route('/search_new')
def search_new():
    # 検索キーワード
    item_name = request.args.get('item_name')
    if item_name is None:
        return jsonify({'status': 'NG', 'body': []})

    # HTTPリクエスト・スクレイピングを実施
    url = 'https://www.e-earphone.jp/shop/shopbrand.html'
    result = []
    page_index = 1
    while True:
        parameter = {
            'page': page_index,
            'search': item_name,
            'sort': 'order',
            'money1': '',
            'money2': '',
            'prize1': item_name,
            'company1': '',
            'content1': '',
            'originalcode1': '',
            'category': 'ct3264',
            'subcategory': ''
        }
        tree = DomObject.from_string(http_client.get_html(url, parameter))
        temp = tree.select_all('ul.M_innerList > li')
        if len(temp) == 0:
            break
        for record in temp:
            name = record.select_all('p.M_cl_name')[0].text_content()
            price = record.select_all('span.M_cl_consPrice')[0].text_content()
            result.append({
                'price': int(re.sub('[^0-9]', '', price)),
                'name': name
            })
        page_index += 1

    return jsonify({
        'status': 'OK',
        'body': result
    })


@app.route('/search_used')
def search_used():
    # 検索キーワード
    item_name = request.args.get('item_name')
    if item_name is None:
        return jsonify({'status': 'NG', 'body': []})

    # HTTPリクエスト・スクレイピングを実施
    url = 'https://www.e-earphone.jp/shop/shopbrand.html'
    result = []
    page_index = 1
    while True:
        parameter = {
            'page': page_index,
            'search': item_name,
            'sort': 'order',
            'money1': '',
            'money2': '',
            'prize1': item_name,
            'company1': '',
            'content1': '',
            'originalcode1': '',
            'category': 'ct3265',
            'subcategory': ''
        }
        tree = DomObject.from_string(http_client.get_html(url, parameter))
        temp = tree.select_all('ul.M_innerList > li')
        if len(temp) == 0:
            break
        for record in temp:
            name = record.select_all('p.M_cl_name')[0].text_content()
            price = record.select_all('span.M_cl_consPrice')[0].text_content()
            result.append({
                'price': int(re.sub('[^0-9]', '', price)),
                'name': name
            })
        print(f'{page_index} {len(result)}')
        page_index += 1

    return jsonify({
        'status': 'OK',
        'body': result
    })


if __name__ == '__main__':
    app.run(debug=True, port=SERVER_PORT)
