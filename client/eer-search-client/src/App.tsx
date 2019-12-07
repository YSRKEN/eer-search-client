import React, { useState, FormEvent } from 'react';

const SERVER_URL = 'http://localhost:5000';

interface NewItem {
  price: number;
  name: string;
  item_url: string;
  image_url: string;
}

interface UsedItem {
  price: number;
  name: string;
  item_url: string;
  image_url: string;
  shop_name: string;
  shop_item_id: string;
}

const App: React.FC = () => {
  const [searchWord, setSearchWord] = useState('');

  const onChangeSearchWord = (e: FormEvent<HTMLInputElement>) => {
    setSearchWord(e.currentTarget.value);
  };

  const isDisabledSearchButton = () => searchWord === '';

  const onClickNewSearch = () => {
    fetch(`${SERVER_URL}/search_new?item_name=${searchWord}&remove_keyword`).then(res => res.json()).then((body: NewItem[]) => {
      console.log(body);
    });
  };

  const onClickUsedSearch = () => {
    fetch(`${SERVER_URL}/search_used?item_name=${searchWord}&remove_keyword`).then(res => res.json()).then((body: UsedItem[]) => {
      console.log(body);
    });
  };

  return (
    <div className="container">
      <div className="row mt-3 justify-content-center">
        <div className="col-12 col-md-6 text-center">
          <h1>eイヤ検索アプリ</h1>
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col-12 col-md-6">
          <form className="border p-3">
            <div className="form-group">
              <label htmlFor="searchWord">検索ワード</label>
              <input type="text" className="form-control" id="searchWord" placeholder="検索ワード"
                value={searchWord} onChange={onChangeSearchWord}/>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primary"
                onClick={onClickNewSearch} disabled={isDisabledSearchButton()}>新品検索</button>
              <button type="button" className="btn btn-secondary ml-5"
                onClick={onClickUsedSearch} disabled={isDisabledSearchButton()}>中古検索</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
