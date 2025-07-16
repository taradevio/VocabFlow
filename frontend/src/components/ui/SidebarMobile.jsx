import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import { NavLink } from "react-router";

export const SidebarMobile = () => {
  return (
    <section>
      <div className="block lg:hidden ps-5 pe-5 py-5">
        <div>
          <NavLink to="/">Logo</NavLink>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h2>Analytics</h2>
          </div>
          <div>
            <DropdownMenu.Root on>
              <DropdownMenu.Trigger>
                <Button>
                  Menu
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <NavLink to="/dashboard/analytics">Analytics</NavLink>
                </DropdownMenu.Item>

                <DropdownMenu.Item>
                  <NavLink to="/dashboard/add-word">Add Word</NavLink>
                </DropdownMenu.Item>

                <DropdownMenu.Item>
                  <NavLink to="/dashboard/word-bank">Word Bank</NavLink>
                </DropdownMenu.Item>

                <DropdownMenu.Item>
                  <NavLink to="/dashboard/practice">Practice</NavLink>
                </DropdownMenu.Item>

                <DropdownMenu.Item>
                  <NavLink to="/dashboard/settings">Settings</NavLink>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </section>
  );
};
