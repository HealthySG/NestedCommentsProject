import { createSlice } from "@reduxjs/toolkit";
import { fetchcomments } from "../thunks/fetchdata";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    isLoading: false,
    comments: [],
    error: null,
    commentBody: "",
  },
  reducers: {
    updateComment(state, action) {
      state.comments = updateCommentForId(
        state.comments,
        action.payload.postcreatedId,
        action.payload.commentBody
      );
    },
    addComment(state, action) {
      state.comments = addNode(
        state.comments,
        action.payload.parentcommentId,
        action.payload.newComments
      );
    },
    deleteComment(state, action) {
      const finalstructure = deleteNode(state.comments, action.payload);
      const temp = { ...finalstructure };
      state.comments = temp;
    },
    upVote(state, action) {
      state.comments = upVoteOnComment(state.comments, action.payload);
    },
    downVote(state, action) {
      state.comments = downVoteOnComment(state.comments, action.payload);
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchcomments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchcomments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(fetchcomments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});
const upVoteOnComment = (tree, id) => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].createdAt === id) {
      tree[i].voteCount += 1;
      return tree;
    } else if (tree[i].hasOwnProperty("comments")) {
      upVoteOnComment(tree[i].comments, id);
    }
  }
  return tree;
};
const downVoteOnComment = (tree, id) => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].createdAt === id) {
      tree[i].voteCount -= 1;
      return tree;
    } else if (tree[i].hasOwnProperty("comments")) {
      downVoteOnComment(tree[i].comments, id);
    }
  }
  return tree;
};
const addNode = (tree, commentId, newComment) => {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].createdAt === commentId) {
        if (tree[i].hasOwnProperty("comments")) {
          tree[i].comments.unshift(newComment);
          return tree;
        } else {
          tree[i].comments = [newComment];
          return tree;
        }
      } else if (tree[i].hasOwnProperty("comments")) {
        addNode(tree[i].comments, commentId, newComment);
      }
    }

    return tree;
  }
};

const deleteNode = (tree, id) => {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].createdAt === id) {
        tree.splice(i, 1);
        return tree;
      } else if (tree[i].hasOwnProperty("comments")) {
        deleteNode(tree[i].comments, id);
      }
    }
    return tree;
  } else {
    const trees = Object.values(tree);
    for (let i = 0; i < trees.length; i++) {
      if (trees[i].createdAt === id) {
        trees.splice(i, 1);
        return trees;
      } else if (trees[i].hasOwnProperty("comments")) {
        deleteNode(trees[i].comments, id);
      }
    }
    return trees;
  }
};
const updateCommentForId = (tree, commentId, newComment) => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].createdAt === commentId) {
      tree[i].message = newComment;
      return tree;
    } else if (tree[i].hasOwnProperty("comments")) {
      updateCommentForId(tree[i].comments, commentId, newComment);
    }
  }
  return tree;
};
export const {
  updateComment,
  addComment,
  deleteComment,
  upVote,
  downVote,
  addUniqueIds,
} = commentSlice.actions;
export const commentreducer = commentSlice.reducer;
