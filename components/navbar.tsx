import { UserButton } from "@clerk/nextjs";

import { MobileSidebar } from "@/components/mobile-sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { ProjectsBar } from "./projects-bar";

const Navbar = async () => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end w-1/3">
        {/* <div style={{ width: "120px", marginRight: "20px" }}>
          <Select value="Projects" defaultValue="Projects" name="Projects">
            <SelectTrigger />
            <SelectContent>
              <SelectItem value="Projects">Projects</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
