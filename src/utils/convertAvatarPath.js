const convertAvatarPath = (avatarPath) => {
    if (!avatarPath) return '';

    let url = avatarPath.replace(/^src\\public\\/, 'localhost:8080/').replace(/\\/g, '/');
    // let url = avatarPath.replace(/^src\\public\\/, '192.168.39.26:8080/').replace(/\\/g, '/');

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    return url;
};

export default convertAvatarPath;
