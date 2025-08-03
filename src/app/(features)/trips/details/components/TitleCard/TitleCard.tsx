import React from 'react'
import { Users, User, Calendar } from 'lucide-react'
import { Trip } from '../../[tripId]/page'
import Image from 'next/image'


type Props = {
    trip: Trip
}

const TitleCard = ({ trip }: Props) => {

    const getDuration = () => {
        if (!trip.startDate || !trip.endDate) return '';
        const start = new Date(trip.startDate);
        const end = new Date(trip.endDate);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? `${diff} days · ${diff - 1} nights` : '';
      };

    const spotsLeft = trip.maxCapacity ? trip.maxCapacity - (trip.joinedUsers?.length || 0) : null;
      
    return (
        <div>
            <div className="gap-3 px-4 pb-4">
                <div className="flex min-w-72 flex-col gap-3">
                    <h1 className="text-text-primary text-4xl font-bold leading-tight">{trip.title}</h1>
                    <p className="text-text-primary text-sm font-normal leading-normal flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <User size={16} /> Hosted by {trip.host},
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={16} /> {getDuration()}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={16} /> {spotsLeft} spots left
                        </span>
                    </p>
                </div>
            </div>
            <div className="h-[400px] relative ">
                <Image
                    src={trip?.previewImages?.[0] || ""}
                    alt="Trip Cover Image"
                    unoptimized
                    width={100}
                    height={100}
                    className="object-cover w-full h-full rounded-xl"
                />
            </div>
        </div>
    )
}

export default TitleCard