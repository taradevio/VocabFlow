import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Benefits } from "./components/Why";
import { Questions } from "./components/FAQ";
import { CTA } from "./components/CTA";

function App() {
  return (
    <div className="ps-3 pe-3 max-w-7xl">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Questions />
      <CTA />
    </div>
  );
}

export default App;
