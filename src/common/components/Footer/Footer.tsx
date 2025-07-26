import React from 'react'
import { FooterOptions } from './Footer.constant'
import Link from 'next/link'

export default function Footer()  {
    return (
        <footer className="flex justify-center border-t-[1px] border-border">
            <div className="flex flex-1 flex-col">
                <div className="flex flex-col gap-6 px-5 py-8 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-20 ">
                        {FooterOptions.map((item) => 
                            <Link className="text-sm font-normal leading-normal" key={item.name} href={`#${item.sendTo}`}>{item.name}</Link>
                        )}   
                    </div>
                    <p className="text-sm font-normal leading-normal">@2025 NomadNexus. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

