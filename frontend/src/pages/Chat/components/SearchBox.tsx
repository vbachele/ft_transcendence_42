import React, { FormEventHandler, useState } from 'react';
import { Input } from 'antd';
import type { SelectProps } from 'antd/es/select';
import './searchBox.css'

interface ISearch {
  value: string;
  setValue: FormEventHandler<HTMLInputElement>;
}

const SearchBox: React.FC<ISearch> = (search: ISearch) => {
  return (
    <Input.Search onInput={search.setValue} style={{width: '80%', paddingBottom: '16px'}} size="large" placeholder="Search" enterButton />
  );
};

export default SearchBox;
