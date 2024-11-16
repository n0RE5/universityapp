import { useState } from 'react';
import ContactHeadmanModal from '../../components/ContantHeadmanModal/ContactHeadmanModal';
import PageTitle from '../../components/UI/PageTitle/PageTitle';

const ContactsPage = () => {
    const [isActive, setIsActive] = useState<boolean>(false)

    return (
        <>
            <PageTitle>
                Контакты
            </PageTitle>
            <button onClick={() => setIsActive(prev => !prev)} className='bg-[#333] hover:bg-[#444] focus:bg-[#444] transition text-white w-full font-bold text-[13px] dark:bg-[#FEFEFE] dark:text-black dark:hover:bg-[#E0E0E0] dark:focus:bg-[#E0E0E0] rounded-full text-center py-4'>
                Староста
            </button>
            <ContactHeadmanModal isActive={isActive} setIsActive={setIsActive} />
        </>
    );
}

export default ContactsPage;