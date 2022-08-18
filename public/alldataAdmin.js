function AllData(){
  const [data, setData] = React.useState(null);
  const ctx = React.useContext(UserContext);
  console.log(ctx.users[0].email);

  React.useEffect(() => {
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
          console.log(data);
          setData(data);
      });
  }, []);

  function dollar (index) {
    return `Current Balance: $${data[index].balance}`;
  }

  function info (index) {
    return(
      <div>
        <h5 className="fw-bold">Name: {data[index].name}</h5>
        <h5 className="fw-bold">Email: {data[index].email}</h5>
        <h5 className="fw-bold">Password: {data[index].password}</h5>
      </div>
    )
  }
  // TO SHOW ALL USERS IN DB
  function users() {
    if (data != null) {
    return(
    data.map((variations, index) => (
      <Card
        key={variations.name}
        txtcolor="black"
        header={info(index)}
        title={dollar(index)}
        body={
          <div>
            <h5>{variations.name}'s Transactions:</h5>

            {variations.trans.map((vary, i) => (
              <p key={i}>{vary}</p>
            ))}
                       
          </div>
        }/>    
    ))
    )}
  }
 
  return (
    <>
    <h3>Users</h3>
    <br/>
      {users()}
    </>
  )
}



TO SHOW ALL USERS AND DATA
function users() {
  if (data != null) {
  return(
  data.map((variations, index) => (
    <Card
      key={variations.name}
      txtcolor="black"
      header={info(index)}
      title={dollar(index)}
      body={
        <div>
          <h5>{variations.name}'s Transactions:</h5>

          {variations.trans.map((vary, i) => (
            <p key={i}>{vary}</p>
          ))}
                     
        </div>
      }/>    
  ))
  )}
}