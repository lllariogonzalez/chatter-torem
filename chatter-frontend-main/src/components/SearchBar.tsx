import { BiSearchAlt } from 'react-icons/bi';
import { SearchBarProps } from '../types/chat';
import React, { useState } from 'react';

function SearchBar(searchBarProps: SearchBarProps) {
  const { chatId } = searchBarProps;

  const [filter, setFilter] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (chatId === '') {
      setFilter('');
    } else {
      setFilter(e.target.value);
    }
  };

  return (
    <div id="searchBar" className="d-flex flex-column px-4 mt-3 pb-3">
      <div className="searchBar w-100 py-1 px-3 d-flex flex-row gap-2 align-items-center">
        <BiSearchAlt className="fs-5 text-chatter-black opacity-25" />
        <input
          type="text"
          className="search py-1"
          value={filter}
          placeholder="Buscar en los chats"
          onChange={handleInputChange}
        />
      </div>

      <div className="search-result">
        <div
          className={
            filter !== '' ? 'results text-chatter-black scale1' : 'results text-chatter-black'
          }
        >
          ¡ Aquí van los resultados !
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
