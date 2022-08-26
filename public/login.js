function Login(){
  const auth = firebase.auth();
  const user = auth.currentUser;
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"))
  const [show, setShow]         = React.useState('');
  const [login, setLogin]       = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [data, setData]         = React.useState('');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setShow(false);
      setLogin(true);
      // setName(liveUserLog.name);
      // setEmail(user.email);
    } else {
      setShow(true);
      setLogin(false);
    }
  }); 
  
  React.useEffect(() => {
    // console.log(liveUserLog);
    if (liveUser !== null){
      setName(liveUser.name);
      setLogin(true);
    };
    if (login === true){
      const navUser = document.getElementById("login");
      navUser.textContent = `Signed in as ${name}`;
      navUser.title = "Logout of your account!";
    } else {
      const navUser = document.getElementById("login");
      navUser.textContent = "Login";
      navUser.title = "Login of your account!";
    } 
  }, [name]);

  console.log(liveUser);

  function validate(field, label){
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''),3000);
      return false;
    }
    return true;
  }
  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
    setLogin(false);
    // liveUserLog.splice(0,1);
    auth.signOut();
    sessionStorage.clear();
    console.log(liveUser)
  }

  function userLogin(){
    console.log(email,password);
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
      auth.signInWithEmailAndPassword(
      email,
      password)
      // .then((result) => {
      //   return result.user.updateProfile({
      //     displayName: name
      //   })
      // })
      .then((userCred) => {
        auth.currentUser.getIdToken()
        .then(idToken => {
          console.log("idToken:", idToken);
          fetch(`/account/login/${email}/${password}`, {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
          })
          .then(response => response.text())
          .then(text => {
              try {
                const data = JSON.parse(text);
                // liveUserLog.splice(0,1,data);
                window.sessionStorage.setItem("liveUser", JSON.stringify(data));
                setName(data.name);
                setStatus('');
                setShow(false);
                console.log('JSON:', data.name);
              } catch(err) {
                setStatus('Account Login Failed. Please Try Again');
                console.log('err:', text);
              }
          });
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        setStatus(errorMessage);
      });
      });
    }
  return (
    <Card
    bgcolor="primary"
    header="Account Login"
    status={status}
    body={show ? (  
            <>
            Email address<br/>
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
            Password<br/>
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
            <button type="submit" className="btn btn-light" onClick={userLogin}>Login</button>
            </>
          ):(
            <>
            <h5>Success! Welcome {name}!</h5>
            <button type="submit" className="btn btn-light" onClick={() => clearForm()}>Logout</button>
            </>
          )}
  />
)
  }
