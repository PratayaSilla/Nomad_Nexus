'use client'

import React, { useState } from 'react'
import Button from '../atoms/Button'
import { NavbarOptions } from './navbar.constants'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { CircleUserRound, Map, Menu, X } from 'lucide-react'

export default function Navbar() {
    const router = useRouter()
    const { data, status } = useSession()
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className='flex justify-between py-3 border-b-[1px] border-border px-6 md:px-10 items-center relative'>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
                    <Map className='text-text-primary' size={28} />
                    <h2 className="text-text-primary text-lg font-bold leading-tight tracking-[-0.015em]">NomadNexus</h2>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-16">
                {NavbarOptions.map(
                    (item) => <Link key={item.name[0]} className="text-[#0e171b] text-sm font-medium leading-normal" href={item.sendTo}>{item.name}</Link>
                )}
            </div>

            <div className="hidden md:flex gap-8 items-center">
                <div className="flex gap-3 max-w-[480px]">
                    <Button className="font-bold rounded-lg h-10 px-4 bg-primary text-secondary text-sm"
                        onClick={() => router.push('/auth?type=nomad')}>
                        Join a Trip
                    </Button>
                    <Button className="font-bold rounded-lg h-10 px-4 bg-secondary text-background text-sm"
                        onClick={() => router.push('/auth?type=host')}
                    >
                        Host a Trip
                    </Button>
                </div>
                <div className="cursor-pointer">
                    {status === 'unauthenticated' && (
                        <CircleUserRound
                            size={32}
                            className='text-text-primary'
                            onClick={() => router.push('/auth?type=nomad')}
                        />
                    )}
                    {status === 'authenticated' && (
                        data?.user?.image ? (
                            <Image src={data.user.image} height={32} width={32} alt='User Profile' onClick={() => router.push('/user')} />
                        ) : (
                            <CircleUserRound
                                size={32}
                                className='text-text-primary'
                                onClick={() => router.push('/user')}
                            />
                        )
                    )}
                </div>
            </div>

            <div className="md:hidden flex items-center cursor-pointer">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {menuOpen && (
                <div className="absolute top-12 left-0 w-full bg-background shadow-lg z-50 flex flex-col gap-4 px-6 py-4">
                    {NavbarOptions.map((item) => (
                        <Link key={item.name[0]} href={item.sendTo} onClick={() => setMenuOpen(false)} className="text-[#0e171b] text-sm font-medium">
                            {item.name}
                        </Link>
                    ))}
                    <div className='flex justify-around'>
                        <div className='flex flex-col gap-2' >
                            <Button className="font-bold rounded-lg h-10 px-4 bg-primary text-secondary text-sm"
                                onClick={() => { router.push('/auth?type=nomad'); setMenuOpen(false); }}>
                                Join a Trip
                            </Button>
                            <Button className="font-bold rounded-lg h-10 px-4 bg-secondary text-background text-sm"
                                onClick={() => { router.push('/auth?type=host'); setMenuOpen(false); }}>
                                Host a Trip
                            </Button>
                        </div>
                        <div className="cursor-pointer mt-2">
                            {status === 'unauthenticated' && (
                                <div className='flex items-center'>
                                <CircleUserRound
                                    size={32}
                                    className='text-text-primary'
                                    onClick={() => { router.push('/auth?type=nomad'); setMenuOpen(false); }}
                                    />
                                    Login
                                    </div>
                            )}
                            {status === 'authenticated' && (
                                data?.user?.image ? (
                                    <Image src={data.user.image} height={32} width={32} alt='User Profile' onClick={() => { router.push('/user'); setMenuOpen(false); }} />
                                ) : (
                                    <CircleUserRound
                                        size={32}
                                        className='text-text-primary'
                                        onClick={() => { router.push('/user'); setMenuOpen(false); }}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
