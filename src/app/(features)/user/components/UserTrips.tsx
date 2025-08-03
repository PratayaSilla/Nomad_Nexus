import React from 'react'

const UserTrips = () => {
  return (
    <div>
      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Trips</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        <div className="flex flex-col gap-3 pb-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD7OUffpuvZPvg6DreF-5Sx4taJiZgKaac8jF_7tYFNu6Gpk9u2EbZP-syE4t59GzvTNBJdnmlpqAve6xzmpxzfbObTBC35qMFdmlSun0bUEvJ5JbQW5TJWTef7JYQRQPnPFHHpLvOs-RP3aXsclIR3IyCIYxE9O1ZIMci26GVYwrZCqyqMEpGrR4Askk_ZhEJuw6UtZY4ZQDUcQRcycsmY9gzsrZQQl8MKA0asVEvNExzSucol873YdfCi9Vh42brFP01R6IuRRrk")' }}
          ></div>
          <div>
            <p className="text-[#121416] text-base font-medium leading-normal">Solo Trip to Kyoto</p>
            <p className="text-[#6a7581] text-sm font-normal leading-normal">Kyoto, Japan</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKeqQhVlPSFe6cZqEkMBIIzNYzXBDVUnTF674wm17IJ4n0klxriuLkO3V3t4R8b3tmxfnmCV3mbDVqlYQ9rJi5Vda84HhZVcibew6m6XiBeRUlCnBJcHEQs0xr_DdOUkkmgEEGoPv7SXlHafXvztK91X9CmBHfbJ6V5zGZOS4nr-E26wBtgD4ZeeI8XqyNJcOZdQkUvMVfcxp2JqKrfO9uVx1YaIIPMXJywl-6OZgRPabuqgGSp5m7A5y6AS3fN7EmhSTLc4YeTxQ")' }}
          ></div>
          <div>
            <p className="text-[#121416] text-base font-medium leading-normal">Backpacking in the Alps</p>
            <p className="text-[#6a7581] text-sm font-normal leading-normal">Swiss Alps</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTrips