import React from 'react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './Icons';

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
    <footer id="footer-support" className="text-gray-400 bg-gray-900/50 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-2">EasyHub</h3>
            <p className="text-sm italic mb-4">...serving your digital lifestyle</p>
            <p className="text-xs">
              EasyHub Nigeria LTD <br />
              RC Number: 1724543
            </p>
            <div className="flex space-x-4 mt-6">
              <SocialLink href="https://instagram.com/easyhubnigeria"><InstagramIcon className="w-6 h-6" /></SocialLink>
              <SocialLink href="#"><FacebookIcon className="w-6 h-6" /></SocialLink>
              <SocialLink href="https://wa.me/+2348169257333"><WhatsAppIcon className="w-6 h-6" /></SocialLink>
            </div>
          </div>

          {/* Branches */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Branches</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <strong>Ikeja:</strong><br/>
                Shop B1, M-Square Plaza, Pepple Street, Computer Village, Ikeja, Lagos.
              </li>
              <li>
                <strong>Ikotun:</strong><br/>
                Shop 20/21, Ferach Plaza, Behind BRT Ikotun Market, Ikotun, Lagos.
              </li>
               <li>
                <strong>Victoria Island:</strong><br/>
                Shop C4, Tele Plaza, Saka Tinubu Street, Victoria Island, Lagos.
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
             <ul className="space-y-2 text-sm">
                <li><a href="tel:+2349061443847" className="hover:text-orange-500">+234 906 144 3847</a></li>
                <li><a href="tel:+2348169257333" className="hover:text-orange-500">+234 816 925 7333</a></li>
                <li><a href="mailto:support@easyhub.com" className="hover:text-orange-500">support@easyhub.com</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={onFeedbackClick} className="hover:text-orange-500 text-left">Provide Feedback</button></li>
              <li><a href="#" className="hover:text-orange-500">Track Order</a></li>
              <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EasyHub Nigeria LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};