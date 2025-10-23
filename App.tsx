import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProductShowcase } from './components/ProductShowcase';
import { ProductDetail } from './components/ProductDetail';
import { ComparisonToolbar } from './components/ComparisonToolbar';
import { ComparisonPage } from './components/ComparisonPage';
import { CartSummary } from './components/CartSummary';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import { SearchResults } from './components/SearchResults';
import { FeedbackModal } from './components/FeedbackModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ReceiptModal } from './components/ReceiptModal';
import { ProductCardSkeleton } from './components/ProductCardSkeleton';
import { WishlistModal } from './components/WishlistModal';
import { AIImageStudio } from './components/AIImageStudio';
import { AuthModal } from './components/AuthModal';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPage } from './components/AccountPage';
import { LiveChatWidget } from './components/LiveChatWidget';
import { AnimatedBackground } from './components/AnimatedBackground';
import { EcosystemBuilder } from './components/EcosystemBuilder';
import type { Product, ProductCategory, Order } from './types';
import { PRODUCTS, ACCESSORIES } from './constants';
import { useCart } from './contexts/CartContext';
import { useUser } from './contexts/UserContext';

type View = 'home' | 'productDetail' | 'comparisonPage' | 'searchResults' | 'aiStudio' | 'checkout' | 'account';

const App: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user, addOrderToHistory } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | null>(null);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isEcosystemBuilderOpen, setIsEcosystemBuilderOpen] = useState(false);
  const [preselectedPhoneForBuilder, setPreselectedPhoneForBuilder] = useState<Product | null>(null);

  useEffect(() => {
    // Simulate initial data load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const allProducts = [...PRODUCTS, ...ACCESSORIES];

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentView('productDetail');
    window.scrollTo(0, 0);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedProduct(null);
    setCurrentView('home');
  }, []);

  const handleToggleCompare = useCallback((product: Product) => {
    setComparisonList(prevList => {
      const isInList = prevList.find(p => p.id === product.id);
      if (isInList) {
        return prevList.filter(p => p.id !== product.id);
      } else {
        return [...prevList, product];
      }
    });
  }, []);

  const handleClearComparison = useCallback(() => {
    setComparisonList([]);
  }, []);

  const handleShowComparison = useCallback(() => {
    if (comparisonList.length > 0) {
      setCurrentView('comparisonPage');
      window.scrollTo(0, 0);
    }
  }, [comparisonList.length]);

  const handleNavigateToCompare = useCallback(() => {
    setCurrentView('comparisonPage');
    window.scrollTo(0, 0);
  }, []);
  
  const handleResetView = useCallback(() => {
    setSelectedProduct(null);
    setSearchQuery('');
    setComparisonList([]);
    setCategoryFilter(null);
    setCurrentView('home');
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (queryToSearch: string) => {
    if (queryToSearch.trim()) {
      setSearchQuery(queryToSearch);
      setCurrentView('searchResults');
      setSelectedProduct(null);
      setCategoryFilter(null);
      window.scrollTo(0, 0);
    }
  };
  
  const handleCategorySelect = useCallback((category: ProductCategory | null) => {
    setCategoryFilter(category);
    setCurrentView('home');
    if(category){
        setTimeout(() => document.querySelector('#product-showcase')?.scrollIntoView({ behavior: 'smooth' }), 0);
    }
  }, []);

  const handleGoToCheckout = () => {
    if (cartItems.length === 0) return;
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };
  
  const handlePlaceOrder = () => {
     if (cartItems.length === 0) return;
    
    const newOrder: Order = {
      id: `EH-${Date.now()}`,
      items: [...cartItems],
      subtotal: subtotal,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    
    setCurrentOrder(newOrder);
    addOrderToHistory(newOrder);
    setIsReceiptModalOpen(true);
    clearCart();
    setCurrentView('home');
  };


  const handleCloseReceipt = () => {
    setIsReceiptModalOpen(false);
    setCurrentOrder(null);
  };

  const handleOpenEcosystemBuilder = useCallback((product: Product) => {
    setPreselectedPhoneForBuilder(product);
    setIsEcosystemBuilderOpen(true);
  }, []);

  const handleCloseEcosystemBuilder = () => {
      setIsEcosystemBuilderOpen(false);
      setPreselectedPhoneForBuilder(null);
  };

  const showToolbar = comparisonList.length > 0 && (currentView === 'home' || currentView === 'searchResults');
  
  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const MainContent = () => {
    if (isLoading && currentView === 'home') {
      return (
        <>
          <Hero />
          <TrustBar />
          <section id="product-showcase" className="py-20 sm:py-32">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                  <div className="h-12 bg-gray-800 rounded-md w-1/2 mx-auto animate-pulse"></div>
                  <div className="h-6 bg-gray-800 rounded-md w-3/4 mx-auto mt-4 animate-pulse"></div>
              </div>
              <div className="flex justify-end mb-8">
                  <div className="h-10 bg-gray-800 rounded-md w-48 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            </div>
          </section>
          <WhyChooseUs />
        </>
      );
    }

    switch (currentView) {
      case 'comparisonPage':
        return <ComparisonPage 
          comparisonList={comparisonList} 
          allProducts={allProducts}
          onToggleCompare={handleToggleCompare}
          onClear={handleClearComparison}
          onClose={handleResetView}
        />;
      
      case 'productDetail':
        if (selectedProduct) {
          return <ProductDetail 
            product={selectedProduct} 
            allProducts={allProducts}
            onClose={handleCloseDetail}
            onSelectProduct={handleSelectProduct}
            comparisonList={comparisonList}
            onToggleCompare={handleToggleCompare}
            onHomeClick={handleResetView}
            onCategoryClick={handleCategorySelect}
            onAuthClick={() => setIsAuthModalOpen(true)}
            onAddToBundle={handleOpenEcosystemBuilder}
          />;
        }
        return null;
      
      case 'searchResults':
        return (
          <SearchResults
            query={searchQuery}
            products={filteredProducts}
            onSelectProduct={handleSelectProduct}
            comparisonList={comparisonList}
            onToggleCompare={handleToggleCompare}
            onAddToBundle={handleOpenEcosystemBuilder}
          />
        );

      case 'aiStudio':
        return <AIImageStudio onClose={handleResetView} />;
        
      case 'checkout':
        return <CheckoutPage onPlaceOrder={handlePlaceOrder} onBack={() => setCurrentView('home')} />;
        
      case 'account':
        return <AccountPage onBackToHome={handleResetView} />;

      case 'home':
      default: {
        const productsToShow = categoryFilter
            ? allProducts.filter(p => p.category === categoryFilter)
            : PRODUCTS;

        const showcaseTitle = categoryFilter 
            ? `${categoryFilter}${categoryFilter === 'Accessory' ? 'ies' : 's'}` 
            : 'Featured Products';
        const showcaseDescription = categoryFilter 
            ? `Browse our collection of ${showcaseTitle}` 
            : 'Quality devices for every need and budget.';

        return (
          <>
            <Hero />
            <TrustBar />
            <ProductShowcase 
              products={productsToShow} 
              onSelectProduct={handleSelectProduct}
              comparisonList={comparisonList}
              onToggleCompare={handleToggleCompare}
              title={showcaseTitle}
              description={showcaseDescription}
              onAddToBundle={handleOpenEcosystemBuilder}
            />
            <WhyChooseUs />
          </>
        );
      }
    }
  }

  return (
      <div className="bg-black min-h-screen flex flex-col">
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          onWishlistClick={() => setIsWishlistOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLogoClick={handleResetView}
          onSearch={handleSearch}
          products={allProducts}
          onCategorySelect={handleCategorySelect}
          selectedCategory={categoryFilter}
          onAIStudioClick={() => setCurrentView('aiStudio')}
          onCompareClick={handleNavigateToCompare}
          comparisonCount={comparisonList.length}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onAccountClick={() => setCurrentView('account')}
        />
        <main className={`flex-grow ${showToolbar ? 'pb-32' : ''}`}>
          {currentView === 'home' && <AnimatedBackground />}
          <MainContent />
        </main>
        
        <CartSummary isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleGoToCheckout} />
        
        <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

        {isFeedbackModalOpen && (
          <FeedbackModal onClose={() => setIsFeedbackModalOpen(false)} />
        )}
        
        {isAuthModalOpen && (
          <AuthModal onClose={() => setIsAuthModalOpen(false)} />
        )}

        {isEcosystemBuilderOpen && (
          <EcosystemBuilder 
            phones={PRODUCTS}
            accessories={ACCESSORIES}
            onClose={handleCloseEcosystemBuilder}
            initialPhone={preselectedPhoneForBuilder}
          />
        )}

        {isReceiptModalOpen && currentOrder && (
          <ReceiptModal order={currentOrder} onClose={handleCloseReceipt} />
        )}

        {showToolbar && (
          <ComparisonToolbar 
            list={comparisonList}
            onCompare={handleShowComparison}
            onClear={handleClearComparison}
          />
        )}

        {currentView !== 'comparisonPage' && currentView !== 'aiStudio' && currentView !== 'checkout' && (
          <Footer onFeedbackClick={() => setIsFeedbackModalOpen(true)} />
        )}

        <WhatsAppButton />
        <LiveChatWidget />
      </div>
  );
};

export default App;