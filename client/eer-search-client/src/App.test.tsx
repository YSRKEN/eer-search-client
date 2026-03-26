import { render } from '@testing-library/react';
import App from './App';

test('タイトルが表示される', () => {
  const { getByRole } = render(<App />);
  expect(getByRole('heading', { name: 'eイヤ検索アプリ' })).toBeInTheDocument();
});