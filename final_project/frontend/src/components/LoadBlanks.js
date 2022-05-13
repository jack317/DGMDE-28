import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";

/**
 * iterates over a paragraph and break it into chunks with blank inputs in between
 */
export function LoadBlanks({ passText, passTitle }) {
    var outputLines = [];
    var prevIndex = 0;
    var j = 1;
   
    
    // show completed MadLib
    function completeMessage(filledInMadLib) {
        document.getElementById('form-text').style.display = "none";
        var completed = document.createElement("p");
        completed.innerHTML = filledInMadLib;
        completed.className = "madlib-paragraphs"
        document.getElementById('main-text').appendChild(completed);
    };


    function handleSubmit() {
        // Get the text and all of the inputs by identifying name and save it in a new array
        var filledInMadLib = outputLines.flatMap((line) => {
            return [line.text, document.getElementsByName(line.blank)[0].value];
        });

        // Create an object to send to the DB to save the newly created MadLib!
        var newLib = {
            "title_saved": passTitle,
            "body_saved": filledInMadLib.join(' ')
        }
        
        // Use axios to post to the database
        axios
            .post('api/Saved/', newLib)
            .then((res) => console.log(res))
            .then(() => completeMessage(filledInMadLib))
    }

    // iterates through all characters in the string and removes < character
    for (var i = 0; i < passText.length; i++) {
        if (passText[i] === "<") {
            var newpassText = passText.substring(prevIndex, i - 1);
            // outputLines is an array or objects that has the substring saved in text
            // and the unique identifier number that is used on the input component
            // in blank
            outputLines.push({text: newpassText, blank: j});
            prevIndex = i + 1;
            j++
        }
    }
    // need to add the last section of text each time otherwise it would be left off
    var finalText = passText.substring(prevIndex, i);
    outputLines.push({text: finalText, blank: j});

    return (
        <Card.Text id="main-text" className="madlib-text">
            <Form id="form-text">
                {outputLines.map((line) => (
                    <p className="madlib-paragraphs">{line.text} 
                        {<input
                            name={line.blank}
                            className="blankSpace">
                        </input>}
                    </p>
                ))}
                <div>
                    <Button
                        className="madlib-button"
                        onClick={handleSubmit}>
                    Submit MadLib!
                    </Button>
                </div>
            </Form>
        </Card.Text>
    )
}
