import styles from "./Card.modules.css";

function Card() {
    return (
        <div className={(styles as any).card}>
            <img src="https://via.placeholder.com/150" alt="profile picture"></img>
            <h2>Bro Code</h2>
            <p>I am trying to learn React</p>
        </div>
    );
}

export default Card;