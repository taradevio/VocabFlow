export const Navbar = () => {
  return (
    <header>
      <div className="border-1 border-[#4F46E5] text-white fixed bottom-5 w-xs rounded-lg py-3 left-[50%] translate-x-[-50%] bg-[#4F46E5] sm:bottom-auto sm:top-5">
        <nav>
          <ul className="flex justify-center items-center gap-7">
            <div>
              <img src="/logo-demo.png" alt="website icon"/>
            </div>
            <li>Features</li>
            <li>Why It Works</li>
            <li>FAQ</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
