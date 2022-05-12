import BlankSpace from "./components/blankSpaceTemplate";

/**
 * iterate over a paragraph and break it into chunks with blanks
 */
export function insertBlanks(text) {
    // [text].forEach(letter => {
    //     if (letter === '<')
    //         letter = <BlankSpace />
    //         text.letter = letter
    // });
    // return text
    var newText = text?.replace('<', '<BlankSpace />')
    return newText
}

