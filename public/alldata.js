function AllData(){
  // const auth = firebase.auth();
  // const user = auth.currentUser;
  
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));
  const [login, setLogin]       = React.useState('');
  const [show, setShow]       = React.useState(true);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }); 

  React.useEffect(() => {
    // // console.log(liveUser);
    if (liveUser !== null){
      // setName(liveUser.name);
      setLogin(true);
    };
    if (login === true){
      const navUser = document.getElementById("login");
      navUser.textContent = `${getRandomGreet()} ${liveUser.name}!`;
      navUser.title = "Logout of your account!";
    } else {
      const navUser = document.getElementById("login");
      navUser.textContent = "Login";
      navUser.title = "Login of your account!";
    }

  }, [login]);

  function dollar () {
    // return `Current Balance: $${liveUser.balanc}`;
    return(
      <div>
        <h5 className="fw-bold">Current Balance: ${liveUser.balance}</h5>
      </div>
    )
  }

  function info () {
    const [showPass, setShowPass]       = React.useState(false);
    const pass = (<h5 className="fw-bold" style={{marginTop: 10+'px'}}>Password: {liveUser.password}</h5>);
    let toggle = showPass === false ? true : false;
    let btText = showPass === false ? "Show Password" : "Hide Password";
    return(
      <div>
        <h5 className="fw-bold">Name: {liveUser.name}</h5>
        <h5 className="fw-bold">Email: {liveUser.email}</h5>
        <div>
          <button type="submit" className="btn btn-dark" onClick={() => setShowPass(toggle)}>{btText}</button>
          {showPass ? pass : null}
        </div>
      </div>
    )
  }
 
  return liveUser === null ? (

    <div>
      <h5>USER NOT LOGGED IN!</h5>
      <a href="#/login/" className="btn btn-light" onClick={e => active(e)}>Login</a>
    </div>
    
    ) : (
    <Card
      bgcolor="white"
      txtcolor="black"
      header={info()}
      title={dollar()}
      body={show ? (  
            <div>

              <button type="submit" className="btn btn-dark" onClick={() => setShow(false)}>Show Transactions</button>


            </div>
          ):(
            <div>
              <button type="submit" className="btn btn-dark" style={{marginBottom: 10+'px'}} onClick={() => setShow(true)}>Hide Transactions</button>
              <h5>{liveUser.name}'s Transactions:</h5>
              {liveUser.trans.map((vary, i) => (
                <p key={i}>{vary}</p>
              ))}
                       
            </div>
          )}
  />
  )
}
