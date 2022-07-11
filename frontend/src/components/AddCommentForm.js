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

    const commentArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: "POST"
        });

        const body = await result.body;
        setArticleInfo(body);
    };

    return (
        <>
            <div id="add-comment-form">
                <h2>Add a Comment:</h2>
                <form onSubmit={() => commentArticle()}>
                    <label>
                        Name:
                        <input type="text" {...username}/>
                    </label>
                    <label>
                        Comment:
                        <textarea rows="4" cols="50" {...commentText}/>
                    </label>
                    <button>Add Comment</button>
                </form>
            </div>
        </>
    );
};

export default AddCommentForm;