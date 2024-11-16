import React from 'react'
import PageTitle from '../PageTitle/PageTitle'

interface ModalProps {
    isActive: boolean,
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
    children?: React.ReactNode
    className?: string
    title: string
    onDone?: () => void
}

const Modal: React.FC<ModalProps> = ({ isActive, setIsActive, children, className, title, onDone }) => {
    return (
        <div className={`fixed top-0 right-0 left-0 bottom-0 dark:shadow-none ${isActive ? 'translate-y-[5px]' : 'translate-y-[120vh]'} transition-all `}>
            <div className={`bg-white pt-2 relative h-[100vh] dark:bg-[#222222] shadow-[0px_0px_5px_rgba(0_0_0_.25)] rounded-[40px] ${className}`}>
                <PageTitle>
                    {title}
                </PageTitle>
                {onDone
                    ?   <button className='absolute cursor-pointer bg-[#D01F36] rounded-full font-bold text-[11px] text-white py-1 transition px-4 right-0 top-0 mt-[23px] hover:bg-[#a72e3e] mr-4' onClick={onDone}>
                            Готово        
                        </button>
                    : <button className='absolute cursor-pointer right-0 top-0 mt-[24px] mr-7' onClick={() => setIsActive(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='fill-[#828282] dark:fill-white w-5 h-5' viewBox="0 0 72 72">
                            <path d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"></path>
                        </svg>          
                    </button>
                }

                {children}
            </div>
        </div>
    );
}

export default Modal;