import React from 'react'
import styles from "./styles.module.css";
function Reply(props) {
    const{showinput,handleAdd,handleChange}=props;
  return (
    <>
      {showinput && (
        <div
          style={{
            display: "flex",
            width: "40%",
            height: "102px",
          }}
        >
          <img
            src="https://alishirani1384.github.io/Interactive-comments-section/images/avatars/image-juliusomo.webp"
            alt=""
            className={styles.usrimg}
          />
          <textarea
            onChange={handleChange}
            className={styles.replytextarea}
            placeholder="Add a comment..."
          ></textarea>
          <button onClick={handleAdd} className={styles.buprimary}>
            SEND
          </button>
        </div>
      )}
    </>
  )
}

export default Reply