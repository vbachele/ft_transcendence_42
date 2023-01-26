import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { SelectProps } from 'antd/es/select';
import './searchBox.css'

const SearchBox: React.FC = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

  return (
    <Input.Search onInput={handleSearchChange} style={{width: '80%', paddingBottom: '16px'}} size="large" placeholder="Search" enterButton />
  );
};

export default SearchBox;
