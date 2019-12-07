import re

from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS

from constant import SERVER_PORT, MAX_PAGE
from scraping import DomObject, HttpClient

app = Flask(__name__)
CORS(app)
http_client = HttpClient()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search_new')
def search_new():
    # 検索キーワード
    item_keyword = request.args.get('item_name')
    if item_keyword is None:
        return jsonify({'status': 'NG', 'body': []})

    # 「【～～】」という表記を除去するか？
    remove_keyword_flg = request.args.get('remove_keyword') is not None

    # HTTPリクエスト・スクレイピングを実施
    url = 'https://www.e-earphone.jp/shop/shopbrand.html'
    result = []
    page_index = 1
    while True:
        # 捲るページ数に制限を設ける
        if page_index > MAX_PAGE:
            break

        # DOMを取得
        parameter = {
            'page': page_index,
            'search': item_keyword,
            'sort': 'order',
            'money1': '',
            'money2': '',
            'prize1': item_keyword,
            'company1': '',
            'content1': '',
            'originalcode1': '',
            'category': 'ct3264',
            'subcategory': ''
        }
        response_html = http_client.get_html(url, parameter)
        tree = DomObject.from_string(response_html)

        # 検索結果を1件づつ取り出す
        item_list = tree.select_all('ul.M_innerList > li')
        if len(item_list) == 0:
            # これ以上ヒットしない＝ページめくり終了なのでbreak
            break
        print(f'page_index={page_index} {len(item_list)} items')
        for record in item_list:
            # 必要なDOMが収集できなければ飛ばす
            item_name_dom = record.select('p.M_cl_name > a')
            item_price_dom = record.select('p.M_cl_price > span')
            item_img_dom = record.select('div.M_cl_imgWrap > a > img')
            if item_name_dom is None:
                print(f'skip: page_index={page_index}-name')
                continue
            if item_price_dom is None:
                print(f'skip: page_index={page_index}-price')
                continue
            if item_img_dom is None:
                print(f'skip: page_index={page_index}-img')
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

    return jsonify(result)


@app.route('/search_used')
def search_used():
    # 検索キーワード
    item_keyword = request.args.get('item_name')
    if item_keyword is None:
        return jsonify({'status': 'NG', 'body': []})

    # 「【～～】」という表記を除去するか？
    remove_keyword_flg = request.args.get('remove_keyword') is not None

    # HTTPリクエスト・スクレイピングを実施
    url = 'https://www.e-earphone.jp/shop/shopbrand.html'
    result = []
    page_index = 1
    while True:
        # 捲るページ数に制限を設ける
        if page_index > MAX_PAGE:
            break

        parameter = {
            'page': page_index,
            'search': item_keyword,
            'sort': 'order',
            'money1': '',
            'money2': '',
            'prize1': item_keyword,
            'company1': '',
            'content1': '',
            'originalcode1': '',
            'category': 'ct3265',
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
            if item_name_dom is None:
                print(f'skip: page_index={page_index}-name')
                continue
            if item_price_dom is None:
                print(f'skip: page_index={page_index}-price')
                continue
            if item_img_dom is None:
                print(f'skip: page_index={page_index}-img')
                continue

            # 各要素を収集する
            item_name = item_name_dom.text_content()
            item_price = int(re.sub('[^0-9]', '', item_price_dom.text_content()))
            item_url = 'https://www.e-earphone.jp' + item_name_dom.attribute('href', '')
            image_url = 'https://www.e-earphone.jp' + item_img_dom.attribute('src', '')

            # フィルタ
            item_name = item_name.replace('【中古】', '')
            m = re.match('^.+【([^/]+)/([^/]+)】$', item_name)
            shop_name = m.group(1)
            shop_item_id = m.group(2)
            if remove_keyword_flg:
                item_name = re.sub('【.+?】', '', item_name)
            item_name = re.sub('^ +', '', item_name)
            item_name = re.sub(' +$', '', item_name)

            # 一覧に追加する
            result.append({
                'price': item_price,
                'name': item_name,
                'item_url': item_url,
                'image_url': image_url,
                'shop_name': shop_name,
                'shop_item_id': shop_item_id
            })

        # ページめくりの準備
        page_index += 1

    return jsonify(result)


@app.route("/<static_file>")
def manifest(static_file: str):
    return send_from_directory('./root', static_file)


if __name__ == '__main__':
    app.run(debug=True, port=SERVER_PORT)
