import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
import FrienderApi from './api';

/** 
 * 
 */

function UserList() {
    const [users, setUsers] = useState(null);
    console.log("UserList", { users });

    useEffect(function getUsersOnMount() {
        console.debug("UserList useEffect getUsersOnMount");

        /** */
        async function getUsers(){
          let users = await FrienderApi.getUsers();
          setUsers(users);
        }
        getUsers();
    }, []);
    
      if (!users) return <LoadingSpinner />;

    return (
        <div>
            {users.map(u => (
                <UserCard
                    key={u.id}
                    username={u.username}
                    firstname={u.firstname}
                    lastname={u.lastname}
                    zipcode={u.zipcode}
                    hobbies={u.hobby}
                    interests={u.interest}
                    photoUrl={u.photourl}
                />
            ))}
        </div>
    )
}
export default UserList;