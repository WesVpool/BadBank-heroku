function Transfer(){const auth = firebase.auth();
  const user = auth.currentUser;
  // const liveUser = React.useContext(UserContext).liveUser;
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));
  const [data, setData]         = React.useState('');
  const [show, setShow]         = React.useState(true);
  const [login, setLogin]       = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [eTrans, setETrans]     = React.useState('');
  const [name, setName]         = React.useState(liveUser === null ? "" : liveUser.name);
  const [amount, setAmount]     = React.useState('');
  const [balance, setBalance]   = React.useState(liveUser === null ? "" : liveUser.balance);
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLogin(true);
      // setName(liveUser.name);
      setEmail(user.email);
      // setBalance(liveUser.balance);
    } else {
      setLogin(false);
    }
  }); 

  if(login === false){
    return(
      <div>
        <h5>USER NOT LOGGED IN!</h5>
          <a href="#/login/" className="btn btn-light" onClick={e => active(e)}>Login</a>
      </div>)
  };

  // React.useEffect(() => {
        
  //   // fetch all accounts from API
  //   fetch(`/account/find/${email}`)
  //       .then(response => response.json())
  //       .then(data => {
  //           console.log(data);
  //           setBalance(data[0].balance);
  //           setName(data[0].name);               
  //       });

  // }, []);

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

  function handleTransfer() {
    if (!validate(amount, "amount")) return;
    // call server with token
    if (auth.currentUser) {
      auth.currentUser.getIdToken()
        .then(idToken => {
          console.log("idToken:", idToken);
          fetch(`/account/transfer/${eTrans}/${amount}`, {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
          })
          .then(response => response.text())
          .then(text => {
            console.log(text);
              try { 
                  const data = JSON.parse(text);
                  setBalance(data.value.balance);
                  // liveUser.splice(0,1,data.value);
                  window.sessionStorage.setItem("liveUser", JSON.stringify(data.value));
                  setShow(false);
                  setStatus('');
                  console.log('JSON:', liveUser);
              } catch(err) {
                  setStatus('Transfer failed: '+text)
                  console.log('err:', text);
              }
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + errorMessage);
          setStatus(errorMessage);
        });
    } else {
      console.warn("There is currently no logged in user.");
    }
  }

  const persHeader = `${name}, Make A Transfer`

  return liveUser === null ? (

    <div>
      <h5>USER NOT LOGGED IN!</h5>
      <a href="#/login/" className="btn btn-light" onClick={e => active(e)}>Login</a>
    </div>
    
    ) : (
    <Card
    bgcolor="success"
    header= {persHeader}
    status={status}
    body={show ? (  
            <>
            Current Balance: ${balance}<br/>
            <br/>
            Recipient's Email Address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={eTrans} onChange={e => setETrans(e.currentTarget.value)}/><br/>
            Transfer Amount<br/>
            <input type="input" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" onClick={() => handleTransfer()} disabled={!amount}>Transfer</button>
            </>
          ):(
            <>
            <h5>Success, {name}!</h5>
            ${amount} has been transfered to {eTrans}<br/>
            <h5>Your new account balance is: ${balance}</h5>
            <button type="submit" className="btn btn-light" onClick={() => clearForm()}>Make Another Transfer</button>
            </>
          )}
  />
  )
}

