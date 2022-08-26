function CreateAccount(){
  const auth = firebase.auth();
  const user = auth.currentUser;
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));
  const [show, setShow]         = React.useState('');
  const [login, setLogin]       = React.useState('');
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [data, setData] = React.useState('');

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
    // console.log(liveUser);
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
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!validatePass(password, 'password')) return;
    auth.signOut();
    console.log(name);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
      auth.createUserWithEmailAndPassword(
      email,
      password)
      .then((result) => {
        setShow(false);
        result.user.updateProfile({
          displayName: name
        });
      })
      .then((userCred) => {
        auth.currentUser.getIdToken()
        .then(idToken => {
          console.log("idToken:", idToken);
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
                console.log('JSON:', data);
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
                Name<br/>
                <input type="input"
                  className="form-control" 
                  id="name" 
                  placeholder="Enter name" 
                  value={name} 
                  onChange={e => setName(e.currentTarget.value)} /><br/>

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
                  onClick={e => handleCreate(e)} 
                  disabled={emptyInput()}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success, Welcome {name}!</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
}