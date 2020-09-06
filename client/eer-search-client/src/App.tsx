import React, { useState, FormEvent, useEffect } from 'react';

const SERVER_URL = window.location.port === '3000'
  ? 'http://localhost:5000'
  : window.location.protocol + '//' + window.location.host;

const THUMBNAIL_SIZE = 60;

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
}

interface UsedItemInfo {
  shop_name: string,      // 置いてあるお店の名前
  rank: string,           // ランク(未開封品～ジャンク)
  fancy_box_flg: boolean, // 外箱の有無
  item_status: string,    // 商品状態
  accessories: string,    // 付属内容
  stockout: string,       // 欠品内容
  compensation: string    // 補償
}

type ShowMode = 'New' | 'Used';

const NewItemRecord: React.FC<{ record: NewItem }> = ({record}) => {
  const [showStockFlg, setShowStockFlg] = useState(false);
  const [stockText, setStockText] = useState('在庫：取得中...');
  const [sampleText, setSampleText] = useState('試聴機：取得中...');

  useEffect(() => {
    const refresh = async () => {
      const result = await fetch(`${SERVER_URL}/get_stock_data?item_url=${record.item_url}`);
      if (result.ok) {
        const result2: {
          stock: {name: string, info: string}[],
          sample: string[]
        } = await result.json();
        if (result2.stock.length === 0) {
          setStockText('在庫：なし');
        } else {
          setStockText('在庫：' + result2.stock.map(r => `${r.name}(${r.info})`).join('、'));
        }
        if (result2.sample.length === 0) {
          setSampleText('試聴機：なし');
        } else {
          setSampleText('試聴機：' + result2.sample.join('、'));
        }
      } else {
        setStockText('在庫：不明');
        setSampleText('試聴機：不明');
      }
    };
    if (showStockFlg) {
      refresh();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStockFlg]);

  return (<>
    <tr>
      <td className="align-middle"><a href={record.item_url} target="_blank" rel="noopener noreferrer">{record.name}</a></td>
      <td className="align-middle">{record.price}</td>
      <td className="align-middle"><img src={record.image_url} width={THUMBNAIL_SIZE} height={THUMBNAIL_SIZE} alt={record.name} /></td>
      <td className="align-middle text-center"><button className="btn btn-primary"
        onClick={() => setShowStockFlg(!showStockFlg)}>在庫</button></td>
    </tr>
    {showStockFlg
      ? <tr>
        <td className="align-middle" colSpan={4}>
          <ul className="my-0">
            <li>{stockText}</li>
            <li>{sampleText}</li>
          </ul>
        </td>
      </tr>
      : <></>}
  </>);
};

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
    switch (sortKey) {
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
      <div className="col-12 col-md-8">
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
      <div className="col-12 col-md-8">
        <table className="border table table-striped table-nowrap table-bordered table-sm">
          <thead>
            <tr>
              <th className="text-nowrap" onClick={onClickItemNameLabel}>{itemNameLabel()}</th>
              <th className="text-nowrap" onClick={onClickItemPriceLabel}>{itemPriceLabel()}</th>
              <th className="text-nowrap">画像</th>
              <th className="text-nowrap">詳細</th>
            </tr>
          </thead>
          <tbody>
            {createItemList().map((record, index) => {
              return <NewItemRecord record={record} key={index} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  </>);
}

const UsedItemRecord: React.FC<{ record: UsedItem }> = ({record}) => {
  const [showStockFlg, setShowStockFlg] = useState(false);
  const [usedItemInfo, setUsedItemInfo] = useState<UsedItemInfo>({
    shop_name: '取得中...',
    rank: '取得中...',
    fancy_box_flg: false,
    item_status: '取得中...',
    accessories: '取得中...',
    stockout: '取得中...',
    compensation: '取得中...'
  });

  useEffect(() => {
    const refresh = async () => {
      const result = await fetch(`${SERVER_URL}/get_used_data?item_url=${record.item_url}`);
      if (result.ok) {
        const result2: UsedItemInfo = await result.json();
        setUsedItemInfo(result2);
      } else {
        setUsedItemInfo({
          shop_name: '不明',
          rank: '不明',
          fancy_box_flg: false,
          item_status: '不明',
          accessories: '不明',
          stockout: '不明',
          compensation: '不明'
        });
      }
    };
    if (showStockFlg) {
      refresh();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showStockFlg]);

  return (<>
    <tr>
    <td className="align-middle"><a href={record.item_url} target="_blank" rel="noopener noreferrer">{record.name}</a></td>
                  <td className="align-middle">{record.price}</td>
                  <td className="align-middle"><img src={record.image_url} width={THUMBNAIL_SIZE} height={THUMBNAIL_SIZE} alt={record.name} /></td>
      <td className="align-middle text-center"><button className="btn btn-primary"
        onClick={() => setShowStockFlg(!showStockFlg)}>在庫</button></td>
    </tr>
    {showStockFlg
      ? <tr>
        <td className="align-middle" colSpan={4}>
          <ul>
            <li>店名：{usedItemInfo.shop_name}</li>
            <li>ランク：{usedItemInfo.rank}</li>
            <li>外箱：{usedItemInfo.fancy_box_flg ? '有り' : '無し'}</li>
            <li>商品状態：{usedItemInfo.item_status}</li>
            <li>付属内容：{usedItemInfo.accessories}</li>
            <li>欠品内容：{usedItemInfo.stockout}</li>
            <li>補償：{usedItemInfo.compensation}</li>
          </ul>
        </td>
      </tr>
      : <></>}
  </>);
};

const ResultUsedView: React.FC<{
  usedItemList: UsedItem[]
}> = ({ usedItemList }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDescFlg, setSortDescFlg] = useState(false);

  const onChangeMameFilter = (e: FormEvent<HTMLInputElement>) => {
    setNameFilter(e.currentTarget.value);
  };

  const createItemList = () => {
    let temp = usedItemList
      .filter(record => nameFilter !== '' ? record.name.includes(nameFilter) : true);
    switch (sortKey) {
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
      <div className="col-12 col-md-8">
        <form>
          <div className="form-group d-flex mt-0">
            <label className="text-nowrap mr-3 mt-2" htmlFor="filterWord">名前フィルタ</label>
            <input type="text" id="filterWord" className="form-control"
              placeholder="入力したワードを含むもののみ表示"
              value={nameFilter} onChange={onChangeMameFilter} />
          </div>
        </form>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-12 col-md-8">
        <table className="border table table-striped table-nowrap table-bordered table-sm">
          <thead>
            <tr>
              <th className="text-nowrap" onClick={onClickItemNameLabel}>{itemNameLabel()}</th>
              <th className="text-nowrap" onClick={onClickItemPriceLabel}>{itemPriceLabel()}</th>
              <th className="text-nowrap">画像</th>
              <th className="text-nowrap">詳細</th>
            </tr>
          </thead>
          <tbody>
            {createItemList().map((record, index) => {
              return <UsedItemRecord record={record} key={index} />;
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
        <div className="col-12 col-md-8 text-center">
          <h1>eイヤ検索アプリ</h1>
        </div>
      </div>
      <div className="row mt-3 justify-content-center">
        <div className="col-12 col-md-8">
          <form className="border p-3">
            <div className="form-group">
              <label htmlFor="searchWord">検索ワード</label>
              <input type="text" className="form-control" id="searchWord" placeholder="検索ワード"
                value={searchWord} onChange={onChangeSearchWord} readOnly={loadIngFlg} />
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
        <div className="col-12 col-md-8">
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
