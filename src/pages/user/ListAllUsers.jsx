import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosInstance from "../../config/axiosInstance";

import HomeLayout from "../../Layout/HomeLayout";
import UserDetailsModal from "../../component/UserDetailsModal";

function ListAllUsers() {
  const [userList, setUserList] = useState([]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    userStatus: "",
    userType: "",
    clientName: "",
    id: "",
  });

  const columns = [
    {
      name: "User Id",
      selector: (row) => row._id,
      reorder: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      reorder: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      reorder: true,
    },
    {
      name: "Status",
      selector: (row) => row.userStatus,
      reorder: true,
    },
    {
      name: "Type",
      selector: (row) => row.userType,
      reorder: true,
      sortable: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#4b4e69",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#4b4e69",
        color: "white",
        fontSize: "16px",
      },
    },
  };

  async function loadUsers() {
    const response = await axiosInstance.get("/users", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    setUserList(response?.data?.result);
  }

  useEffect(() => {
    loadUsers();
  }, []);
  
  return (
    <HomeLayout>
      <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
        All Users{" "}
      </div>{" "}
      <DataTable
        columns={columns}
        data={userList}
        customStyles={customStyles}
        onRowClicked={(row) => {
          setUser({
            name: row.name,
            clientName: row.clientName,
            email: row.email,
            userStatus: row.userStatus,
            userType: row.userType,
            id: row._id,
          });
          document.getElementById("my_modal_1").showModal();
        }}
      />
      <UserDetailsModal user={user} key={user.email} resetTable={loadUsers} />
    </HomeLayout>
  );
}

export default ListAllUsers;
