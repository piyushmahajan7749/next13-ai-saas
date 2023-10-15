"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { collection, getDocs } from "firebase/firestore";
import { Project } from "@/app/(dashboard)/(routes)/dashboard/page";
import { db } from "@/app/firebase/firebase";

export const ProjectsBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      await getDocs(collection(db, "projects")).then((querySnapshot) => {
        const newData: Project[] = querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Project, "id">), // Cast the data to omit the 'id' field
          id: doc.id,
        }));
        setProjects(newData);
      });
    };

    fetchProjects();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div style={{ width: "120px", marginRight: "20px" }}>
      <Select value="Projects" defaultValue="Projects">
        <SelectTrigger />
        <SelectContent>
          <SelectItem value="Projects">Projects</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
