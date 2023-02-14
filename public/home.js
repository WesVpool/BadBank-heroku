function Home(){

  const [login, setLogin]       = React.useState('');
  const [name, setName]         = React.useState('');

  const liveUser = JSON.parse(window.sessionStorage.getItem("liveUser"));


  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      setLogin(false)
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

  return (
    <Card
      txtcolor="black"
      header= "Welcome to United Bad Bank!"
      title= "You can move around using the navigation bar above."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
