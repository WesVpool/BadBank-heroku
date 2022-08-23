function Login(){
  const auth = firebase.auth();
  const user = auth.currentUser;
  
  const currentUser = React.useContext(UserContext).currentUser; 
  const [show, setShow]         = React.useState(user === null);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState(()=>{
    if(user !== null){
    return currentUser[0].name}});
  const [email, setEmail]       = React.useState(()=>{
    if(user !== null){
    return currentUser[0].name}});
  const [password, setPassword] = React.useState('');
  const [data, setData] = React.useState('');
  

  // console.log(currentUser);

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
    currentUser.splice(0,1);
    auth.signOut();
  }

  function userLogin(){
    console.log(email,password);
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    // const promise = 
    auth.signInWithEmailAndPassword(
      email,
      password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // console.log(user);
        // setShow(false);
        const url = `/account/login/${email}/${password}`;
        fetch(url)
        .then(response => response.text())
        .then(text => {
            try {
                const user = JSON.parse(text);
                currentUser.splice(0,1,user);
                setStatus('');
                setShow(false);
                setName(user.name)
                console.log('JSON:', user);
            } catch(err) {
                setStatus(text)
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
            <button type="submit" className="btn btn-light" onClick={() => clearForm()}>Login To A Different Account</button>
            </>
          )}
  />
)
}
