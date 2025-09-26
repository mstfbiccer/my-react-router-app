// Product component için temel render ve etkileşim testleri
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Product from './Product';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';

// Mock AuthContext
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ isLogin: true })
}));

const mockStore = configureStore([]);
const store = mockStore({});

const defaultProps = {
  id: '1',
  name: 'Test Ürün',
  price: 100,
  originalPrice: 150,
  image: 'test.jpg',
  rating: 4.5,
  reviewCount: 10,
  inStock: true,
  category: 'Elektronik',
  url: '/product/1',
};

describe('Product', () => {
  it('ürün adı, fiyat ve kategori render edilmeli', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test Ürün')).toBeInTheDocument();
    expect(screen.getByText('Elektronik')).toBeInTheDocument();
    expect(screen.getByText(/₺/)).toBeInTheDocument();
  });

  it('sepete ekle butonu render edilmeli ve tıklanabilmeli', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product {...defaultProps} />
        </BrowserRouter>
      </Provider>
    );
    const button = screen.getByRole('button', { name: /Sepete Ekle/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('stok yoksa tükendi etiketi görünmeli ve buton disabled olmalı', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product {...defaultProps} inStock={false} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Tükendi')).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Tükendi/i });
    expect(button).toBeDisabled();
  });

  it('ürün adı ekranda görünmeli', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Product
            id="1"
            name="Test Ürün"
            price={100}
            image="/test.jpg"
            rating={4.5}
            reviewCount={10}
            inStock={true}
            category="Elektronik"
            url="/product/1"
          />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Test Ürün')).toBeInTheDocument();
  });
});
