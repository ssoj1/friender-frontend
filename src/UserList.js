import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
import FrienderApi from './api';
import "./UserList.css";

/** 
 * 
 */

function UserList() {
    const [users, setUsers] = useState(null);
    console.log("UserList", { users });

    useEffect(function getUsersOnMount() {
        console.debug("UserList useEffect getUsersOnMount");

        /** */
        async function getUsers() {
            let users = await FrienderApi.getUsers();
            setUsers(users);
        }
        getUsers();
    }, []);

    if (!users) return <LoadingSpinner />;

    return (
        <div className="UserList" >
            <div className="UserCard col-md-8 offset-md-2">
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
        </div >
    )
}
export default UserList;