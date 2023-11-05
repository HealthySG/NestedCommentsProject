import "./App.css";
import Reddit from "./Components/Reddit";
import { useEffect } from "react";
import { fetchcomments } from "./store/thunks/fetchdata";
import { useSelector, useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchcomments());
  }, []);
  const listOfPosts = useSelector((state) => state.comment.comments) || [];
  return (
    <div className="App">
      {Array.isArray(listOfPosts)
        ? listOfPosts.map((post) => (
            <Reddit key={post.createdAt} posts={post} />
          ))
        : Object.values(listOfPosts).map((post) => (
            <Reddit key={post.createdAt} posts={post} />
          ))}
    </div>
  );
}

export default App;
