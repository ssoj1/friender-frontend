import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
import FrienderApi from './api';
import "./UserList.css";

/** Component to display a list of users
 * 
 * State: 
 * - users - an array of user objects like [{user}, ...]
 * 
 * Routes -> UserList
 */

function UserList() {
    const [users, setUsers] = useState(null);
    console.log("* UserList", { users });

    /** gets users when component mounts */
    useEffect(function getUsersOnMount() {
        console.debug("UserList useEffect getUsersOnMount");

        /** sets users to an array of user objects */
        async function getUsers() {
            let users = await FrienderApi.getUsers();
            setUsers(users);
        }
        getUsers();
    }, []);

    if (!users) return <LoadingSpinner />;

    return (
        <div className="UserList justify-content-center" >
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