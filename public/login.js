function Login(){

  const auth = firebase.auth();
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"))

  const [show, setShow]         = React.useState('');
  const [login, setLogin]       = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setShow(false);
      setLogin(true);
    } else {
      setShow(true);
      setLogin(false);
    }
  }); 
  
  React.useEffect(() => {
    if (liveUser !== null){
      setName(liveUser.name);
      setLogin(true);
    };
    if (login === true){
      const navUser = document.getElementById("login");
      navUser.textContent = `${getRandomGreet()} ${name}!`;
      navUser.title = "Logout of your account!";

      linkArr.forEach(el => document.getElementById(el).style.display = "block");
    } else {
      const navUser = document.getElementById("login");
      navUser.textContent = "Login";
      navUser.title = "Login of your account!";

      linkArr.forEach(el => document.getElementById(el).style.display = "none");
    } 
  }, [name]);

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
    auth.signOut();
    sessionStorage.clear();
  }

  function emptyInput(){
    if(!email || !password){
      return true
    }
    return false
  }

  function userLogin(){
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
      auth.signInWithEmailAndPassword(
      email,
      password)
      .then((userCred) => {
        setLogin(true);
        setName(auth.currentUser.displayName);
        auth.currentUser.getIdToken()
        .then(idToken => {
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
                window.sessionStorage.setItem("liveUser", text);
                setName(data.name);
                setStatus('');
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

  function handleGoogle(){
    auth.signOut();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
      auth.signInWithPopup(provider)
      .then((result) => {
        setLogin(true);
        setName(result.user.displayName);
        auth.currentUser.getIdToken()
        .then(idToken => {
          fetch(`/account/google/${result.user.displayName}/${result.user.email}`, {
            method: 'GET',
            headers: {
                'Authorization': idToken
            }
          })
          .then(response => response.text())
          .then(text => {
              try {
                const data = JSON.parse(text);   
                window.sessionStorage.setItem("liveUser", text);           
                setStatus('');   
                setShow(false); 
              } catch(err) {
                setStatus('Account Creation Failed. Please Try Again');
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
            <button type="button" 
              className="google" 
              onClick={e => handleGoogle(e)}>Sign in with Google</button><br/>

            <div className="or-seperator">
              <i className="bg-primary">or</i>
            </div>

            Email address<br/>
            <input type="input" 
              className="form-control" 
              id="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={e => setEmail(e.currentTarget.value)}/><br/>

            Password<br/>
            <input type="password" 
              className="form-control" 
              id="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={e => setPassword(e.currentTarget.value)}/><br/>

            <button type="submit"
              className="btn btn-light btn-block" 
              id="buttonstyle" 
              onClick={userLogin} 
              disabled={emptyInput()}>Login</button><br/>
            </>
          ):(
            <>
            <h5>Success! Welcome {name}!</h5><br/>

            <button type="submit"
              className="btn btn-light" 
              id="buttonstyle" 
              onClick={() => clearForm()}>Logout</button>
            </>
          )}
  />
)
  }
