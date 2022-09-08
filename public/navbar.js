function NavBar(login) {

  React.useEffect(() => {
    let active = window.location.hash.replace(/[#/]/g, "").toLowerCase();
    if (active === ""){
      active = "home"
    }
    const id = document.getElementById(active);
    id.className = "nav-link active"
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            United Bad Bank
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" 
                  id="home" 
                  data-toggle="tooltip" 
                  data-placement="bottom" 
                  title="Back to the Homepage!" 
                  href="#/" 
                  onClick={e => active(e)}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" 
                  id="createaccount" 
                  data-toggle="tooltip" 
                  data-placement="bottom" 
                  title="Create a new account!" 
                  href="#/CreateAccount/" 
                  onClick={e => active(e)}>
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" 
                  id="deposit"
                  data-toggle="tooltip" 
                  data-placement="bottom" 
                  title="Deposit money to your account!" 
                  href="#/Deposit/" 
                  onClick={e => active(e)}>
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" 
                  id="withdraw" 
                  data-toggle="tooltip" 
                  data-placement="bottom" 
                  title="Withdraw money from your account!" 
                  href="#/Withdraw/" 
                  onClick={e => active(e)}>
                  Withdraw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" 
                  id="transfer" 
                  data-toggle="tooltip" 
                  data-placement="bottom" 
                  title="Send money to another person!" 
                  href="#/Transfer/" 
                  onClick={e => active(e)}>
                  Transfer
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" 
                  id="alldata" 
                  data-toggle="tooltip" 
                  data-placement="bottom" 
                  title="Account Information" 
                  href="#/Alldata/" 
                  onClick={e => active(e)}>
                  Account
                </a>
              </li>
            </ul>
            <span>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" 
                    id="login" 
                    data-toggle="tooltip" 
                    data-placement="bottom" 
                    title="Login to your account!" 
                    href="#/Login/" 
                    onClick={e => active(e)}>
                    Login
                  </a>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
