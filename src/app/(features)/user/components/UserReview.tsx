import React from 'react'

const UserReview = () => {
  return (
    <div className="flex flex-col gap-8 overflow-x-hidden  p-4">
      <div className="flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBJck_thnF7DmdGaGs9EVTyclchE7FXIPKf0rbi1-e1Nx24J221y4baeTw3lCIS9jf6TkZblO4jgUkJZlamjJzKFTMead7hniTw3WVv-_JqmtSvuTKa8CgoRwALFPPNxrAaZKf2IRAXiVNJU1s9Uj6QhYwS34ym18Ya-vMfxRSFfoNSpY17yqcTzWlmS9vApjuYgUGLkck2BPywkMRIyxdjegw0QLL8u1cg_OJdQkE13bTDSFgY-D5JMIE1VlboZ0Ds3LqHJby5Uqs")' }}
          ></div>
          <div className="flex-1">
            <p className="text-[#121416] text-base font-medium leading-normal">Ethan Harper</p>
            <p className="text-[#6a7581] text-sm font-normal leading-normal">May 2023</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#121416" viewBox="0 0 256 256">
              <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
            </svg>
          ))}
        </div>
        <p className="text-[#121416] text-base font-normal leading-normal">
          Sophia was an amazing host! She was very responsive and helpful throughout the entire process. The apartment was clean, comfortable, and in a great location. I
          would definitely recommend staying with Sophia.
        </p>
        <div className="flex gap-9 text-[#6a7581]">
          <button className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
            </svg>
            <p className="text-inherit">2</p>
          </button>
          <button className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 ">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgUpyehb-CWteinuxasXaR4vRYaOJbAiLIF9XB169QA-nE7hCbeF_5K7GRBH1NaHtWcXPMihfIxBI1gZUVuL9yZlHUBUwzEFKaUkhhqmPGj7OnRphv0LZHjHyGqUOMMQpGHECz4Wgm3_u3pQlLKzSq2fwnSXqtfsijofr1-5ewUt7E9gkCMJfIIi9ZNZkv9AVfmYKFjnhcWfuLFv5WnW4TquC8YAZo0WpYkmsfNa5l09-4-nx8MSOrXYZo3fLSrECnrOJf0MNPSmY")' }}
          ></div>
          <div className="flex-1">
            <p className="text-[#121416] text-base font-medium leading-normal">Olivia Bennett</p>
            <p className="text-[#6a7581] text-sm font-normal leading-normal">April 2023</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(4)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#121416" viewBox="0 0 256 256">
              <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path>
            </svg>
          ))}
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="#bec4ca" viewBox="0 0 256 256">
            <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z"></path>
          </svg>
        </div>
        <p className="text-[#121416] text-base font-normal leading-normal">
          Sophia&apos;s place was lovely and well-located. She was a great communicator and made sure we had everything we needed. The only minor issue was that the wifi was a
          bit slow at times.
        </p>
        <div className="flex gap-9 text-[#6a7581]">
          <button className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
            </svg>
            <p className="text-inherit">1</p>
          </button>
          <button className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserReview