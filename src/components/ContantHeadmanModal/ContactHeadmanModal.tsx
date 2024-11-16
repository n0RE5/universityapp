import React, { useState } from 'react'
import Modal from '../UI/Modal/Modal';
import { useFetching } from '../../hooks/useFetching';
import MigaikService from '../../api/services/MigaikService';
import { AxiosError } from 'axios';
import { ErrorResponse } from '../../types/migaik';
import { useShowPopup } from '@vkruglikov/react-telegram-web-app';
import { getErrorMessage } from '../../utils/errorCodes';
import Box from '../UI/Box/Box';

interface ContactHeadmanModalProps {
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ContactHeadmanModal: React.FC<ContactHeadmanModalProps> = ({ setIsActive, isActive }) => {
    const showPopup = useShowPopup()
    const [message, setMessage] = useState<string>('')

    const [handleSend] = useFetching(async () => {
        await MigaikService.contactHeadman(message)
        showPopup({
            title: "Успешно",
            message: "Сообщение успешно отправлено!",
            buttons: [
              {
                text: "Ок",
              },
            ],
        }).then(() => {
            setIsActive(false)
        })
    }, (e) => {
        const errorMessage = getErrorMessage((e as AxiosError<ErrorResponse>).response?.data.error_id)
        showPopup({
            title: "Ошибка",
            message: errorMessage,
            buttons: [
              {
                text: "Ок",
              },
            ],
        });
    })

    return (
        <Modal isActive={isActive} setIsActive={setIsActive} title={'Связь со старостой'}>
            <div className='p-3'>
                <Box className='shadow-[0px_0px_5px_#EFEFEF] bg-[#FEFEFE] dark:shadow-none dark:bg-[#111]'>
                    <textarea 
                        placeholder='Введите сообщение...'
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}  
                        cols={12} 
                        rows={4}
                        maxLength={1024} 
                        className='bg-transparent resize-none w-full h-full outline-none' 
                    />
                </Box>
                <button disabled={!message} onClick={handleSend} className='bg-[#333] hover:bg-[#444] focus:bg-[#444] transition text-white w-full font-bold text-[13px] mt-6 dark:bg-[#FEFEFE] dark:text-black dark:hover:bg-[#E0E0E0] dark:focus:bg-[#E0E0E0] rounded-full text-center py-3'>
                    Отправить
                </button>
            </div>
        </Modal>
    );
}

export default ContactHeadmanModal;