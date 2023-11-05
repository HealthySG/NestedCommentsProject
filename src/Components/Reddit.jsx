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
import MyModal from "./MyModal";
import Score from "./Score";
import UserInfo from "./UserInfo";
import Actions from "./Actions";
import CommentText from "./CommentText";
import Reply from "./Reply";
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
      {/* Modal Opens when Delete Event happens */}
      {showModal && (
        <>
          <MyModal handleNo={handleNo} handleYes={handleYes}/>
        </>
      )}
      {/*  Post Container includes:- 
              Vote on Post
              User Profile Related InforMation
              Actions (Edit, Delete, Reply)
              Comment Text 
              Break All into seperate components
      */}
      <div
        className={styles.commentContainer}
      >
        <Score score={posts.voteCount} handleUpvote={handleUpvote} handleDownvote={handleDownvote}/>
        <div style={{ marginLeft: "5px" }}>
          <div
            className={styles.userContent}
          >
            <UserInfo avatar={posts.avatar} author={posts.author} createdAt={posts.createdAt}/>
            <Actions handleDelete={handleDelete} handleEdit={handleEdit} handleNewComment={handleNewComment}/>
          </div>
          <CommentText editMode={editMode} handleChange={handleChange} commentBody={commentBody} text={posts.message} handleUpdate={handleUpdate}/>
        </div>
      </div>
      {/*  Comments on Post
           Comments will also acts like a Post so 
           Recursiverly calling the same component for 
           comment as well. 
       */}
       {/* For Identation used paddingLeft */}
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
      {/* Reply Component through which we can add comment on Post*/}
      <Reply showinput={showinput} handleAdd={handleAdd} handleChange={handleChange}/>
    </div>
  );
}

export default Reddit;
