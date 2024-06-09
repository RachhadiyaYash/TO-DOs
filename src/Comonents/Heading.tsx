import React from "react";

const Header: React.FC = () => {
  return (
    <>
      <header className="bg-red-800 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl text-white font-bold font-mono text-center">
            My To-Do App
          </h1>
        </div>
      </header>
    </>
  );
};

export default Header;
