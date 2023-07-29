import React from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg bg-primary position-fixed w-100 z-1 px-5">
      <div className="d-flex w-100">
        <Link className="navbar-brand text-white" to="">
          Finance Tracker
        </Link>
      </div>

      <div className="d-flex align-items-center gap-4 me-5">
        {
          pathname.includes('/categories') ?
            <Link
              to="/"
              className="text-white text-nowrap text-decoration-none fs-5"
            >
              Transactions
            </Link>
          :
            <>
              <NavLink
                to="categories"
                className="text-white text-nowrap text-decoration-none fs-5"
              >
                Categories
              </NavLink>
              <NavLink
                to="add-transaction"
                className="text-white text-nowrap text-decoration-none fs-5"
              >
                Add
              </NavLink>
            </>
        }
      </div>
    </nav>
  );
};

export default NavBar;