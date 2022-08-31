function Home(){
  const [login, setLogin]       = React.useState('');
  const [name, setName]         = React.useState('');
  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));


  firebase.auth().onAuthStateChanged((user) => {
    // console.log(liveUser);
    if (!user) {
      setLogin(false)
    }
  }); 

  React.useEffect(() => {
    // // console.log(liveUser);
    if (liveUser !== null){
      setName(liveUser.name);
      setLogin(true);
    };
    if (login === true){
      const navUser = document.getElementById("login");
      navUser.textContent = `${getRandomGreet()} ${name}!`;
      navUser.title = "Logout of your account!";
    } else {
      const navUser = document.getElementById("login");
      navUser.textContent = "Login";
      navUser.title = "Login of your account!";
    }

  }, [login]);

  return (
    <Card
      txtcolor="black"
      header="United Bad Bank"
      title="Welcome to United Bad Bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
