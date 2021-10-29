//TO DO: add friend request/ accept/ decline buttons

import "./UserCard.css";

/** Component to show a single User card
 * 
 *  Props: 
 *  - id, username, firstname, lastname, zipcode, hobbies, interest, photoUrl
 * 
 *  State: 
 *  - None
 * 
 *  Routes -> UserCard
*/

function UserCard({ id,
    username,
    firstname,
    lastname,
    zipcode,
    hobbies,
    interests,
    photoUrl }) {

    console.log("* UserCard",
        {
            id,
            username,
            firstname,
            lastname,
            zipcode,
            hobbies,
            interests,
            photoUrl
        })

    return (
        <div id={id} className="UserCard card border-top border-primary p-2 border-2 mb-4">
            <h3 className="card-header text-uppercase">{firstname} {lastname}</h3>
            <div className="card-body">
                <img className="photo" src={photoUrl} alt={`Pic of ${firstname} ${lastname}`} />
                <p className="card-title">{username}</p>
                <div className="card-text"><small>Zip Code: {zipcode}</small></div>
                <div className="card=text"><small>Hobbies: {hobbies}</small></div>
                <div className="card=text"><small>Interests: {interests}</small></div>
            </div>
        </div>
    )
}

export default UserCard;