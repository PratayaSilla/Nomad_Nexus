import React from 'react'
import { Star, ThumbsUp, ThumbsDown } from 'lucide-react'


const TripReviews = () => {
    return (
        <div>
            {/* Reviews Section */}
            <section className="py-5">
                <h2 className="text-text-primary text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">Reviews</h2>
                <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-text-primary text-4xl font-black leading-tight tracking-[-0.033em]">4.8</p>
                        <div className="flex gap-0.5">
                            {[...Array(4)].map((_, i) => (
                                <Star key={`filled-${i}`} size={18} className="text-[#f4c653] fill-[#f4c653]" />
                            ))}
                            <Star size={18} className="text-[#f4c653]" />
                        </div>
                        <p className="text-text-primary text-base font-normal leading-normal">25 reviews</p>
                    </div>
                    <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
                        {[
                            { rating: 5, percentage: 70 },
                            { rating: 4, percentage: 20 },
                            { rating: 3, percentage: 5 },
                            { rating: 2, percentage: 3 },
                            { rating: 1, percentage: 2 }
                        ].map((item, index) => (
                            <div key={index} className="contents">
                                <p className="text-text-primary text-sm font-normal leading-normal">{item.rating}</p>
                                <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#675832]">
                                    <div className="rounded-full bg-[#f4c653]" style={{ width: `${item.percentage}%` }} />
                                </div>
                                <p className="text-[#caba91] text-sm font-normal leading-normal text-right">{item.percentage}%</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review Cards */}
                <div className="flex flex-col gap-8 overflow-x-hidden  p-4">
                    {[
                        {
                            name: "Sophia Bennett",
                            date: "May 15, 2023",
                            rating: 5,
                            content: "This trip was an absolute dream! Olivia was an amazing host, and the Italian Coast is even more beautiful in person. I made some great friends and have memories that will last a lifetime.",
                            likes: 12,
                            dislikes: 2,
                            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_FUFdWqwTEH8NxG6q3n7tU91VmfwXpWZu70508Ok2acs9Qajgi44NI5-jvM-jMP_9WS01ouxNlscgxtOafu7yHjYCjyx25oH4XNbUCFIMkPYOAk89rmhlGwHaoL-WBEehdwvXE80v-OUanVaBTltBeuGxKA5HG7e8iO687Gcn7NL83F3b45zbCechq0xPmd8PNO-pCnpbMGpmyU5FMO791Fdkb5wvZ9Hkt1zH9k8h5JtfhxRc4YLGKH__l8WX1G7wb8bc3i4iuAJh"
                        },
                        {
                            name: "Ethan Walker",
                            date: "April 22, 2023",
                            rating: 4,
                            content: "I had a fantastic time exploring the Italian Coast with Olivia. The itinerary was well-planned, and the accommodations were lovely. The only minor issue was a slight delay on one of the tours, but Olivia handled it professionally.",
                            likes: 8,
                            dislikes: 1,
                            avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuClfe6mLRI-EhDyKOIQd_mBZNchhXCG0bjqfwt8buPVdUxBSFiEDDi0iqxQijqD4GGtnzZ3odlX4soEk-Dm_hSUTwC_1nbEl_SrMLF464ozzRKERpWf-fmJj4IVHOhvdno-7KKAI20Qd7xrROX762uro3-2FbgiOCHNuCzR48pzawPo6vSXDyAheH_CNVziUZdwx6IGJk3Dyn-NDccnw0aLNF0mjWA5f-KspJBijWm84XKQ1lZV6zjcEY5vvfgOCSefmZtrq9Lf6Vot"
                        }
                    ].map((review, index) => (
                        <div key={index} className="flex flex-col gap-3 ">
                            <div className="flex items-center gap-3">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                                    style={{ backgroundImage: `url("${review.avatar}")` }}
                                />
                                <div className="flex-1">
                                    <p className="text-text-primary text-base font-medium leading-normal">{review.name}</p>
                                    <p className="text-[#caba91] text-sm font-normal leading-normal">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={`review-${index}-star-${i}`}
                                        size={20}
                                        className={i < review.rating ? "text-[#f4c653] fill-[#f4c653]" : "text-[#8d7844]"}
                                    />
                                ))}
                            </div>
                            <p className="text-text-primary text-base font-normal leading-normal">{review.content}</p>
                            <div className="flex gap-9 text-[#caba91]">
                                <button className="flex items-center gap-2 hover:text-text-primary">
                                    <ThumbsUp size={20} />
                                    <span>{review.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 hover:text-text-primary">
                                    <ThumbsDown size={20} />
                                    <span>{review.dislikes}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default TripReviews