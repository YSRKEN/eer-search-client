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

    # 「【～～】」という表記を除去するか？
    remove_keyword_flg = request.args.get('remove_keyword') is not None

    # HTTPリクエスト・スクレイピングを実施
    url = 'https://www.e-earphone.jp/shop/shopbrand.html'
    result = []
    page_index = 1
    while True:
        # DOMを取得
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

        # 検索結果を1件づつ取り出す
        item_list = tree.select_all('ul.M_innerList > li')
        if len(item_list) == 0:
            # これ以上ヒットしない＝ページめくり終了なのでbreak
            break
        for record in item_list:
            # 必要なDOMが収集できなければ飛ばす
            item_name_dom = record.select('p.M_cl_name > a')
            item_price_dom = record.select('p.M_cl_price > span')
            item_img_dom = record.select('div.M_cl_imgWrap > a > img')
            if item_name_dom is None or item_price_dom is None or item_img_dom is None:
                print(f'skip: page_index={page_index}')
                continue

            # 各要素を収集する
            item_name = item_name_dom.text_content()
            item_price = int(re.sub('[^0-9]', '', item_price_dom.text_content()))
            item_url = 'https://www.e-earphone.jp' + item_name_dom.attribute('href', '')
            image_url = 'https://www.e-earphone.jp' + item_img_dom.attribute('src', '')

            # フィルタ
            if remove_keyword_flg:
                item_name = re.sub('【.+?】', '', item_name)
            item_name = re.sub('^ +', '', item_name)
            item_name = re.sub(' +$', '', item_name)

            # 一覧に追加する
            result.append({
                'price': item_price,
                'name': item_name,
                'item_url': item_url,
                'image_url': image_url
            })

        # ページめくりの準備
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
        page_index += 1

    return jsonify({
        'status': 'OK',
        'body': result
    })


if __name__ == '__main__':
    app.run(debug=True, port=SERVER_PORT)
