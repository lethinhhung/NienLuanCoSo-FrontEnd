import { useEffect, useState } from 'react';

import SearchBarLarge from './SearchBarLarge';
import SearchBarSmall from './SearchBarSmall';
import { useWindowDimensions, useDebounce } from '~/hooks';

function SearchBar({ onSearch, onTagsChange }) {
    const { width } = useWindowDimensions();

    const debounced = useDebounce(width, 500);

    const [searchBar, setSearchBar] = useState(<SearchBarLarge onSearch={onSearch} />);

    useEffect(() => {
        if (debounced >= 700) {
            setSearchBar(<SearchBarLarge onSearch={onSearch} onTagsChange={onTagsChange} />);
        } else {
            setSearchBar(<SearchBarSmall onSearch={onSearch} onTagsChange={onTagsChange} />);
        }
    }, [debounced, onSearch, onTagsChange]);

    return searchBar;
}

export default SearchBar;
