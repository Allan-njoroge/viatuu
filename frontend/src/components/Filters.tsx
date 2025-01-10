import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiFilter } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useLocation } from "react-router";

const Filters = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((part) => part);

  return (
    <>
      <div className="bg-primary py-10 md:py-5 ">
        {/* === top section === */}
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col md:flex-row gap-5 md:justify-between md:items-center">
          {/* ===== Breadcrumb ===== */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <BreadcrumbPage>HOME</BreadcrumbPage>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {paths.map((item, index) => (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink key={index} href={item}>
                      <BreadcrumbPage>{item.toUpperCase()}</BreadcrumbPage>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex gap-3">
            {/* ===== Dropdown Menu ===== */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
                Sort
                <CiFilter />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="grid gap-2 px-4">
                <DropdownMenuItem>Price: From High to Low</DropdownMenuItem>
                <DropdownMenuItem>Price: From Low to High</DropdownMenuItem>
                <DropdownMenuItem>Rating: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Rating: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Latest</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* === Filters Section === */}
            <Sheet>
              <SheetTrigger className="flex items-center gap-2 bg-background px-4 py-2 rounded-md">
                <TbAdjustmentsHorizontal />
                Filters
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
