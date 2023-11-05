import React from 'react'
import styles from "./styles.module.css";
function MyModal(props) {
  const {handleNo,handleYes}=props
  return (
    <>
    <div className={styles.modalwrapper} onClick={handleNo}></div>
          <div className={styles.modalContainer}>
            <h3 className={styles.modalheading}>Delete Comment</h3>
            <p className={styles.modalParagraph}>
              Are you sure you want to delete this comment? <br />
              This will remove the comment and cant be <br />
              undone.
            </p>

            <button onClick={handleNo} className={styles.no}>
              NO, CANCEL
            </button>
            <button onClick={handleYes} className={styles.yes}>
              YES, DELETE
            </button>
    </div>
    </>
  )
}

export default MyModal