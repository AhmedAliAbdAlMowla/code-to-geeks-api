
module.exports = async (text) =>{

    const wpm = 255 ; // word Per Minute
    const words = text.trim().split(/\s+/).length; // calculation equ
    const time = Math.ceil(words / wpm);
    return time;
}