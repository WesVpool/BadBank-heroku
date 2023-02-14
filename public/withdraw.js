function Withdraw(){
  const auth = firebase.auth();
  const user = auth.currentUser;
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));

  const [show, setShow]         = React.useState(true);
  const [login, setLogin]       = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [name, setName]         = React.useState(liveUser === null ? "" : liveUser.name);
  const [amount, setAmount]     = React.useState('');
  const [balance, setBalance]   = React.useState(liveUser === null ? "" : liveUser.balance);
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLogin(true);
      setEmail(user.email);
    } else {
      setLogin(false);
    }
  }); 

  React.useEffect(() => {
    if (liveUser !== null){
      setLogin(true);
    };
    if (login === true){
      const navUser = document.getElementById("login");
      navUser.textContent = `${getRandomGreet()} ${name}!`;
      navUser.title = "Logout of your account!";
    } else {
      const navUser = document.getElementById("login");
      navUser.textContent = "Login";
      navUser.title = "Login of your account!";
    }

  }, [login]);

  function validate(field) {
    if (!Number(field)) {
      alert("Input type not valid. Please enter a number");
      setAmount('');
      return false;
    }
    if (Number(field) <= 0) {
      alert("Please enter a positive value");
      setAmount('');
      return false;
    }
    if (Number(field) > balance) {
      alert("Insufficient Funds!");
      setAmount('');
      return false;
    }
    return true;
  }

  
  function clearForm(){
    setAmount('');
    setShow(true);
  }

  function handleWithdraw() {
    if (!validate(amount, "amount")) return;
    // call server with token
    if (auth.currentUser) {
      auth.currentUser.getIdToken()
        .then(idToken => {
          fetch(`/account/update/${email}/${-(amount)}/WITHDRAW`, {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
          })
          .then(response => response.json())
          .then(data => {
              try {
                  setBalance(data.value.balance);
                  window.sessionStorage.setItem("liveUser", JSON.stringify(data.value));
                  setShow(false);
              } catch(err) {
                  setStatus('Withdraw failed')
                  console.log('err:', data.value);
              }
          });
        })
        .catch((e) => console.log("e:", e));
    } else {
      console.warn("There is currently no logged in user.");
    }
  }

  const persHeader = `${name}, Make A Withdraw`

  return liveUser === null ? (

    <div>
      <h5>USER NOT LOGGED IN!</h5>
      <a href="#/login/" className="btn btn-light" onClick={e => active(e)}>Login</a>
    </div>
    
    ) : (
    <Card
    bgcolor="danger"
    header= {persHeader}
    status={status}
    body={show ? (  
            <>
            Current Balance: ${balance}<br/>
            <br/>
            Withdraw Amount<br/>
            <input type="input" 
              className="form-control" 
              id="amount" 
              placeholder="Enter amount" 
              value={amount} 
              onChange={e => setAmount(e.currentTarget.value)}/><br/>

            <button type="submit" 
              className="btn btn-light"
              id="buttonstyle" 
              onClick={() => handleWithdraw()} 
              disabled={!amount}>Withdraw</button>
            </>
          ):(
            <>
            <h5>Success, {name}!</h5>

            ${amount} has been Withdrawn from your acount.<br/>

            <h5>Your new account balance is: ${balance}</h5><br/>

            <button type="submit" 
              className="btn btn-light"
              id="buttonstyle" 
              onClick={() => clearForm()}>Make Another Withdraw</button>
            </>
          )}
  />
  )
}