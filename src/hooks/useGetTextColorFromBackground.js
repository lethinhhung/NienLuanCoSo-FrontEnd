function useGetTextColorFromBackground(bgColor) {
    const color = bgColor.substring(1); // Remove '#'
    const rgb = parseInt(color, 16); // Convert hex to integer
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 125 ? 'black' : 'white';
}

export default useGetTextColorFromBackground;
