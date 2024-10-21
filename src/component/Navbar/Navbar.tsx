'use client'
import Image from "next/image";
import Link from "next/link";
import MobileNav from "../MobileNav";
import {
  DownOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown  } from "antd";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session ,status} = useSession()
console.log("session",session,"status",status)
  const styles = {
    wrapper: {
      margin: "10px",
      borderRadius: "5px",
    },
    label: {
      cursor: "pointer",
    },

  };
  const items = [
    {
      key: "1",
      label: (
        <div style={styles.wrapper}>
          <label style={styles.label}>
            <HomeOutlined /> <span style={{ paddingLeft: "5px" }}>Home</span>
          </label>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div style={styles.wrapper}>
          <label onClick={() => signOut()}>
            <LogoutOutlined />{" "}
            <span style={{ paddingLeft: "5px" }}>Logout</span>
          </label>
        </div>
      ),
    },
  ];
  return (
    <nav className="flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logoWeb.png"
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          YOGUS
        </p>
      </Link>
      <div className="flex-between gap-5">
      <Dropdown menu={{ items }}>
            <a >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="avatar">
                {status === "loading" ? ( 
                  <p>Loading...</p>
                ) : session ? ( 
                  <p>
                    Welcome, {session.user?.name || session.user?.email}
                    <Avatar size="large" icon={<UserOutlined />} />
                  </p>
                ) : (
                  <p>Please log in</p>
                )}
                </div>
                <div
                  style={{
                    padding: "0 6px",
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "500",
                    textTransform: "uppercase",
                  }}
                >
                  {" "}
                  <DownOutlined />
                </div>
              </div>
            </a>
          </Dropdown>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
