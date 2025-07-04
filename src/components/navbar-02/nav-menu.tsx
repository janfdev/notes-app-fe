// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Button } from "../ui/button";

export const NavMenu = (props: NavigationMenuProps) => (
  <div {...props}>
    <div className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      <div className="flex md:flex-row flex-col">
        <div>
          <a href="#">
            <Button variant={"link"}>Features</Button>
          </a>
        </div>
        <div>
          <a href="#">
            <Button variant={"link"}>How it Works</Button>
          </a>
        </div>
        <div>
          <a href="#">
            <Button variant={"link"}>Contact</Button>
          </a>
        </div>
      </div>
    </div>
  </div>
);
