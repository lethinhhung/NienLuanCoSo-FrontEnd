import SunEditor from 'suneditor-react';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import 'suneditor/dist/css/suneditor.min.css';

import { useWindowDimensions } from '~/hooks';
import styles from './Editor.module.scss';

function Editor() {
    const cx = classNames.bind(styles);

    // When the editor's content has changed, store it in state
    const handleOnChange = (content) => {
        localStorage.setItem('content1', content);
        console.log(localStorage.getItem('content1'));
    };

    return (
        <div className={cx('wrapper')}>
            <SunEditor
                setContents={localStorage.getItem('content1')}
                onSave={handleOnChange}
                onChange={handleOnChange}
                setOptions={{
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
                            'fullScreen',
                            'showBlocks',
                            'codeView',
                            'preview',
                            'print',
                            'save',
                        ],
                    ],
                }}
            />
        </div>
    );
}

export default Editor;
