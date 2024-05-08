import HeaderMobile from "@/components/navigation/header-mobile";
import MarginWidthWrapper from "@/components/navigation/margin-width-wrapper";
import PageWrapper from "@/components/navigation/page-wrapper";
import SideNav, { NavProps } from "@/components/navigation/side-nav";
import { fetchUserMetadata, fetchUserRole } from "@/utils/user";
import {
    BellDot,
    LayoutDashboard,
    Receipt,
    TrendingUp,
    Users,
    UsersRound,
    Waypoints,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0; // revalidate at most every hour

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const userData = await fetchUserMetadata();
    const userRole = await fetchUserRole();
    const NAV_ITEMS: NavProps = {
        root: {
            label: "Admin Panel",
            path: "/admin",
        },
        pages: [
            {
                title: "Dashboard",
                path: "/admin",
                icon: <LayoutDashboard width="18" height="18" />,
            },
            {
                title: "Routes",
                path: "/admin/routes",
                icon: <Waypoints width="18" height="18" />,
                submenu: true,
                subMenuItems: [
                    {
                        title: "Offers",
                        path: "/admin/routes/offers",
                    },
                    {
                        title: "Targets Routes",
                        path: "/admin/routes/targets",
                    },
                    {
                        title: "Purchase Requests",
                        path: "/admin/routes/purchase_requests",
                    },
                ],
            },

            {
                title: "Marketing",
                path: "/admin/marketing",
                icon: <TrendingUp width="18" height="18" />,
            },
            {
                title: "Users",
                path: "/admin/users",
                icon: <UsersRound width="18" height="18" />,
                submenu: true,
                subMenuItems: [
                    {
                        title: "Clients",
                        path: "/admin/users/clients",
                    },
                    {
                        title: "Vendors",
                        path: "/admin/users/vendors",
                    },
                ],
            },
            {
                title: "Team",
                path: "/admin/team",
                icon: <Users width="18" height="18" />,
                submenu: true,
                subMenuItems: [
                    {
                        title: "Managers",
                        path: "/admin/team/managers",
                    },
                    {
                        title: "Accounts",
                        path: "/admin/team/accounts",
                    },
                    {
                        title: "Sales",
                        path: "/admin/team/sales",
                    },
                    {
                        title: "NOC",
                        path: "/admin/team/noc",
                    },
                    {
                        title: "Tech",
                        path: "/admin/team/tech",
                    },
                ],
            },
            {
                title: "Finances",
                path: "/admin/finance",
                icon: <Receipt width="18" height="18" />,
                submenu: true,
                subMenuItems: [
                    {
                        title: "Invoices",
                        path: "/admin/finance/invoices",
                    },
                ],
            },
            {
                title: "Notifications",
                path: "/admin/notifications",
                icon: <BellDot width="18" height="18" />,
            },
        ],
    };

    return (
        // <section className="w-full h-screen overflow-hidden relative ">
        //     <AdminNav userRole={userRole} user={userData} />
        //     <div className="flex h-screen mt-[68px] md:mt-0 md:ml-64 md:py-5 bg-surface overflow-y-auto">
        //         <div className="flex-1 px-5 md:px-6 md:py-5 pb-24 pt-5 bg-white md:rounded-l-xl relative overflow-y-auto">
        //             {children}
        //         </div>
        //     </div>

        // </section>
        <div className="flex">
            <SideNav navItems={NAV_ITEMS} user={userData} />
            <main className="flex-1">
                <MarginWidthWrapper>
                    {/* <Header /> */}
                    <HeaderMobile />
                    <PageWrapper>{children}</PageWrapper>
                </MarginWidthWrapper>
            </main>
        </div>
    );
}
