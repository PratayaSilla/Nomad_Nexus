'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UserAbout from './UserAbout';
import UserReview from './UserReview';
import UserTrips from './UserTrips';

type Props = {
  userData : object
}

const Tabs = ({ userData }: Props) => {
  
  const tabs = [
    { label: 'Overview', component: <UserAbout userData={userData}/> },
    { label: 'Reviews', component: <UserReview /> },
    { label: 'Trips', component: <UserTrips /> },
  ];

  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="pb-3">
      <div className="relative flex border-b border-[#dde0e3] px-4 gap-8">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className="relative flex flex-col items-center justify-center pb-2 pt-4 cursor-pointer"
          >
            <p
              className={`text-sm font-bold tracking-[0.015em] transition-colors duration-300 ${
                activeTab === tab.label ? 'text-[#121416]' : 'text-[#6a7581]'
              }`}
            >
              {tab.label}
            </p>
            {activeTab === tab.label && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 h-[3px] w-full bg-[#121416]"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.label === activeTab)?.component}
      </div>
    </div>
  );
};

export default Tabs;
