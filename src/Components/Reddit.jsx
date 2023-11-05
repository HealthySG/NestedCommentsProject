import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateComment,
  addComment,
  deleteComment,
  upVote,
  downVote,
} from "../store/slices/commentsSlice";
import styles from "./styles.module.css";
function Reddit({ posts }) {
  const [showinput, setshowinput] = useState(false);
  const [commentBody, setcommentBody] = useState(posts.message);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setcommentBody(e.target.value);
  };

  const handleNewComment = (event) => {
    setshowinput(true);
  };
  const handleAdd = () => {
    let newComments = {
      createdAt: Date.now(),
      message: commentBody,
      voteCount: 0,
      avatar: "https://robohash.org/2",
      author: "Satyam",
      comments: [],
    };
    let parentcommentId = posts.createdAt;
    dispatch(addComment({ parentcommentId, newComments }));
    setshowinput(false);
  };
  function convertDateToMonths(date) {
    date = new Date(date);
    const currDate = new Date();

    const monthsDifference =
      currDate.getMonth() -
      date.getMonth() +
      12 * (currDate.getFullYear() - date.getFullYear());

    return Math.abs(monthsDifference);
  }
  const handleDelete = () => {
    setshowModal(true);
  };
  const handleUpvote = () => {
    dispatch(upVote(posts.createdAt));
  };
  const handleDownvote = () => {
    dispatch(downVote(posts.createdAt));
  };
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleUpdate = () => {
    let postcreatedId = posts.createdAt;
    dispatch(updateComment({ postcreatedId, commentBody }));
    setEditMode(false);
    setcommentBody("");
  };
  const handleNo = () => {
    setshowModal(false);
  };
  const handleYes = () => {
    dispatch(deleteComment(posts.createdAt));
    setshowModal(false);
  };
  return (
    <div style={{ backgroundColor: "#F5F6FA" }}>
      {showModal && (
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
      )}
      <div
        className={styles.commentContainer}
      >
        <div className={styles.cscore}>
          <img
            src="https://alishirani1384.github.io/Interactive-comments-section/images/icon-plus.svg"
            className={styles.scorecontrol}
            onClick={handleUpvote}
          />
          <p>{posts.voteCount}</p>
          <img
            src="	https://alishirani1384.github.io/Interactive-comments-section/images/icon-minus.svg"
            className={styles.scorecontrol}
            onClick={handleDownvote}
          />
        </div>
        <div style={{ marginLeft: "5px" }}>
          <div
            className={styles.userContent}
          >
            <div className={styles.cuser}>
              <img className={styles.usrimg} src={posts.avatar} />
              <p className={styles.usrname}>{posts.author}</p>
              <p className={styles.time}>{` ${
                convertDateToMonths(posts.createdAt) == 0
                  ? "1 Days Ago"
                  : "1 Months Ago"
              }`}</p>
            </div>
            <div className={styles.ccontrols}>
              <a className={styles.delete} onClick={handleDelete}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <img
                    style={{ margin: "4px" }}
                    src="https://alishirani1384.github.io/Interactive-comments-section/images/icon-delete.svg"
                  />
                  Delete
                </div>
              </a>

              <a className={styles.edit} onClick={handleEdit}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <img
                    style={{ margin: "4px" }}
                    src="https://alishirani1384.github.io/Interactive-comments-section/images/icon-edit.svg"
                  />
                  Edit
                </div>
              </a>

              <a className={styles.reply} onClick={handleNewComment}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <img
                    style={{ margin: "4px" }}
                    src="	https://alishirani1384.github.io/Interactive-comments-section/images/icon-reply.svg"
                  />
                  Reply
                </div>
              </a>
            </div>
          </div>
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
                  {posts.message}
                </textarea>
                <button className={styles.updateButton} onClick={handleUpdate}>
                  Update
                </button>
              </div>
            ) : (
              <span>{posts.message}</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ margin: "10px", paddingLeft: "45px" }}>
        {posts.hasOwnProperty("comments") &&
          posts.comments.map((comment) => {
            return (
              <div>
                <Reddit key={comment.createdAt} posts={comment} />
              </div>
            );
          })}
      </div>
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
    </div>
  );
}

export default Reddit;
