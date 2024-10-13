const convertAvatarPath = (avatarPath) => {
    if (!avatarPath) return '';
    // Replace 'src\\' with 'localhost:8080/' and convert backslashes to forward slashes
    let url = avatarPath.replace(/^src\\public\\/, 'localhost:8080/').replace(/\\/g, '/');
    // Ensure the URL starts with 'http://'
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    return url;
};

export default convertAvatarPath;
