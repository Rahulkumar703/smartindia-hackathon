
import { FiArrowLeft, FiArrowRight, FiPlus } from 'react-icons/fi'
import { ImSpinner } from 'react-icons/im'

const MultiStepForm = ({ step, setStep, form, setForm, loading }) => {

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    switch (step) {
        case 1:
            return <>
                <div className={`w-full flex flex-col-reverse gap-1`}>
                    <input
                        className='peer rounded-md backdrop-blur-md text-text-500 py-2 px-2 border resize-none'
                        name="name"
                        id="name"
                        type="text"
                        autoComplete='name'
                        disabled={loading}
                        value={form.name}
                        onChange={handleChange}
                    />
                    <label htmlFor='name' className='text-text-300 peer-focus:text-primary-500 '>
                        Orgnisation Name
                    </label>
                </div>
                <div className={`w-full flex flex-col-reverse gap-1`}>
                    <input
                        className='peer rounded-md backdrop-blur-md text-text-500 py-2 px-2 border resize-none'
                        name="email"
                        type="email"
                        id="email"
                        autoComplete='email'
                        disabled={loading}
                        value={form.email}
                        onChange={handleChange}
                    />
                    <label htmlFor='email' className='text-text-300 peer-focus:text-primary-500 '>
                        Orgnisation Email
                    </label>
                </div>

                <div className={`w-full flex flex-col-reverse gap-1`}>
                    <textarea
                        className='peer rounded-md backdrop-blur-md text-text-500 py-2 px-2 border resize-none'
                        name="address"
                        id="address"
                        cols="30"
                        rows="5"
                        autoComplete='address'
                        disabled={loading}
                        value={form.address}
                        onChange={handleChange}
                    />
                    <label htmlFor='address' className='text-text-300 peer-focus:text-primary-500 '>
                        Orgnisation Address
                    </label>
                </div>

                <button type='button' onClick={() => { setStep(2) }} className='flex items-center gap-2 justify-center bg-primary backdrop-blur-md p-2 rounded-md hover:bg-primary-100 active:bg-primary-500 focus:bg-primary-100 transition-all text-white'>
                    Next
                    < FiArrowRight />
                </button>
            </>
        case 2:
            return (
                <>
                    <div className={`w-full flex flex-col-reverse gap-1`}>
                        <input
                            className='peer rounded-md backdrop-blur-md text-text-500 py-2 px-2 border resize-none'
                            name="phone"
                            id="phone"
                            type="number"
                            autoFocus={true}
                            autoComplete='phone'
                            disabled={loading}
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <label htmlFor='phone' className='text-text-300 peer-focus:text-primary-500 '>
                            Mobile no
                        </label>
                    </div>
                    <div className="flex gap-2">
                        <div className={`w-full flex flex-col-reverse gap-1`}>
                            <input
                                className='peer rounded-md backdrop-blur-md text-text-500 py-2 px-2 border resize-none'
                                name="password"
                                id="password"
                                type='password'
                                autoFocus={true}
                                autoComplete='password'
                                disabled={loading}
                                value={form.password}
                                onChange={handleChange}
                            />
                            <label htmlFor='email' className='text-text-300 peer-focus:text-primary-500 '>
                                Password
                            </label>
                        </div>
                        <div className={`w-full flex flex-col-reverse gap-1`}>
                            <input
                                className='peer rounded-md backdrop-blur-md text-text-500 py-2 px-2 border resize-none'
                                name="confirmPassword"
                                type='password'
                                id="confirmPassword"
                                autoFocus={true}
                                autoComplete='confirmPassword'
                                disabled={loading}
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor='confirmPassword' className='text-text-300 peer-focus:text-primary-500 '>
                                Confirm Password
                            </label>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <button type='button' onClick={() => { setStep(1) }} className='flex flex-1 items-center gap-2 justify-center bg-secondary backdrop-blur-md p-2 rounded-md hover:bg-primary-100 active:bg-primary-500 focus:bg-primary-100 transition-all text-white'>
                            < FiArrowLeft />
                            Prev
                        </button>
                        <button type='submit' className='flex flex-1 items-center gap-2 justify-center bg-primary backdrop-blur-md p-2 rounded-md hover:bg-primary-100 active:bg-primary-500 focus:bg-primary-100 transition-all text-white'>
                            {
                                loading ?
                                    <>
                                        < ImSpinner />
                                        Please wait...
                                    </>
                                    : <>
                                        < FiPlus />
                                        Register
                                    </>
                            }
                        </button>
                    </div>
                </>
            )

    }
}

export default MultiStepForm;