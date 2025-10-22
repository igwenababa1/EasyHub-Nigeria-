import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProductShowcase } from './components/ProductShowcase';
import { ProductDetail } from './components/ProductDetail';
import { ComparisonToolbar } from './components/ComparisonToolbar';
import { ComparisonEngine } from './components/ComparisonEngine';
import { CartSummary } from './components/CartSummary';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import { SearchResults } from './components/SearchResults';
import { FeedbackModal } from './components/FeedbackModal';
import type { Product } from './types';
import { PRODUCTS, ACCESSORIES } from './constants';
import { CartProvider } from './contexts/CartContext';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleToggleCompare = useCallback((product: Product) => {
    setComparisonList(prevList => {
      const isInList = prevList.find(p => p.id === product.id);
      if (isInList) {
        return prevList.filter(p => p.id !== product.id);
      } else if (prevList.length < 3) {
        return [...prevList, product];
      }
      return prevList;
    });
  }, []);

  const handleClearComparison = useCallback(() => {
    setComparisonList([]);
  }, []);

  const handleShowComparison = useCallback(() => {
    if (comparisonList.length > 1) {
      setIsComparing(true);
      window.scrollTo(0, 0);
    }
  }, [comparisonList.length]);

  const handleCloseComparison = useCallback(() => {
    setIsComparing(false);
  }, []);
  
  const handleResetView = useCallback(() => {
    setSelectedProduct(null);
    setSearchQuery('');
    setIsComparing(false);
    setIsShowingSearchResults(false);
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (queryToSearch: string) => {
    if (queryToSearch.trim()) {
      setSearchQuery(queryToSearch);
      setIsShowingSearchResults(true);
      setSelectedProduct(null);
      setIsComparing(false);
      window.scrollTo(0, 0);
    }
  };

  const showToolbar = comparisonList.length > 0 && !selectedProduct && !isComparing && !isShowingSearchResults;
  
  const allProducts = [...PRODUCTS, ...ACCESSORIES];
  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const MainContent = () => {
    if (isComparing) {
      return <ComparisonEngine products={comparisonList} onClose={handleCloseComparison} />;
    }
    if (selectedProduct) {
      return <ProductDetail 
        product={selectedProduct} 
        accessories={ACCESSORIES}
        onClose={handleCloseDetail} 
      />;
    }
    if (isShowingSearchResults) {
      return (
        <SearchResults
          query={searchQuery}
          products={filteredProducts}
          onSelectProduct={handleSelectProduct}
          comparisonList={comparisonList}
          onToggleCompare={handleToggleCompare}
        />
      );
    }
    return (
      <>
        <Hero />
        <TrustBar />
        <ProductShowcase 
          products={PRODUCTS} 
          onSelectProduct={handleSelectProduct}
          comparisonList={comparisonList}
          onToggleCompare={handleToggleCompare}
        />
        <WhyChooseUs />
      </>
    );
  }

  return (
    <CartProvider>
      <div className="bg-black min-h-screen flex flex-col">
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLogoClick={handleResetView}
          onSearch={handleSearch}
          products={allProducts}
        />
        <main className={`flex-grow ${showToolbar ? 'pb-32' : ''}`}>
          <MainContent />
        </main>
        
        <CartSummary isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        
        {isFeedbackModalOpen && (
          <FeedbackModal onClose={() => setIsFeedbackModalOpen(false)} />
        )}

        {showToolbar && (
          <ComparisonToolbar 
            list={comparisonList}
            onCompare={handleShowComparison}
            onClear={handleClearComparison}
          />
        )}

        {!isComparing && <Footer onFeedbackClick={() => setIsFeedbackModalOpen(true)} />}
      </div>
    </CartProvider>
  );
};

export default App;