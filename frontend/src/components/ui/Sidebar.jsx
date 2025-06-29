import { Link } from "react-router";

export const Sidebar = () => {
  return (
    <section>
      <div className="w-[250px] h-full text-center flex flex-col">
        <div className="py-5 px-2 border-b-1 border-r-1">
          <Link to="/">Logo</Link>
        </div>
        <div className="border-r-1 flex flex-col flex-1 justify-center">
          <ul className="grid grid-col-1 gap-15 content-center">
            <li>Dashboard</li>
            <li>Add Word</li>
            <li>Word Bank</li>
            <li>Practice</li>
            <li>Settings</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
