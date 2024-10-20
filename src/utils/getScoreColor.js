const getScoreColor = (score) => {
    if (score >= 0 && score <= 2) {
        return '#f5222d'; // Red
    } else if (score > 2 && score <= 4) {
        return '#fa8c16'; // Orange
    } else if (score > 4 && score <= 6) {
        return '#fadb14'; // Yellow
    } else if (score > 6 && score <= 8) {
        return '#1677ff'; // Blue
    } else if (score > 8 && score <= 10) {
        return '#52c41a'; // Green
    } else {
        return '#000000'; // Black for invalid scores
    }
};

export default getScoreColor;
