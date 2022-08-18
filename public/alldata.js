function AllData(){
  const ctx = React.useContext(UserContext);
  const [data, setData]         = React.useState(null);
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [amount, setAmount]     = React.useState('');

  const [email, setEmail]       = React.useState(()=>{
    if(ctx.users[0] !== undefined){
    return ctx.users[0].email}});

  // const [name, setName]         = React.useState(()=>{
  //   if(data !== null){
  //   return data[0].name}});

  // const [password, setPassword] = React.useState(()=>{
  //   if(data !== null){
  //   return data[0].password}});
  
  // const [balance, setBalance]   = React.useState(()=>{
  //   if(data !== null){
  //   return data[0].balance}});

  // const [trans, setTrans]       = React.useState(()=>{
  //   if(data !== null){
  //   return data[0].trans}});

  if(email == null){
    return(
      <div>
        <h5>USER NOT LOGGED IN!</h5>
          <a href="#/login/" className="btn btn-light" >Login</a>
      </div>)
  };

  React.useEffect(() => {
        
    // fetch all accounts from API
    fetch(`/account/find/${email}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setData(data);                
        });

  }, []);


  
  // fetch(`/account/find/${email}`)
  // .then(response => response.text())
  // .then(text => {
  //         const data = JSON.parse(text);
  //         console.log(data);
  //         // setStatus(JSON.stringify(data.value));
  //         setData(data);
  //         // setName(data[0].name);
  //         // setEmail(data[0].email);
  //         // setPassword(data[0].password);
  //         // setBalance(data[0].balance);
  //         // setTrans(data[0].trans);
  //     } 
  // );

  // fetch(`/account/find/${email}`)
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data);
  //         setData(data);
  //         setName(data[0].name);
  //         setEmail(data[0].email);
  //         setPassword(data[0].password);
  //         setBalance(data[0].balance);
  //         setTrans(data[0].trans);
  //     });

  function dollar () {
    return `Current Balance: $${data[0].balance}`;
  }

  function info () {
    return(
      <div>
        <h5 className="fw-bold">Name: {data[0].name}</h5>
        <h5 className="fw-bold">Email: {data[0].email}</h5>
        <h5 className="fw-bold">Password: {data[0].password}</h5>
      </div>
    )
  }

  // function tmap () {
  //   return (
  //     <div>
  //       <h5>{name}'s Transactions</h5>
  //       {trans.map((vary, i) => (
  //         <p key={i}>{vary}</p>))}
  //     </div>
  // )}

  // return (
  //   <Card
  //   bgcolor="primary"
  //   header= {info()}
  //   title={dollar()}
  //   status={status}
  //   body={show ? (  
  //             [tmap]        
  //         ):(
  //           <>
  //           <div>
  //             <h5>USER NOT LOGGED IN!</h5>
  //             <a href="#/login/" className="btn btn-light" >Login</a>
  //           </div>
  //           </>
  //         )}
  // />
  // )

//   return(
//     <Card
//       key={name}
//       txtcolor="black"
//       header={info()}
//       title={dollar()}
//       body={
//         <div>
//           <h5>{name}'s Transactions:</h5>

//           {trans.map((vary, i) => (
//             <p key={i}>{vary}</p>
//           ))}
                     
//         </div>
//       }/>    
//   )
// }
  function users() {
    if(data != null){
    return(
      <Card
        bgcolor="white"
        txtcolor="black"
        header={info()}
        title={dollar()}
        body={
          <div>
            <h5>{data[0].name}'s Transactions:</h5>

            {data[0].trans.map((vary, i) => (
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
