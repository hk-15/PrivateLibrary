import React from 'react';
import Select from 'react-select';

type option = {
    label: string,
    value: string
}

type Props = {
    dropdownItems: string[] | undefined,
    placeholderText: string,
    getSelected: (string: string) => void,
}

export const SearchableDropdown: React.FC<Props> = ({ dropdownItems, placeholderText, getSelected }) => {

    return (
        <div>
            <Select<option>
                placeholder={placeholderText}
                onChange={option => option ? getSelected(option.value) : getSelected("")}
                options={dropdownItems?.map(item => ({ label: item, value: item }))}
            />
        </div>
    )
}