import { useState } from "react";

function useInput(initialValue) {
    const [value, setValue] =
      useState(initialValue);
    return [
      {
        value,
        onChange: (e) => setValue(e.target.value)
      },
      () => setValue(initialValue)
    ];
  }

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [username, resetUsername] = useInput("");
    const [commentText, resetCommentText] = useInput("");

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: "POST",
            body: JSON.stringify({
                username: username.value, 
                text: commentText.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const body = await result.json();
        setArticleInfo(body);
        resetUsername();
        resetCommentText();
    };

    return (
        <>
            <div id="add-comment-form">
                <h2>Add a Comment:</h2>
                <label>
                    Name:
                    <input type="text" {...username}/>
                </label>
                <label>
                    Comment:
                    <textarea rows="4" cols="50" {...commentText}/>
                </label>
                <button onClick={() => addComment()}>Add Comment</button>
            </div>
        </>
    );
};

export default AddCommentForm;