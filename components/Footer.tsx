import React from 'react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, LockClosedIcon, CreditCardIcon } from './Icons';
import { BranchMap } from './BranchMap';
import { BRANCHES } from '../constants';

interface FooterProps {
  onFeedbackClick: () => void;
}

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
        {children}
    </a>
);

export const Footer: React.FC<FooterProps> = ({ onFeedbackClick }) => {
  return (
    <footer 
      id="footer-support" 
      className="relative text-gray-300 bg-cover bg-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1695035222396-70e625c27f3d?q=80&w=1920&auto=format&fit=crop')` }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      <div className="relative container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Branch Locator Section */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-white mb-6">Find Our Branches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <ul className="space-y-6 text-sm">
                {BRANCHES.map(branch => (
                  <li key={branch.name}>
                    <strong className="text-white block text-base font-semibold">{branch.name}</strong>
                    <span className="text-gray-300">{branch.address}</span>
                  </li>
                ))}
              </ul>
              <div className="h-64 md:h-auto w-full rounded-lg overflow-hidden border border-white/10">
                <BranchMap />
              </div>
            </div>
          </div>

          {/* Contact & Info Section */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">EasyHub</h3>
            <p className="text-sm italic mb-4">...serving your digital lifestyle</p>
            <p className="text-xs">
              EasyHub Nigeria LTD (RC: 1724543)
            </p>
             <ul className="space-y-2 text-sm mt-6">
                <li><a href="tel:+2349061443847" className="hover:text-orange-500 transition-colors">+234 906 144 3847</a></li>
                <li><a href="tel:+2348169257333" className="hover:text-orange-500 transition-colors">+234 816 925 7333</a></li>
            </ul>
             <div className="flex space-x-4 mt-6">
              <SocialLink href="https://instagram.com/easyhubnigeria"><InstagramIcon className="w-6 h-6" /></SocialLink>
              <SocialLink href="#"><FacebookIcon className="w-6 h-6" /></SocialLink>
              <SocialLink href="https://wa.me/+2348169257333"><WhatsAppIcon className="w-6 h-6" /></SocialLink>
            </div>
             <button onClick={onFeedbackClick} className="text-sm mt-6 hover:text-orange-500 text-left transition-colors">Provide Website Feedback</button>
          </div>
        </div>
        <div className="mt-20 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} EasyHub Nigeria LTD. All rights reserved.</p>
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
          <div className="flex items-center gap-3 text-green-400">
            <LockClosedIcon className="w-5 h-5" />
            <span>Secure SSL Checkout</span>
            <CreditCardIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
};