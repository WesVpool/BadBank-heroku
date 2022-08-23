function Deposit(){
  const auth = firebase.auth();
  const user = auth.currentUser;
  // const liveUser = React.useContext(UserContext).liveUser;
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));
  const action = "DEPOSIT"
  const [data, setData]         = React.useState('');
  const [show, setShow]         = React.useState(true);
  const [login, setLogin]       = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [name, setName]         = React.useState('');
  const [amount, setAmount]     = React.useState('');
  const [balance, setBalance]   = React.useState('');
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLogin(true);
      setName(user.displayName);
      setEmail(user.email);
      setBalance(liveUser.balance);
    } else {
      setLogin(false);
    }
  }); 

  if(login === false){
    return(
      <div>
        <h5>USER NOT LOGGED IN!</h5>
          <a href="#/login/" className="btn btn-light" >Login</a>
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
    return true;
  }

  
  function clearForm(){
    setAmount('');
    setShow(true);
  }

  function handleDeposit() {
    if (!validate(amount, "amount")) return;
    // call server with token
    if (auth.currentUser) {
      auth.currentUser.getIdToken()
        .then(idToken => {
          console.log("idToken:", idToken);
          fetch(`/account/update/${email}/${amount}/${action}`, {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
          })
          .then(response => response.json())
          .then(data => {
              try {
                  // const data = JSON.parse(text);
                  setBalance(data.value.balance);
                  // liveUser.splice(0,1,data.value);
                  window.sessionStorage.setItem("liveUser", JSON.stringify(data.value));
                  setShow(false);
                  console.log('JSON:', data.value.balance);
              } catch(err) {
                  setStatus('Deposit failed')
                  console.log('err:', data.value);
              }
          });
        })
        .catch((e) => console.log("e:", e));
    } else {
      console.warn("There is currently no logged in user.");
    }
  }
  // function handleDeposit(){
  //   if (!validate(amount, "amount")) return;
    // fetch(`/account/update/${email}/${amount}/${action}`)
    // .then(response => response.json())
    // .then(user => {
    //     try {
    //         // const data = JSON.parse(text);
    //         setBalance(user.value.balance);
    //         currentUser.splice(0,1,user.value);
    //         setShow(false);
    //         console.log('JSON:', user.value.balance);
    //     } catch(err) {
    //         setStatus('Deposit failed')
    //         console.log('err:', user.value);
    //     }
    // });
  // }

  const persHeader = `${name}, Make A Deposit`
  return (
    <Card
    bgcolor="success"
    header= {persHeader}
    status={status}
    body={show ? (  
            <>
            Current Balance: ${balance}<br/>
            <br/>
            Deposit Amount<br/>
            <input type="input" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" onClick={() => handleDeposit()} disabled={!amount}>Deposit</button>
            </>
          ):(
            <>
            <h5>Success, {name}!</h5>
            ${amount} has been deposited to your acount.<br/>
            <h5>Your new account balance is: ${balance}</h5>
            <button type="submit" className="btn btn-light" onClick={() => clearForm()}>Make Another Deposit</button>
            </>
          )}
  />
  )
}
