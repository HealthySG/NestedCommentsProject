import React from 'react'
import styles from "./styles.module.css";
function CommentText(props) {
    const{editMode,handleChange,commentBody,text,handleUpdate}=props
  return (
    <>
      <div className={styles.ctext}>
            {editMode ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "110px",
                }}
              >
                <textarea
                  autoFocus
                  className={styles.updateInputContainer}
                  onChange={handleChange}
                  value={commentBody}
                >
                  {text}
                </textarea>
                <button className={styles.updateButton} onClick={handleUpdate}>
                  Update
                </button>
              </div>
            ) : (
              <span>{text}</span>
            )}
          </div>
    </>
  )
}

export default CommentText