import SunEditor from 'suneditor-react';
import classNames from 'classnames/bind';
import 'suneditor/dist/css/suneditor.min.css';

import styles from './Editor.module.scss';
import { useEffect, useRef } from 'react';
import { addContentToLessonApi } from '~/utils/api';

function Editor({ tipText, setTipText, lessonId, setColor, lessonContent }) {
    const cx = classNames.bind(styles);

    const timeoutRef = useRef(null);

    const save = async (content) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setTipText('Saving...');
        const blob = new Blob([content], { type: 'text/html' });

        //Create a File from the Blob
        const file = new File([blob], 'content.html', { type: 'text/html' });
        const formData = new FormData();
        formData.append('lessonId', lessonId);
        formData.append('content', file);

        await addContentToLessonApi(formData);

        setTipText('Saved');

        setColor('blue');
    };
    const handleOnChange = async (content) => {
        setColor('red');
        setTipText('Changed and not saving. Autosave after 60 seconds');

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout for 3 seconds
        timeoutRef.current = setTimeout(async () => {
            save(content);
        }, 60000);
    };

    useEffect(() => {
        return () => {
            // Cleanup timeout on component unmount
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <SunEditor
                setContents={lessonContent}
                onSave={save}
                onChange={handleOnChange}
                setOptions={{
                    minHeight: '300px',
                    mode: 'classic',
                    rtl: false,
                    katex: 'window.katex',
                    stickyToolbar: '',
                    imageGalleryUrl: 'https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo',
                    videoResizing: false,
                    videoHeightShow: false,
                    videoAlignShow: false,
                    videoFileInput: false,
                    videoUrlInput: false,
                    videoRatioShow: false,
                    audioUrlInput: false,
                    tabDisable: false,
                    buttonList: [
                        [
                            'undo',
                            'redo',
                            'save',
                            'fullScreen',
                            'font',
                            'fontSize',
                            'formatBlock',
                            'paragraphStyle',
                            'blockquote',
                            'bold',
                            'underline',
                            'italic',
                            'strike',
                            'subscript',
                            'superscript',
                            'fontColor',
                            'hiliteColor',
                            'textStyle',
                            'removeFormat',
                            'outdent',
                            'indent',
                            'align',
                            'horizontalRule',
                            'list',
                            'lineHeight',
                            'table',
                            'link',
                            'image',
                            'math',
                            'imageGallery',

                            'showBlocks',
                            'codeView',
                            'preview',
                            'print',
                        ],
                    ],
                }}
            />
        </div>
    );
}

export default Editor;
