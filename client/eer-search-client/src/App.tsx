import React, { useState, FormEvent, useEffect } from 'react';

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

type ShowMode = 'New' | 'Used';

const ResultNewView: React.FC<{
  newItemList: NewItem[]
}> = ({ newItemList }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDescFlg, setSortDescFlg] = useState(false);

  const onChangeMameFilter = (e: FormEvent<HTMLInputElement>) => {
    setNameFilter(e.currentTarget.value);
  };

  const createItemList = () => {
    let temp = newItemList
      .filter(record => nameFilter !== '' ? record.name.includes(nameFilter) : true);
    switch(sortKey) {
      case '商品名':
        temp = temp.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
        break;
      case '価格':
          temp = temp.sort((a, b) => a.price > b.price ? 1 : a.price < b.price ? -1 : 0);
          break;
    }
    if (sortDescFlg) {
      temp = temp.reverse();
    }
    return temp;
  };

  const itemNameLabel = () => {
    if (sortKey !== '商品名') {
      return '商品名';
    }
    return '商品名' + (sortDescFlg ? '↓' : '↑');
  }

  const itemPriceLabel = () => {
    if (sortKey !== '価格') {
      return '価格';
    }
    return '価格' + (sortDescFlg ? '↓' : '↑');
  }

  const onClickItemNameLabel = () => {
    if (sortKey !== '商品名') { 
      setSortKey('商品名');
      setSortDescFlg(false);
    } else {
      if (!sortDescFlg) {
        setSortDescFlg(true);
      } else {
        setSortKey('');
      }
    }
  };

  const onClickItemPriceLabel = () => {
    if (sortKey !== '価格') { 
      setSortKey('価格');
      setSortDescFlg(false);
    } else {
      if (!sortDescFlg) {
        setSortDescFlg(true);
      } else {
        setSortKey('');
      }
    }
  };

  return (<>
    <div className="row mt-3 justify-content-center">
      <div className="col-12 col-md-6">
        <form>
          <div className="form-group d-flex my-0">
            <label className="text-nowrap mr-3 mt-2" htmlFor="filterWord">名前フィルタ</label>
            <input type="text" id="filterWord" className="form-control"
              placeholder="入力したワードを含むもののみ表示"
              value={nameFilter} onChange={onChangeMameFilter} />
          </div>
        </form>
      </div>
    </div>
    <div className="row mt-3 justify-content-center">
      <div className="col-12 col-md-6">
        <table className="border table">
          <thead>
            <tr>
              <th className="text-nowrap" onClick={onClickItemNameLabel}>{itemNameLabel()}</th>
              <th className="text-nowrap" onClick={onClickItemPriceLabel}>{itemPriceLabel()}</th>
              <th className="text-nowrap">画像</th>
            </tr>
          </thead>
          <tbody>
            {createItemList().map((record, index) => {
                return (
                  <tr key={index}>
                    <td><a href={record.item_url} target="_blank" rel="noopener noreferrer">{record.name}</a></td>
                    <td>{record.price}</td>
                    <td><img src={record.image_url} width={40} height={40} alt={record.name} /></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  </>);
}

const ResultUsedView: React.FC<{
  usedItemList: UsedItem[]
}> = ({ usedItemList }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDescFlg, setSortDescFlg] = useState(false);
  const [shopFilter, setShopFilter] = useState('');

  const onChangeMameFilter = (e: FormEvent<HTMLInputElement>) => {
    setNameFilter(e.currentTarget.value);
  };

  const onChangeShop = (e: FormEvent<HTMLSelectElement>) => {
    setShopFilter(e.currentTarget.value);
  };

  const createItemList = () => {
    let temp = usedItemList
      .filter(record => nameFilter !== '' ? record.name.includes(nameFilter) : true);
    temp = temp.filter(record => shopFilter !== '' ? record.shop_name === shopFilter : true);
    switch(sortKey) {
      case '商品名':
        temp = temp.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0);
        break;
      case '価格':
          temp = temp.sort((a, b) => a.price > b.price ? 1 : a.price < b.price ? -1 : 0);
          break;
    }
    if (sortDescFlg) {
      temp = temp.reverse();
    }
    return temp;
  };

  const itemNameLabel = () => {
    if (sortKey !== '商品名') {
      return '商品名';
    }
    return '商品名' + (sortDescFlg ? '↓' : '↑');
  }

  const itemPriceLabel = () => {
    if (sortKey !== '価格') {
      return '価格';
    }
    return '価格' + (sortDescFlg ? '↓' : '↑');
  }

  const onClickItemNameLabel = () => {
    if (sortKey !== '商品名') { 
      setSortKey('商品名');
      setSortDescFlg(false);
    } else {
      if (!sortDescFlg) {
        setSortDescFlg(true);
      } else {
        setSortKey('');
      }
    }
  };

  const onClickItemPriceLabel = () => {
    if (sortKey !== '価格') { 
      setSortKey('価格');
      setSortDescFlg(false);
    } else {
      if (!sortDescFlg) {
        setSortDescFlg(true);
      } else {
        setSortKey('');
      }
    }
  };

return (<>
    <div className="row mt-3 justify-content-center">
      <div className="col-12 col-md-6">
        <form>
          <div className="form-group d-flex mt-0">
            <label className="text-nowrap mr-3 mt-2" htmlFor="filterWord">名前フィルタ</label>
            <input type="text" id="filterWord" className="form-control"
              placeholder="入力したワードを含むもののみ表示"
              value={nameFilter} onChange={onChangeMameFilter} />
          </div>
          <div className="form-group d-flex mb-0">
            <label className="text-nowrap mr-3 mt-2" htmlFor="filterShop">販売店</label>
            <select className="form-control" id="filterShop" value={shopFilter} onChange={onChangeShop}>
                <option value=''>(未指定)</option>
                <option value='大阪日本橋本店'>大阪日本橋本店</option>
                <option value='梅田EST店'>梅田EST店</option>
                <option value='名古屋大須店'>名古屋大須店</option>
                <option value='秋葉原店'>秋葉原店</option>
              </select>
          </div>
        </form>
      </div>
    </div>
    <div className="row mt-3 justify-content-center">
      <div className="col-12 col-md-6">
        <table className="border table">
          <thead>
            <tr>
              <th className="text-nowrap" onClick={onClickItemNameLabel}>{itemNameLabel()}</th>
              <th className="text-nowrap" onClick={onClickItemPriceLabel}>{itemPriceLabel()}</th>
              <th className="text-nowrap">販売店</th>
              <th className="text-nowrap">商品番号</th>
              <th className="text-nowrap">画像</th>
            </tr>
          </thead>
          <tbody>
            {createItemList().map((record, index) => {
              return (
                <tr key={index}>
                  <td><a href={record.item_url} target="_blank" rel="noopener noreferrer">{record.name}</a></td>
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
  </>);
}

const ResultView: React.FC<{
  showMode: ShowMode,
  newItemList: NewItem[],
  usedItemList: UsedItem[]
}> = ({ showMode, newItemList, usedItemList }) => {
  switch (showMode) {
    case 'New':
      return (<ResultNewView newItemList={newItemList} />);
    case 'Used':
      return (<ResultUsedView usedItemList={usedItemList} />);
    default:
      return <></>;
  }
};

const App: React.FC = () => {
  const [searchWord, setSearchWord] = useState('');
  const [newItemList, setNewItemList] = useState<NewItem[]>([]);
  const [usedItemList, setUsedItemList] = useState<UsedItem[]>([]);
  const [showMode, setShowMode] = useState<ShowMode>('New');
  const [loadIngFlg, setLoadingFlg] = useState(false);

  const onChangeSearchWord = (e: FormEvent<HTMLInputElement>) => {
    setSearchWord(e.currentTarget.value);
  };

  const onChangeShowMode = (e: FormEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === 'New') {
      setShowMode('New');
      setNewItemList([]);
    } else {
      setShowMode('Used');
      setUsedItemList([]);
    }
  }

  useEffect(() => {
    if (loadIngFlg) {
      if (showMode === 'New') {
        fetch(`${SERVER_URL}/search_new?item_name=${searchWord}&remove_keyword`).then(res => res.json()).then((body: NewItem[]) => {
          setNewItemList(body);
          setShowMode('New');
          setLoadingFlg(false);
        });
      } else {
        fetch(`${SERVER_URL}/search_used?item_name=${searchWord}&remove_keyword`).then(res => res.json()).then((body: UsedItem[]) => {
          setUsedItemList(body);
          setShowMode('Used');
          setLoadingFlg(false);
        });
      }
    }
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [loadIngFlg]);

  const isDisabledSearchButton = () => searchWord === '' || loadIngFlg;

  const onClickSearch = () => {
    setLoadingFlg(true);
  }

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
                value={searchWord} onChange={onChangeSearchWord} readOnly={loadIngFlg}/>
            </div>
            <div className="form-group d-flex">
              <label className="text-nowrap mt-2" htmlFor="showMode">商品状態</label>
              <select className="form-control ml-3" id="showMode" value={showMode} onChange={onChangeShowMode}
                disabled={loadIngFlg}>
                <option value='New'>新品</option>
                <option value='Used'>中古</option>
              </select>
              <button type="button" className="btn btn-primary text-nowrap ml-3"
                onClick={onClickSearch} disabled={isDisabledSearchButton()}>検索</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col-12 col-md-6">
          <div className={`spinner-border text-primary ${loadIngFlg ? '' : 'd-none'}`} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
      <ResultView showMode={showMode} newItemList={newItemList} usedItemList={usedItemList} />
    </div>
  );
}

export default App;
