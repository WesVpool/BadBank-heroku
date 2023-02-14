function CreateAccount(){
  const auth = firebase.auth();
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));

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

  }, [login]);

  function validate(field, label){
      if (!field || field.replaceAll(" ","").length == 0) {
        setStatus(`Error: ${label} field is empty`);
        // setTimeout(() => setStatus(''),5000);
        return false;
      }
      setStatus('');
      return true;
  }

  function validatePass(field, label){
    if (field.length < 8 && field.length > 0) {
      setStatus('Error: Password must be at least 8 characters.');
      //setTimeout(() => setStatus(''),5000);
      return false;
    }
    setStatus('');
    return true;
  }

  function handleCreate(){
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!validatePass(password, 'password')) return;
    auth.signOut();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
      auth.createUserWithEmailAndPassword(
      email,
      password)
      .then((result) => {
        result.user.updateProfile({
          displayName: name
        });
      })
      .then((userCred) => {
        auth.currentUser.getIdToken()
        .then(idToken => {
          fetch(`/account/create/${name}/${email}/${password}`, {
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

function handleGoogle(){
  auth.signOut();
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
    auth.signInWithPopup(provider)
    .then((result) => {
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

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
    auth.signOut();
    window.sessionStorage.clear();
  }

  function emptyInput(){
    if(!name || !email || !password){
      return true
    }
    return false
  }

  return (
    <Card
      bgcolor="success"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
                <button type="button"
                  className="google" 
                  onClick={e => handleGoogle(e)}>Sign up with Google</button><br/>

                <div className="or-seperator">
                  <i className="bg-success">or</i>
                </div>

                Name<br/>
                <input type="input"
                  className="form-control" 
                  id="name" 
                  placeholder="Enter name" 
                  value={name} 
                  onChange={e => setName(capName(e.currentTarget.value))} /><br/>

                Email address<br/>
                <input type="input" 
                  className="form-control" 
                  id="email" 
                  placeholder="Enter email" 
                  required 
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
                  className="btn btn-light"
                  id="buttonstyle"
                  onClick={e => handleCreate(e)} 
                  disabled={emptyInput()}>Create Account</button><br/>
              </>
            ):(
              <>
              <h5>Success, Welcome {name}!</h5><br/>

              <button type="submit" 
                className="btn btn-light" 
                id="buttonstyle" 
                onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
}