'use client'


import React from 'react';
import  ExploreTrips  from './components/ExploreTrips/ExploreTrips'
import ExploreStories from './components/ExploreStories/ExploreStories';
import Button from '../../../atoms/Button'
import { useRouter } from 'next/navigation';


export default function Hero() {

    const router = useRouter()
    
    return (
        <div className='px-8 md:px-48'>
            <div className="py-8">
                <div
                    className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 text-center rounded-lg"
                    style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(\"https://lh3.googleusercontent.com/aida-public/AB6AXuCBOHnfpURbJJlwgbOMLt9Lgh9XhU0sht5PQteqhVrvo3KgxTbb7ZWgLmIhHF8y4oGycHVMosAk4FwV1azaObg2yZXRq6yKnwBU7O8wSYqMAbintFVziS1ukA4XoNrbVbnmj7qltPO2DCQtsA5xvdc_dpBUK0OljF1RB2bSRGdxsiMZknuCNdanHVaelEojNtrfyr5DK3DjhBdW52tvVmpBdMq_DLzJNnlTsqraNIH9KMWGoVXX3eiuvLyCeIBDT5O34Zst4x3mwE0\")' }}>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-3xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                            Find your next travel group
                        </h1>
                        <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base">
                            Discover unique destinations and experiences tailored for travellers
                        </h2>
                    </div>
                    
                </div>
            </div>
            <ExploreTrips />
            <ExploreStories/>
            <div className="flex flex-col justify-center items-center gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
                <div className="  text-secondary flex flex-col gap-2 text-center">
                    <h1 className="tracking-light text-[32px] font-bold leading-tight max-w-[720px]">
                        Ready to explore?
                    </h1>
                    <p className="text-base font-normal leading-normal max-w-[720px]">
                        Join a trip or host your own adventure today!
                    </p>
                </div>
                <div className="flex flex-1 justify-center">
                    <div className="flex justify-center">
                        <div className="flex flex-1 gap-3 flex-wrap max-w-[480px] justify-center">
                            <Button className="min-w-[84px] max-w-[480px] font-bold rounded-lg h-10 px-4 bg-primary text-secondary text-sm" onClick={() => router.push('/auth?type=nomad')}>
                                Join a Trip
                            </Button>
                            <Button className="min-w-[84px] max-w-[480px] font-bold rounded-lg h-10 px-4 bg-secondary text-background text-sm" onClick={() => router.push('/auth?type=host')}>
                                Host a Trip
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

