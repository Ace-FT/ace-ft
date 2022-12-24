
/// islightColor will indicate if the color is too light
/// It is useful to decide if a font color has to chage
export function isLightColor(colorHex){
    var c = colorHex.substring(1);      // strip #
    
    if (c.length < 6) return true ; // ? jaguarg : safeguard

    var rgb = parseInt(c, 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract blue
    
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    
    console.log(luma) ; 

    return luma > 170 
}