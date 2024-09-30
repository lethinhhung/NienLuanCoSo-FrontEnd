import { useState } from 'react';

const useConvertImage = () => {
    const [base64String, setBase64String] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const convertImage = (avatar) => {
        setLoading(true);
        setError(null);

        if (avatar instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64String(reader.result.replace('data:', '').replace(/^.+,/, ''));
                setLoading(false);
            };
            reader.onerror = (err) => {
                setError(err);
                setLoading(false);
            };
            reader.readAsDataURL(avatar);
        } else {
            setError(new Error('Invalid file type'));
            setLoading(false);
            console.log('error', error);
        }
        console.log(base64String);
    };

    return { base64String, convertImage, loading, error };
};

export default useConvertImage;
