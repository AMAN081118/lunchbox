import React from "react";
import Header from "./(components)/layout/Header";
import SearchBar from "./(components)/ui/landing-page/SearchBar";
import Offers from "./(components)/ui/landing-page/Offers";
import Recommendation from "./(components)/ui/landing-page/Recommendation";
import Footer from "./(components)/layout/Footer";

const page = () => {
  return (
    <div>
      {/* <Header /> */}
      <SearchBar />
      <Offers />
      <Recommendation />
      <Footer />
    </div>
  );
};

export default page;
