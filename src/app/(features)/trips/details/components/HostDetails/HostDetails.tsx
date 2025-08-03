import Button from '@/common/components/atoms/Button';
import React from 'react'


type Props = {
    host : string;
}

const HostDetails = ({ host } : Props) => {
    return (
        <section className="py-5">
            <h2 className="text-text-primary  text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">Meet your host, {host}</h2>
            <div className="flex p-4">
                <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <div className="flex gap-4">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDa8hu9HqLYmjX_Xs_JnWtiyJhbC_DQA_cxe4MZG1Ogo79xqh-Ek4nA5uAVOy9V8vbnFOF0NUG1waLf8d8nEqSuMlXbXzUKBT9JB3SNBoEUiI0oQMvUMhNK1jQyntcO0hcREXCIIKfy7Rn0VlhRE4UzygZcZ38R7DNCNLV47Q0taceuICBOJw9e-3rFVm_d0-kxMAklQzACnCno2okL0MJw94C2lvJKCZiuJqY3phPuBfC_117eUzK8go-2Eicuund8xjuT2KoXwlsB")' }}
                        />
                        <div className="flex flex-col justify-center">
                            <p className="text-text-primary  text-[22px] font-bold leading-tight tracking-[-0.015em]">Olivia Carter</p>
                            <p className="text-text-secondary text-base font-normal leading-normal">Local guide and travel enthusiast</p>
                        </div>
                    </div>
                    <Button className='bg-primary text-text-primary rounded-md font-bold'>
                        View profile
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default HostDetails