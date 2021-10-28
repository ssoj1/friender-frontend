/** Component to show a single User card
 * 
 *  Props: 
 *  - id, title, salary, equity
 * 
 *  State: 
 *  - None
 * 
 *  UserCardList -> UserCard
*/

function UserCard({ id, username, firstname, lastname, zipcode, hobbies, interests, photoUrl }) {
    console.log("UserCard", { id, username, firstname, lastname, zipcode, hobbies, interests, photoUrl })
    return (
        <div id={id} className="UserCard card border-top border-primary p-2 border-2 mb-4">
        <h6 className="card-header text-uppercase">{firstname} {lastname}</h6>
        <div className="card-body">
            <p class="card-title">{username}</p>
            <div class="card-text"><small>Zip Code: {zipcode}</small></div>
            <div class="card=text"><small>Hobbies: {hobbies}</small></div>
            <div class="card=text"><small>Interests: {interests}</small></div>
            <img class="photo" src={photoUrl} alt={`Pic of ${firstname} ${lastname}`}/>
        </div>
    </div>
    )
}

export default UserCard;