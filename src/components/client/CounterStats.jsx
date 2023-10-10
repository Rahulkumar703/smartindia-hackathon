
import Link from 'next/link'
import { PiBuildingsBold } from 'react-icons/pi'

const CounterStats = () => {
    return (
        <section className="flex items-center justify-evenly max-w-6xl md:gap-6 mx-auto my-2 py-6 md:flex-row flex-col md:px-1 px-4 gap-y-14">
            <Link href={'/'} className='w-full flex flex-col gap-1 items-center shadow-md px-14 py-8 rounded-lg flex-1 font-bold hover:shadow-2xl transition-all -mt-8'>
                <PiBuildingsBold size={40} />
                <h4 className=' text-primary text-2xl'>0<span>+</span></h4>
                <p className='text-lg'>Registered Students</p>
            </Link>
            <Link href={'/'} className='w-full flex flex-col gap-1 items-center shadow-md px-14 py-8 rounded-lg flex-1 font-bold hover:shadow-2xl transition-all -mt-8'>
                <PiBuildingsBold size={40} />
                <h4 className=' text-primary text-2xl'>0<span>+</span></h4>
                <p className='text-lg'>Registered Orgnisation</p>
            </Link>
        </section>
    )
}

export default CounterStats