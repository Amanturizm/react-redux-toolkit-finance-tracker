import React, { PropsWithChildren } from 'react';
import NavBar from "../Navbar/Navbar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
     <header>
       <NavBar />
     </header>

      <main className="container-fluid" style={{ paddingTop: 60 }}>
        {children}
      </main>
    </>
  );
};

export default Layout;