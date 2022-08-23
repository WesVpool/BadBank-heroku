function Login(){
  // const liveUser = React.useContext(UserContext).liveUser;
  const auth = firebase.auth();
  const user = auth.currentUser;
  const [show, setShow]         = React.useState('');
  const [login, setLogin]         = React.useState('');
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setShow(false);
      setLogin(true);
      setName(user.displayName);
      setEmail(user.email);
    } else {
      setShow(true);
      setLogin(false);
    }
  }); 
  
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
    // ()=>{
    // if(login === true){
    // return user.email}});
  const [password, setPassword] = React.useState('');
  const [data, setData] = React.useState('');
  

  // console.log(liveUser);

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
    // liveUser.splice(0,1);
    auth.signOut();
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
                // liveUser.splice(0,1,data);
                window.sessionStorage.setItem("liveUser", JSON.stringify(data));
                setStatus('');
                setShow(false);
                console.log('JSON:', data);
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
      })
}
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //     .then(() => {
  //     auth.signInWithEmailAndPassword(
  //     email,
  //     password)
  //     .then((userCredential) => {
  //       // Signed in 
  //       // const user = userCredential.user;
  //       // console.log(user);
  //       // setShow(false);
  //       const url = `/account/login/${email}/${password}`;
  //       fetch(url)
  //       .then(response => response.text())
  //       .then(text => {
  //           try {
  //               const data = JSON.parse(text);
  //               // liveUser.splice(0,1,data);
  //               window.sessionStorage.setItem("liveUser", JSON.stringify(data));
  //               setStatus('');
  //               setShow(false);
  //               setName(data.name)
  //               console.log('JSON:', data);
  //           } catch(err) {
  //               setStatus(text)
  //               console.log('err:', text);
  //           }
  //       });
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode + errorMessage);
  //       setStatus(errorMessage);
  //     });
  //   })
  // }
 
  
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
