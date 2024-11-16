import React, { useEffect, useState } from 'react'
import Modal from '../UI/Modal/Modal';
import { useFetching } from '../../hooks/useFetching';
import MigaikService from '../../api/services/MigaikService';
import { AxiosError } from 'axios';
import { ErrorResponse, IUniversityGroup } from '../../types/migaik';
import { useShowPopup } from '@vkruglikov/react-telegram-web-app';
import { getErrorMessage } from '../../utils/errorCodes';
import GroupSelect from '../GroupSelect/GroupSelect';

interface JoinGroupModalProps {
    isActive: boolean
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ setIsActive, isActive }) => {
    const showPopup = useShowPopup()
    const [selectedGroupId, setSelectedGroupId] = useState<string>('')
    const [selectedGroupName, setSelectedGroupName] = useState<string>('')
    const [groups, setGroups] = useState<IUniversityGroup[]>([])

    const handleChange = (id: string) => {
        setSelectedGroupId(id)
        setSelectedGroupName(groups.find(group => group.id === id)?.name || '')
    }

    const [handleSend] = useFetching(async () => {
        if (!selectedGroupId) {
            return
        }
        await MigaikService.joinGroup(selectedGroupId)
        showPopup({
            title: "Успешно",
            message: "Ваша заявка успешно отправлена!",
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

    const [fetchGroups] = useFetching(async() => {
        const response = await MigaikService.getGroups()
        setGroups(response.data)
    })

    useEffect(() => {
        fetchGroups()
    }, [])

    return (
        <Modal isActive={isActive} setIsActive={setIsActive} title={'Вступить в группу'}>
            <div className='p-3'>
                <div className='border rounded-full'>
                    <GroupSelect 
                        currentGroupId={''} 
                        currentGroupName={selectedGroupName || 'Выберите группу'} 
                        onChange={handleChange}
                        groups={groups}
                    />
                </div>
                <button disabled={!selectedGroupId} onClick={handleSend} className='bg-[#333] hover:bg-[#444] focus:bg-[#444] transition text-white w-full font-bold text-[13px] mt-6 dark:bg-[#FEFEFE] dark:text-black dark:hover:bg-[#E0E0E0] dark:focus:bg-[#E0E0E0] rounded-full text-center py-3'>
                    Вступить
                </button>
            </div>
        </Modal>
    );
}

export default JoinGroupModal;