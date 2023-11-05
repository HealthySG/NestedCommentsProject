import React from "react";
import styles from "./styles.module.css";

function Actions(props) {
 const{handleDelete,handleEdit,handleNewComment}=props
  return (
    <>
      <div className={styles.ccontrols}>
        <a className={styles.delete} onClick={handleDelete}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              style={{ margin: "4px" }}
              src="https://alishirani1384.github.io/Interactive-comments-section/images/icon-delete.svg"
            />
            Delete
          </div>
        </a>

        <a className={styles.edit} onClick={handleEdit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              style={{ margin: "4px" }}
              src="https://alishirani1384.github.io/Interactive-comments-section/images/icon-edit.svg"
            />
            Edit
          </div>
        </a>

        <a className={styles.reply} onClick={handleNewComment}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              style={{ margin: "4px" }}
              src="	https://alishirani1384.github.io/Interactive-comments-section/images/icon-reply.svg"
            />
            Reply
          </div>
        </a>
      </div>
    </>
  );
}

export default Actions;
