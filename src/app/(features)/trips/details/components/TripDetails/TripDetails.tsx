import React from 'react'
import { CircleCheckBig, CircleX, MapPin, Flag } from 'lucide-react'


type Props = {
    included?: string[];
    notIncluded?: string[];
    description: string;
    startDate: string;
    endDate: string
}

const TripDetails = ({ description, included, notIncluded, startDate, endDate }: Props) => {

    const formatDate = (date: string) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        return isNaN(d.getTime()) ? date : d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).replace(/^(\d{1,2})/, '$1' + getDaySuffix(d.getDate()));
    };

    const getDaySuffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };



    return (
        <>
            <section className="py-5">
                <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">About this trip</h2>
                <p className="text-text-primary  text-base font-normal leading-normal pb-3 pt-1 px-4">
                    {description}
                </p>
            </section>
            <div className='flex py-2 justify-center gap-[16rem]'>
                <section>
                    <h2 className="text-text-primary  text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
                        What&apos;s included
                    </h2>
                    <div className="px-4">
                        {included?.map((item, index) => (
                            <label key={index} className="flex gap-x-3 py-3 flex-row items-center">
                                <CircleCheckBig size={16} className="text-green-600 font-extrabold" strokeWidth={3} />
                                <p className="text-text-primary  text-base font-normal leading-normal">{item}</p>
                            </label>
                        ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-text-primary  text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
                        What&apos;s not included ?
                    </h2>
                    <div className="px-4">
                        {notIncluded?.map((item, index) => (
                            <label key={index} className="flex gap-x-3 py-3 flex-row items-center">
                                <CircleX size={16} className="text-red-500 font-extrabold" strokeWidth={3} />
                                <p className="text-text-primary  text-base font-normal leading-normal">{item}</p>
                            </label>
                        ))}
                    </div>
                </section>
            </div>
            <section className="rounded-2xl border-border border-solid border-2 p-6 shadow-md flex gap-16">
                <div className="flex items-center gap-4">
                    <MapPin className="text-green-600 w-6 h-6" />
                    <div>
                        <h2 className="text-text-primary text-xl font-bold">Starts on</h2>
                        <p className="text-text-secondary text-base">{formatDate(startDate)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Flag className="text-red-600 w-6 h-6" />
                    <div>
                        <h2 className="text-text-primary text-xl font-bold">Ends on</h2>
                        <p className="text-text-secondary text-base">{formatDate(endDate)}</p>
                    </div>
                </div>
            </section>

        </>
    )
}

export default TripDetails