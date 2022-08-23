const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
// import { config } from "dotenv";
// config({path: "./config.env"});
// const apptoken = process.env.BADBANK_TOKEN;

const firebaseConfig = {
  apiKey: "AIzaSyB6qId9twmHg9_wkWPlahdpKsAqMBdS4QU",
  authDomain: "badbankher-mon-auth.firebaseapp.com",
  projectId: "badbankher-mon-auth",
  storageBucket: "badbankher-mon-auth.appspot.com",
  messagingSenderId: "979789398878",
  appId: "1:979789398878:web:c142da40682d38275745cf"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}



function Card(props) {
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : " ";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    <div className={classes()} style={{ maxWidth: "25rem" }}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
