import { NavLink } from "react-router-dom"

const Nav = () => {
  return (
    <header className="head-nav">
      <h3>Green Forest</h3>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/parks">Parks</NavLink>
        <NavLink to="/addpark">Add Park</NavLink>
      </nav>
    </header>
  )
}

export default Nav
