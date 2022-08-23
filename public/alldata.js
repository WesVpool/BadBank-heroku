function AllData(){
  // const auth = firebase.auth();
  // const user = auth.currentUser;
  
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));
  const [login, setLogin]       = React.useState('');

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLogin(true);
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
  //           setData(data);                
  //       });

  // }, []);

  function dollar () {
    return `Current Balance: $${liveUser.balance}`;
  }

  function info () {
    return(
      <div>
        <h5 className="fw-bold">Name: {liveUser.name}</h5>
        <h5 className="fw-bold">Email: {liveUser.email}</h5>
        <h5 className="fw-bold">Password: {liveUser.password}</h5>
      </div>
    )
  }

  function users() {
    if(liveUser !== null){
    return(
      <Card
        bgcolor="white"
        txtcolor="black"
        header={info()}
        title={dollar()}
        body={
          <div>
            <h5>{liveUser.name}'s Transactions:</h5>

            {liveUser.trans.map((vary, i) => (
              <p key={i}>{vary}</p>
            ))}
                       
          </div>
        }/>    
    )}
    }
 
  return (
    <>
    <h3>Account Information</h3>
    <br/>
    <div>
      {users()}
    </div>
    </>
  )
}
