import React, { useState, useMemo } from 'react';
// FIX: Replace non-existent 'Accessory' type with 'Product' as accessories are a category of Product.
import type { Product } from '../types';
import { XIcon, PlusIcon, CheckIcon } from './Icons';
import { useCart } from '../contexts/CartContext';
import { useLocalization } from '../contexts/LocalizationContext';

interface EcosystemBuilderProps {
  phones: Product[];
  accessories: Product[];
  onClose: () => void;
  initialPhone?: Product | null;
}

export const EcosystemBuilder: React.FC<EcosystemBuilderProps> = ({ phones, accessories, onClose, initialPhone = null }) => {
  const [step, setStep] = useState(initialPhone ? 2 : 1);
  const [selectedPhone, setSelectedPhone] = useState<Product | null>(initialPhone);
  const [selectedAccessories, setSelectedAccessories] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { formatPrice, t } = useLocalization();

  const handleSelectPhone = (phone: Product) => {
    setSelectedPhone(phone);
    setStep(2);
  };

  const toggleAccessory = (accessory: Product) => {
    setSelectedAccessories(prev =>
      prev.find(a => a.id === accessory.id)
        ? prev.filter(a => a.id !== accessory.id)
        : [...prev, accessory]
    );
  };

  const bundleItems = useMemo(() => {
    if (!selectedPhone) return [];
    return [selectedPhone, ...selectedAccessories];
  }, [selectedPhone, selectedAccessories]);

  const subtotal = useMemo(() => {
    return bundleItems.reduce((total, item) => total + item.price, 0);
  }, [bundleItems]);
  
  const discount = useMemo(() => {
    // 5% discount for each accessory, max 20%
    const discountPercentage = Math.min(selectedAccessories.length * 0.05, 0.20);
    return subtotal * discountPercentage;
  }, [subtotal, selectedAccessories]);

  const total = useMemo(() => subtotal - discount, [subtotal, discount]);

  const handleAddBundleToCart = () => {
    if (selectedPhone) {
      addToCart(selectedPhone);
      selectedAccessories.forEach(acc => {
        // In a real app, accessories might have a different type than Product
        // For this demo, we cast it to add to cart
        // FIX: Remove unnecessary cast as 'acc' is now correctly typed as Product.
        addToCart(acc);
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in-fast">
      <div className="bg-gray-900 w-full h-full lg:w-11/12 lg:h-5/6 rounded-lg shadow-2xl flex flex-col relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20">
          <XIcon className="w-8 h-8" />
        </button>
        
        <div className="p-6 border-b border-gray-800 text-center">
            <h2 className="text-3xl font-bold">{t('Build Your Ecosystem')}</h2>
            <p className="text-sm text-gray-400 mt-2">Step {step} of 2</p>
            <div className="max-w-xs mx-auto mt-2 flex gap-2">
              <div className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${step >= 1 ? 'bg-cyan-500' : 'bg-gray-700'}`}></div>
              <div className={`h-1.5 rounded-full flex-1 transition-colors duration-300 ${step >= 2 ? 'bg-cyan-500' : 'bg-gray-700'}`}></div>
            </div>
        </div>

        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          {/* Main content */}
          <div className="flex-grow p-8 overflow-y-auto">
            {step === 1 && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">{t('Step 1: Choose Your Foundation')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {phones.map(phone => (
                    <div 
                      key={phone.id} 
                      onClick={() => handleSelectPhone(phone)} 
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelectPhone(phone)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${phone.name}`}
                      className="bg-gray-800 p-4 rounded-lg cursor-pointer border-2 border-transparent hover:border-cyan-500 transition-colors"
                    >
                      <img src={phone.imageUrl} alt={phone.name} className="w-full h-48 object-cover rounded" />
                      <h4 className="mt-4 font-bold text-lg">{phone.name}</h4>
                      <p className="text-cyan-400">{formatPrice(phone.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
             {step === 2 && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">{t('Step 2: Accessorize Your Life')}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {accessories.map(acc => {
                    const isSelected = !!selectedAccessories.find(a => a.id === acc.id);
                    return (
                        <div 
                          key={acc.id} 
                          onClick={() => toggleAccessory(acc)}
                          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleAccessory(acc)}
                          tabIndex={0}
                          role="checkbox"
                          aria-checked={isSelected}
                          className={`bg-gray-800 p-4 rounded-lg cursor-pointer border-2 ${isSelected ? 'border-cyan-500' : 'border-transparent'} transition-colors relative`}
                        >
                            <img src={acc.imageUrl} alt={acc.name} className="w-full h-32 object-cover rounded" />
                            <h4 className="mt-2 font-semibold text-sm">{acc.name}</h4>
                            <p className="text-cyan-400 text-sm">{formatPrice(acc.price)}</p>
                            <div className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-cyan-500 text-black' : 'bg-black/50 text-white'}`}>
                                {isSelected ? <CheckIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
                            </div>
                        </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-96 bg-black/30 p-8 flex flex-col border-t md:border-t-0 md:border-l border-gray-800">
            <h3 className="text-2xl font-semibold mb-6">{t('Your Bundle')}</h3>
            {selectedPhone ? (
              <>
                <div className="flex-grow space-y-3 overflow-y-auto pr-2">
                  {[selectedPhone, ...selectedAccessories].map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <span>{item.name}</span>
                      <span className="text-gray-400">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4 space-y-2">
                   <div className="flex justify-between text-md">
                    <span>{t('Subtotal')}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-md text-green-400">
                    <span>{t('Bundle Discount')}</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                   <div className="flex justify-between text-xl font-bold pt-2">
                    <span>{t('Total')}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <button onClick={handleAddBundleToCart} className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 rounded-full text-lg">
                  {t('Add Bundle to Cart')}
                </button>
              </>
            ) : (
                <div className="flex-grow flex items-center justify-center text-gray-500">
                    <p>{t('Select a phone to start')}</p>
                </div>
            )}
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};