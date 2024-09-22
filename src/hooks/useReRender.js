import { useState, useEffect } from 'react';

import { useWindowDimensions } from '~/hooks';

function useReRender(value, delay) {
    const { width } = useWindowDimensions();
    const [renderKey, setRenderKey] = useState(0);

    useEffect(() => {
        setRenderKey((prevKey) => prevKey + 1);
    }, [width]);

    return renderKey;
}

export default useReRender;
