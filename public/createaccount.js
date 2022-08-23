function CreateAccount(){

  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const currentUser = React.useContext(UserContext).currentUser;

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
    const auth = firebase.auth();
    auth.signOut();
    currentUser.splice(0,1);
    const promise = 
    auth.createUserWithEmailAndPassword(
      email,
      password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // console.log(user);
        // setShow(false);
        const url = `/account/create/${name}/${email}/${password}`;
        fetch(url)
        .then(response => response.text())
        .then(text => {
            try {
                const user = JSON.parse(text);
                currentUser.splice(0,1,user);
                setStatus('');
                setShow(false);
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

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
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
                  onClick={e => handleCreate()} 
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