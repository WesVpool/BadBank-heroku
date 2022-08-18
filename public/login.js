
function Login(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [data, setData] = React.useState('');
  const ctx = React.useContext(UserContext); 

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
  ctx.users.splice(0,1);
}

  function userLogin(){
    console.log(email,password);
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const user = JSON.parse(text);
            ctx.users.splice(0,1,user);
            setStatus('');
            setShow(false);
            setName(user.name);
            console.log('JSON:', user);
        } catch(err) {
            setStatus(text)
            console.log('err:', text);
        }
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
