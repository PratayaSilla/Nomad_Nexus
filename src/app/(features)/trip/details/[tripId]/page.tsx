'use client'

import React from 'react';
import { useGetData } from '@/common/hooks/services/methods/useGETData';
import TitleCard from '../components/TitleCard/TitleCard';
import TripDetails from '../components/TripDetails/TripDetails';
import HostDetails from '../components/HostDetails/HostDetails';
import TripReviews from '../components/TripReviews/TripReviews';
import TripFAQs from '../components/FAQs/TripFAQs';
import TripActions from '../components/TripActions/TripActions';

export interface Trip {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  address: string;
  host: string;
  joinedUsers: string[];
  isCompleted: boolean;
  status: 'draft' | 'published';
  maxCapacity?: number;
  previewImages?: string[];
  postTripImages?: string[];
  tags?: string[];
  price?: number;
  included?: string[];
  notIncluded?: string[];
  cancellationPolicy?: string;
  faqs?: { question: string; answer: string }[];
  reviews: { user: string; rating: number; comment: string; createdAt: string }[];
  comments: { user: string; message: string; createdAt: string }[];
  createdAt: string;
  updatedAt: string;
}

export default function TripPage({ params }: { params: Promise<{ tripId: string }> }) {

  const { tripId } = React.use(params) ;

  const { data: trip, loading } = useGetData<Trip>(`/api/trips/${tripId}`);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background ">
        <span className="text-text-primary text-xl">Loading trip details...</span>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background ">
        <span className="text-text-primary text-xl">Trip not found or failed to load.</span>
      </div>
    );
  }

  

  

  return (
    <div className="bg-background overflow-x-hidden ">
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="flex flex-col flex-1">
            <div className="flex flex-wrap gap-2 px-5 pt-4 pb-2">
              <a className="text-text-primary text-base font-medium leading-normal hover:text-white" href="#">Trips</a>
              <span className="text-text-primary text-base font-medium leading-normal">/</span>
              <span className="text-text-secondary text-base font-medium leading-normal">{trip.title}</span>
            </div>
            <TitleCard trip={trip}/>
            <TripDetails  
                description={trip.description} 
                included={trip?.included} 
                notIncluded={trip?.notIncluded}
                startDate={trip?.startDate} 
                endDate={trip?.endDate}
            />
            <HostDetails host={trip.host}/>
            <TripReviews/>
            <div className='flex x'>
            <TripFAQs/>
            <TripActions/> 
            </div>           
          </div>
        </div>
      </div>
    </div>
  );
};
