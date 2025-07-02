import { Flex, TabNav } from "@radix-ui/themes";
import { Link, NavLink } from "react-router";

export const Sidebar = () => {
  // const menu = [
  //   {
  //     label: "Dashboard",
  //     link: "/dashboard",
  //   },
  //   {
  //     label: "Add Word",
  //     link: "/dashboard/add-word",
  //   },
  //   {
  //     label: "Word Bank",
  //     link: "/dashboard/word-bank",
  //   },
  //   {
  //     label: "Practice",
  //     link: "/dashboard/practice",
  //   },
  //   {
  //     label: "Settings",
  //     link: "/dashboard/settings",
  //   }
  // ];

  return (
    <section>
      <div className="w-[250px] h-full text-center flex flex-col">
        <div className="py-5 px-2 border-b-1 border-r-1">
          <Link to="/">Logo</Link>
        </div>
        <div className="border-r-1 flex flex-col flex-1 justify-center">
          {/* <TabNav.Root color="orange">
            <Flex direction="column" align="center" justify="center">
              {menu?.map((item, index) => (
                <TabNav.Link key={index}>
                  <NavLink to={item.link}>{item.label}</NavLink>
                </TabNav.Link>
              ))}
            </Flex>
          </TabNav.Root> */}
          <ul className="grid grid-col-1 gap-15 content-center">

            <li className="cursor-pointer">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>

            <li className="cursor-pointer">
              <NavLink to="/dashboard/add-word">Add Word</NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink to="/dashboard/word-bank">Word Bank</NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink to="/dashboard/practice">Practice</NavLink>
            </li>
            <li className="cursor-pointer">
              <NavLink to="/dashboard/settings">Settings</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
