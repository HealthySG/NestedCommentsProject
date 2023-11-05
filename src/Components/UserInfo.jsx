import React from 'react'
import styles from "./styles.module.css";
function UserInfo(props) {
   const {avatar,author,createdAt}=props; 
   function convertDateToMonths(date) {
    date = new Date(date);
    const currDate = new Date();

    const monthsDifference =
      currDate.getMonth() -
      date.getMonth() +
      12 * (currDate.getFullYear() - date.getFullYear());

    return Math.abs(monthsDifference);
  }
  return (
     <>
       <div className={styles.cuser}>
              <img className={styles.usrimg} src={avatar} />
              <p className={styles.usrname}>{author}</p>
              <p className={styles.time}>{` ${
                convertDateToMonths(createdAt) == 0
                  ? "1 Days Ago"
                  : "1 Months Ago"
              }`}</p>
        </div>
     </>
  )
}

export default UserInfo