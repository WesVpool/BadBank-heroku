function NavBar() {
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Back to the Homepage!" href="#/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Create a new account!" href="#/CreateAccount/">
                  Create Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Login to your account!" href="#/login/">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Deposit money to your account!" href="#/deposit/">
                  Deposit
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Withdraw money from your account!" href="#/withdraw/">
                  Withdraw
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tooltip" data-placement="bottom" title="All users information" href="#/alldata/">
                  AllData
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
