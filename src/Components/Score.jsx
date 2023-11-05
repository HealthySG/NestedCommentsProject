import React from 'react'
import styles from "./styles.module.css";

function Score(props) {
 const {handleUpvote,handleDownvote,score}=props;
  return (
    <>
       <div className={styles.cscore}>
          <img
            src="https://alishirani1384.github.io/Interactive-comments-section/images/icon-plus.svg"
            className={styles.scorecontrol}
            onClick={handleUpvote}
          />
          <p>{score}</p>
          <img
            src="https://alishirani1384.github.io/Interactive-comments-section/images/icon-minus.svg"
            className={styles.scorecontrol}
            onClick={handleDownvote}
          />
        </div>
    </>
  )
}

export default Score