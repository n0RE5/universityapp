import React from 'react'
import ReactSelect from 'react-select'
import { IUniversityGroup } from '../../types/migaik';

interface SelectProps {
    currentGroupId: string
    currentGroupName: string
    groups: IUniversityGroup[]
    onChange: (arg: string) => void
}

const Select: React.FC<SelectProps> = ({ groups, onChange, currentGroupId, currentGroupName }) => {
    const groupsSelectOptions = groups.map(group => ({
        value: group.id.toString(),
        label: group.groupName
    }))

    return (
        <ReactSelect
            classNamePrefix="group-select"
            placeholder='Поиск' 
            onChange={(e) => onChange(e?.value as string)}
            options={groupsSelectOptions}
            noOptionsMessage={() => 'Группа не найдена'}
            className='w-full h-full'
            value={{
                value: currentGroupId,
                label: currentGroupName
            }}
        />
    );
}

export default Select;