import re
from typing import List, Dict

from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_caching import Cache
from flask_cors import CORS

from constant import SERVER_PORT, MAX_PAGE
from scraping import DomObject, HttpClient

app = Flask(__name__)
CORS(app)
http_client = HttpClient()
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search_new')
@cache.cached(timeout=600, query_string=True)
def search_new():
    # 検索キーワード
    item_keyword = request.args.get('item_name')
    print(f'/search_new?item_name={item_keyword}')
    if item_keyword is None:
        return jsonify({'status': 'NG', 'body': []})

    # 「【～～】」という表記を除去するか？
    remove_keyword_flg = request.args.get('remove_keyword') is not None

    # HTTPリクエスト・スクレイピングを実施
    url = 'https://www.e-earphone.jp/product/search/list/'
    result = []
    page_index = 1
    while True:
        # 捲るページ数に制限を設ける
        if page_index > MAX_PAGE:
            break

        # DOMを取得
        parameter = {
            'pageno': page_index,
            'search_type': 1,
            'search_word': item_keyword,
            'orderby': 0
        }
        response_html = http_client.get_html(url, parameter)
        tree = DomObject.from_string(response_html)

        # 検索結果を1件づつ取り出す
        item_list = tree.select_all('div.item-list__contents')
        if len(item_list) == 0:
            # これ以上ヒットしない＝ページめくり終了なのでbreak
            break
        print(f'page_index={page_index} {len(item_list)} items')
        for record in item_list:
            # 必要なDOMが収集できなければ飛ばす
            item_brand_dom = record.select('p.item-list__brand')
            item_name_dom = record.select('p.item-list__name')
            item_url_dom = record.select('a')
            item_price_doms = [x for x in record.select_all('p.item-list__price > span')
                               if '￥' in x.text_content()]
            item_img_dom = record.select('div.item-list__img img')
            if item_brand_dom is None:
                print(f'skip: page_index={page_index}-brand')
                continue
            if item_url_dom is None:
                print(f'skip: page_index={page_index}-url')
                continue
            if item_name_dom is None:
                print(f'skip: page_index={page_index}-name')
                continue
            if len(item_price_doms) == 0:
                print(f'skip: page_index={page_index}-price')
                continue
            if item_img_dom is None:
                print(f'skip: page_index={page_index}-img')
                continue

            # 各要素を収集する
            item_name = item_brand_dom.text_content() + ' ' + item_name_dom.text_content()
            item_price = int(re.sub('[^0-9]', '', item_price_doms[0].text_content()))
            item_url = 'https://www.e-earphone.jp' + item_url_dom.attribute('href', '')
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
@cache.cached(timeout=600, query_string=True)
def search_used():
    # 検索キーワード
    item_keyword = request.args.get('item_name')
    print(f'/search_used?item_name={item_keyword}')
    if item_keyword is None:
        return jsonify({'status': 'NG', 'body': []})

    # 「【～～】」という表記を除去するか？
    remove_keyword_flg = request.args.get('remove_keyword') is not None

    # HTTPリクエスト・スクレイピングを実施
    url = 'https://www.e-earphone.jp/product/search/list/'
    result = []
    page_index = 1
    while True:
        # 捲るページ数に制限を設ける
        if page_index > MAX_PAGE:
            break

        parameter = {
            'pageno': page_index,
            'search_type': 2,
            'search_word': item_keyword,
            'orderby': 0
        }
        response_html = http_client.get_html(url, parameter)
        tree = DomObject.from_string(response_html)

        # 検索結果を1件づつ取り出す
        item_list = tree.select_all('div.item-list__contents')
        if len(item_list) == 0:
            # これ以上ヒットしない＝ページめくり終了なのでbreak
            break
        print(f'page_index={page_index} {len(item_list)} items')
        for record in item_list:
            # 必要なDOMが収集できなければ飛ばす
            item_brand_dom = record.select('p.item-list__brand')
            item_name_dom = record.select('p.item-list__name')
            item_url_dom = record.select('a')
            item_price_doms = [x for x in record.select_all('p.item-list__price > span')
                               if '￥' in x.text_content()]
            item_img_dom = record.select('div.item-list__img img')
            if item_brand_dom is None:
                print(f'skip: page_index={page_index}-brand')
                continue
            if item_url_dom is None:
                print(f'skip: page_index={page_index}-url')
                continue
            if item_name_dom is None:
                print(f'skip: page_index={page_index}-name')
                continue
            if len(item_price_doms) == 0:
                print(f'skip: page_index={page_index}-price')
                continue
            if item_img_dom is None:
                print(f'skip: page_index={page_index}-img')
                continue

            # 各要素を収集する
            item_name = item_brand_dom.text_content() + ' ' + item_name_dom.text_content()
            item_price = int(re.sub('[^0-9]', '', item_price_doms[0].text_content()))
            item_url = 'https://www.e-earphone.jp' + item_url_dom.attribute('href', '')
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
                'image_url': image_url,
            })

        # ページめくりの準備
        page_index += 1

    return jsonify(result)


@app.route('/get_stock_data')
@cache.cached(timeout=3600, query_string=True)
def get_stock_data():
    # アイテムのURL
    item_url = request.args.get('item_url')
    print(f'/get_stock_data?item_url={item_url}')
    if item_url is None:
        return jsonify({'result': 'ng'}), 400

    # HTTPリクエスト・スクレイピングを実施
    response_html = http_client.get_html(item_url)
    tree = DomObject.from_string(response_html)
    div_element = tree.select('div.detail-shop-stock')
    stock_memo: List[Dict[str, str]] = []
    sample_memo: List[str] = []
    for dl_element in div_element.select_all('dl.detail-shop-stock__list'):
        shop_name = dl_element.select('dt').text_content().replace('\n', '').replace(' ', '')
        temp = dl_element.select('dd').text_content().split('/')
        stock_data = temp[0].replace('\n', '').replace(' ', '')
        sample_data = temp[1].replace('\n', '').replace(' ', '')
        if '×在庫なし' not in stock_data:
            stock_memo.append({'name': shop_name, 'info': stock_data})
        if '試聴機なし' not in sample_data:
            sample_memo.append(shop_name)
    return jsonify({'stock': stock_memo, 'sample': sample_memo})


@app.route('/get_used_data')
@cache.cached(timeout=3600, query_string=True)
def get_used_data():
    # アイテムのURL
    item_url = request.args.get('item_url')
    print(f'/get_used_data?item_url={item_url}')
    if item_url is None:
        return jsonify({'result': 'ng'}), 400

    # HTTPリクエスト・スクレイピングを実施
    response_html = http_client.get_html(item_url)
    tree = DomObject.from_string(response_html)
    used_item_info = {
        'shop_name': '不明',
        'rank': '不明',
        'fancy_box_flg': False,
        'item_status': '不明',
        'accessories': '不明',
        'stockout': '不明',
        'compensation': '不明'
    }

    # 店名
    div_element = tree.select('div.detail-shop-stock')
    if div_element is not None:
        for dl_element in div_element.select_all('dl.detail-shop-stock__list'):
            dt_element = dl_element.select('dt')
            dd_element = dl_element.select('dd')
            if dt_element is not None and dd_element is not None and '×在庫なし' not in dd_element.text_content():
                    used_item_info['shop_name'] = dt_element.text_content().replace('\n', '').replace(' ', '')
                    break

    # ランク
    span_element = tree.select('p.detail-item-used-state__rank.active > span')
    if span_element is not None:
        used_item_info['rank'] = span_element.text_content().replace('：', '')

    # 外箱
    dd_element = tree.select('dd.detail-item-used-state__main.sp')
    if dd_element is not None:
        used_item_info['fancy_box_flg'] = '有' in dd_element.text_content()

    # 商品状態・付属内容・欠品内容
    dd_element = tree.select('dd.detail-item-used-state__main.sp-w100')
    if dd_element is not None:
        p_elements = dd_element.select_all('p.detail-item-used-state__contents__inner')
        if len(p_elements) >= 3:
            used_item_info['item_status'] = p_elements[0].text_content().replace('\n', '').replace(' ', '')
            used_item_info['accessories'] = p_elements[1].text_content().replace('\n', '').replace(' ', '')
            used_item_info['stockout'] = p_elements[2].text_content().replace('\n', '').replace(' ', '')

    # 補償
    span_element = tree.select('span.compensation-text')
    if span_element is not None:
        used_item_info['compensation'] = span_element.text_content()
    return jsonify(used_item_info)


@app.route("/<static_file>")
def manifest(static_file: str):
    return send_from_directory('./root', static_file)


if __name__ == '__main__':
    app.run(debug=True, port=SERVER_PORT)
