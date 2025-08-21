import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import Locations from '../components/Locations';

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchBar />
      <HowItWorks />
      <WhyChooseUs />
      <Locations /> {/* Dynamic all India */}
    </div>
  );
};

export default Home;