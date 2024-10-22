import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './ImageUpload.module.scss';

function ImageUpload({ onFileSelect }) {
    const cx = classNames.bind(styles);
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            onFileSelect(selectedFile);
        } else {
            console.error('No file selected or file is not valid.');
        }
    };

    return (
        <div>
            <h3 className={cx('title')}>Upload an image</h3>
            {imagePreview && <img width={'100px'} src={imagePreview} alt="Preview" />}
            <form>
                <input type="file" alt="upload" accept="image/png, image/gif, image/jpeg" onChange={handleFileChange} />
            </form>
        </div>
    );
}

export default ImageUpload;
