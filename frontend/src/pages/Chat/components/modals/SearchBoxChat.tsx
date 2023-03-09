import React, { FormEventHandler, useState } from 'react';
import { Input } from 'antd';
import type { SelectProps } from 'antd/es/select';
import '../style.css'

interface ISearch {
  value: string;
  setValue: FormEventHandler<HTMLInputElement>;
}

const SearchBoxChat: React.FC<ISearch> = (search: ISearch) => {
  return (
    <Input.Search type="text" value={search.value} onInput={search.setValue} style={{width: '100%'}} size="large" placeholder="Search" enterButton />
  );
};

export default SearchBoxChat;