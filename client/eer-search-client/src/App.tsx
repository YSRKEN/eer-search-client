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

type ShowMode = 'None' | 'New' | 'Used';

const ResultView: React.FC<{
  showMode: ShowMode,
  newItemList: NewItem[],
  usedItemList: UsedItem[]
}> = ({ showMode, newItemList, usedItemList }) => {
  switch (showMode) {
    case 'None':
      return <></>;
    case 'New':
      return (
        <div className="row mt-3 justify-content-center">
          <div className="col-12 col-md-6">
            <table className="border table">
              <thead>
                <tr>
                  <th>商品名</th>
                  <th>価格</th>
                  <th>画像</th>
                </tr>
              </thead>
              <tbody>
                {newItemList.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td><a href={record.item_url}>{record.name}</a></td>
                      <td>{record.price}</td>
                      <td><img src={record.image_url} width={40} height={40} alt={record.name} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'Used':
      return (
        <div className="row mt-3 justify-content-center">
          <div className="col-12 col-md-6">
            <table className="border table">
              <thead>
                <tr>
                  <th>商品名</th>
                  <th>価格</th>
                  <th>販売店</th>
                  <th>商品番号</th>
                  <th>画像</th>
                </tr>
              </thead>
              <tbody>
                {usedItemList.map((record, index) => {
                  return (
                    <tr key={index}>
                      <td><a href={record.item_url}>{record.name}</a></td>
                      <td>{record.price}</td>
                      <td>{record.shop_name}</td>
                      <td>{record.shop_item_id}</td>
                      <td><img src={record.image_url} width={40} height={40} alt={record.name} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      return <></>;
  }
};

const App: React.FC = () => {
  const [searchWord, setSearchWord] = useState('');
  const [newItemList, setNewItemList] = useState<NewItem[]>([]);
  const [usedItemList, setUsedItemList] = useState<UsedItem[]>([]);
  const [showMode, setShowMode] = useState<ShowMode>('None');

  const onChangeSearchWord = (e: FormEvent<HTMLInputElement>) => {
    setSearchWord(e.currentTarget.value);
  };

  const isDisabledSearchButton = () => searchWord === '';

  const onClickNewSearch = () => {
    fetch(`${SERVER_URL}/search_new?item_name=${searchWord}&remove_keyword`).then(res => res.json()).then((body: NewItem[]) => {
      setNewItemList(body);
      setShowMode('New');
    });
  };

  const onClickUsedSearch = () => {
    fetch(`${SERVER_URL}/search_used?item_name=${searchWord}&remove_keyword`).then(res => res.json()).then((body: UsedItem[]) => {
      setUsedItemList(body);
      setShowMode('Used');
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
                value={searchWord} onChange={onChangeSearchWord} />
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
      <ResultView showMode={showMode} newItemList={newItemList} usedItemList={usedItemList} />
    </div>
  );
}

export default App;
