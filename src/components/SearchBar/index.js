import { useEffect, useState } from 'react';

import SearchBarLarge from './SearchBarLarge';
import SearchBarSmall from './SearchBarSmall';
import { useWindowDimensions, useDebounce } from '~/hooks';

function SearchBar(container) {
    const { width } = useWindowDimensions();

    const debounced = useDebounce(width, 500);

    const [searchBar, setSearchBar] = useState(<SearchBarLarge />);

    useEffect(() => {
        if (debounced >= 700) {
            setSearchBar(<SearchBarLarge />);
        } else {
            setSearchBar(<SearchBarSmall />);
        }
    }, [debounced]);

    return searchBar;
}

export default SearchBar;
