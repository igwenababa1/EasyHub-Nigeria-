import React from 'react';
import type { Product } from '../types';
import { FaceIdIcon, SPenIcon, WaterproofIcon, LinkIcon, DesktopIcon, CpuChipIcon, CameraIcon, DisplayIcon, BatteryIcon } from './Icons';

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-gray-900/50 rounded-lg">
        <div className="text-orange-400 mb-4">{icon}</div>
        <h4 className="font-bold text-lg text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

const IphoneFeatures: React.FC = () => (
    <>
        <Feature 
            icon={<FaceIdIcon className="w-10 h-10"/>}
            title="Face ID"
            description="The most secure facial authentication in a smartphone, powered by the TrueDepth camera."
        />
        <Feature 
            icon={<CpuChipIcon className="w-10 h-10"/>}
            title="A-Series Bionic Chip"
            description="Experience industry-leading performance and efficiency for gaming, photography, and AR."
        />
        <Feature 
            icon={<CameraIcon className="w-10 h-10"/>}
            title="Pro Camera System"
            description="Advanced sensors and image signal processing for stunning photos and videos in any light."
        />
        <Feature 
            icon={<DisplayIcon className="w-10 h-10"/>}
            title="Super Retina XDR"
            description="The brightest and sharpest display in an iPhone, with ProMotion for adaptive refresh rates."
        />
    </>
);

const SamsungFeatures: React.FC = () => (
    <>
        <Feature 
            icon={<SPenIcon className="w-10 h-10"/>}
            title="S Pen Support"
            description="Write, draw, and control your phone with unparalleled precision. It’s your favorite pen, now smarter."
        />
        <Feature 
            icon={<DesktopIcon className="w-10 h-10"/>}
            title="Samsung DeX"
            description="Transform your phone into a desktop-like experience with a single cable or wirelessly."
        />
        <Feature 
            icon={<CameraIcon className="w-10 h-10"/>}
            title="Space Zoom Camera"
            description="Get closer than ever before with groundbreaking zoom capabilities and AI-powered stabilization."
        />
        <Feature 
            icon={<DisplayIcon className="w-10 h-10"/>}
            title="Dynamic AMOLED 2X"
            description="Incredibly vivid colors and a smooth 120Hz refresh rate for the most immersive viewing experience."
        />
    </>
);

const AudioFeatures: React.FC = () => (
    <>
        <Feature 
            icon={<WaterproofIcon className="w-10 h-10"/>}
            title="IP67 Waterproof"
            description="Built to withstand the elements. Take your music to the beach, pool, or anywhere adventure calls."
        />
        <Feature 
            icon={<LinkIcon className="w-10 h-10"/>}
            title="JBL PartyBoost"
            description="Link multiple PartyBoost-compatible speakers together for stereo sound or to amplify your party."
        />
        <Feature 
            icon={<BatteryIcon className="w-10 h-10"/>}
            title="Long-Lasting Battery"
            description="Keep the music going for hours on a single charge, so the party never has to stop."
        />
         <Feature 
            icon={<CpuChipIcon className="w-10 h-10"/>}
            title="JBL Pro Sound"
            description="Experience powerful, punchy bass and crystal clear highs from a compact, portable speaker."
        />
    </>
);

export const AdvancedFeatures: React.FC<{ product: Product }> = ({ product }) => {
    let features = null;
    let supportUrl = '#';
    switch(product.category) {
        case 'iPhone':
            features = <IphoneFeatures />;
            supportUrl = 'https://support.apple.com/';
            break;
        case 'Samsung':
            features = <SamsungFeatures />;
            supportUrl = 'https://www.samsung.com/ng/support/';
            break;
        case 'Audio':
            features = <AudioFeatures />;
            supportUrl = 'https://support.jbl.com/';
            break;
        default:
            return null;
    }

    return (
        <div className="mt-32">
            <h2 className="text-4xl font-bold text-center mb-12">{product.category} Advanced Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features}
            </div>
             {supportUrl !== '#' && (
                <div className="text-center mt-12">
                    <a 
                        href={supportUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                    >
                        <span>Visit Manufacturer Support</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    );
};