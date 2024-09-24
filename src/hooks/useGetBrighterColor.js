function useGetBrighterColor(bgColor) {
    const color = bgColor.substring(1); // Remove '#'
    const rgb = parseInt(color, 16); // Convert hex to integer
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = (rgb >> 0) & 0xff;

    // Decrease each component by 20 to make the color darker
    r = Math.max(0, r + 50);
    g = Math.max(0, g + 50);
    b = Math.max(0, b + 50);

    // Convert back to hex and ensure 2 digits
    const newColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

    return newColor;
}

export default useGetBrighterColor;
