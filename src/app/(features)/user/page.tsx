'use client'

import Loader from '@/common/components/Loader/Loader';
import { useGetData } from '@/common/hooks/services/methods/useGETData';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useState } from 'react';
import Tabs from './components/Tabs';
import { ShieldCheck } from 'lucide-react';
import Button from '@/common/components/atoms/Button';
import { signOut } from 'next-auth/react';
import EditProfileModal from './modals/EditProfileModal';
import { getDate } from '@/common/utils/date.utils';

type userData = {
  email: string;
  fullName?: string;
  username?: string;
  avatar?: string;
  isVerified?: boolean;
  birthDate?: Date;
  bio?: string;
  hostedTrips: string[];
  joinedTrips: string[];
  reviews: string[];
  socialMedias?: {
    platform: string;
    url: string
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export default function User() {

  const { data: userSessionData } = useSession()

  const { data: userData, loading, refetch } = useGetData<userData>(`/api/users/getUser?userId=${userSessionData?.user?._id}`)

  const avatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYGOfAM7k__YptCpeYfcEsc4UmbBm0I-QTEVbWrTNhv7U_4pKvg4vdy-znUth4KMbEmEaePCrlHjwr3J6ZN_7uHacRnxUNPMk6M9dxy-No1JdVc32JnPMcdismFyMrW7WBqXlrU8H4GS7b5CBzAMu4zk9WRrWqeq8QpsqJgak_Zht7qkI19-B7zXAbs9JZ6QPIQiSQ_oSw2jZMpiWn_UWNx5dELc6Qb84ePEUoAOganCkpzc2WAScXwjd-kIDIGejbtx6sEforLAc'

  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  
  if (loading) {
    return <Loader />
  }

  return (
    <div className="relative flex size-full flex-col ">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col flex-1">
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div className="flex gap-4">
                  <Image
                    src={userData?.avatar || avatar}
                    className={'aspect-square bg-cover rounded-full min-h-32 w-32'}
                    width={32}
                    height={32}
                    unoptimized
                    alt='Profile Picture'
                  />
                  <div className="flex flex-col justify-center">
                    <p className="flex items-center gap-2 text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em]">
                      <span>{userData?.fullName}</span>
                      {userData?.isVerified && <ShieldCheck className="w-5 h-5 text-green-700" strokeWidth={2} />}
                    </p>
                    <p className="text-[#6a7581] text-base font-normal leading-normal">Joined on {getDate(userData?.createdAt.toString() || "")}</p>
                    <p className="text-[#6a7581] text-base font-normal leading-normal">5 reviews </p>
                  </div>
                </div>
                <div className='gap-2 flex flex-col'>
                <Button
                  className="bg-secondary text-white rounded-xl" onClick={() => setModalOpen(true)}>
                  Edit profile
                  </Button>
                  <Button className='border-solid rounded-xl border-2 border-secondary' onClick={() => signOut()}>
                    Logout
                  </Button>
                  </div>
              </div>
            </div>
            <Tabs userData={userData || {}} />
            <EditProfileModal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)} userData={userData || {}} userId={userSessionData?.user?._id || ''}
              onSuccess={refetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
