from lxml import html
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

from constant import DB_NAME, SERVER_PORT
from database import Database

app = Flask(__name__)
CORS(app)

db = Database(DB_NAME)


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

    print(item_name)
    print(item_category)

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
    page = requests.post('https://www.e-earphone.jp/shop/shopbrand.html', data=parameter)
    tree = html.fromstring(page.content)
    for record in tree.cssselect('ul.M_innerList > li'):
        name = record.cssselect('p.M_cl_name')[0].text_content()
        price = record.cssselect('span.M_cl_consPrice')[0].text_content()
        print(f'{price} {name}')

    return jsonify({
        'status': 'OK',
        'body': []
    })


if __name__ == '__main__':
    app.run(debug=True, port=SERVER_PORT)
