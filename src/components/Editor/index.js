import SunEditor from 'suneditor-react';
import classNames from 'classnames/bind';
import 'suneditor/dist/css/suneditor.min.css';

import styles from './Editor.module.scss';
import { useDebounce } from '~/hooks';
import { useState, useEffect, useRef } from 'react';
import { addContentToLessonApi, getCourseInfoApi, getCoursesInfoApi } from '~/utils/api';

function Editor({ tipText, setTipText, loading, setLoading, lessonId, setColor }) {
    const cx = classNames.bind(styles);

    // When the editor's content has changed, store it in state
    // const handleOnChange = async (content) => {
    //     setTipText('Changed and not saving...');
    //     setLoading(true);
    //     setTipText('Saving...');
    //     const result = await getCoursesInfoApi();
    //     setTipText('Saved');
    //     setLoading(false);
    // };
    const timeoutRef = useRef(null);
    const handleOnChange = async (content) => {
        setColor('red');
        setTipText('Changed and not saving. Autosave after 5 seconds');

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout for 3 seconds
        timeoutRef.current = setTimeout(async () => {
            setLoading(true);
            setTipText('Saving...');
            const blob = new Blob([content], { type: 'text/html' });

            // Step 2: Create a File from the Blob
            const file = new File([blob], 'content.html', { type: 'text/html' });
            const formData = new FormData();
            formData.append('lessonId', lessonId);
            formData.append('content', file);
            console.log(typeof formData.get('content'));
            const result = await addContentToLessonApi(formData);
            console.log(result);
            setTipText('Saved');
            setLoading(false);
            setColor('blue');
        }, 5000);
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
                setContents={localStorage.getItem('content1')}
                onSave={handleOnChange}
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
