/**
 * Returns a contrasting color for the given color.
 * @author enigment ( https://stackoverflow.com/a/6511606/17781751 )
 *
 * @param {string | number[]} color - A color in hexadecimal string or RGB array format.
 * @return {string} A contrasting color in hexadecimal string format ('000' or 'fff').
 */
export function contrastingColor(color)
{
    return (luma(color) >= 165) ? '000' : 'fff';
}
function luma(color) // color can be a hx string or an array of RGB values 0-255
{
    var rgb = (typeof color === 'string') ? hexToRGBArray(color) : color;
    return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
}
function hexToRGBArray(color)
{
    if (color.length === 3)
        color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
    else if (color.length !== 6)
        throw('Invalid hex color: ' + color);
    var rgb = [];
    for (var i = 0; i <= 2; i++)
        rgb[i] = parseInt(color.substr(i * 2, 2), 16);
    return rgb;
}