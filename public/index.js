function Spa() {
  return (
    <HashRouter>
      <NavBar/>
      <UserContext.Provider value={{currentUser:[]}}>
        <div className="container" style={{padding: "20px"}}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/Login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>      
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);


// /* <Route path="/balance/" component={Balance} /> */
// /* <Route path="/login/" component={Login} /> */
