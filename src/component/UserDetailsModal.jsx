import { useState } from "react";
import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({ user, resetTable }) {
  const [userDetails, setUserDetails] = useState(user);

  function handleUserChange(e) {
    try {
      const ul = e.target.parentNode.parentNode;
      const name = ul.getAttribute("name");
      const dropdown = document.getElementById(`${name}Dropdown`);
      dropdown.open = !dropdown.open;
      setUserDetails({
        ...userDetails,
        [name]: e.target.textContent.toLowerCase(),
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdateUser() {
    try {
      const response = await axiosInstance.patch(
        "/user/updateUser",
        {
          userId: userDetails.id,
          updates: userDetails
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      if(response?.data?.result) {
        resetTable();
        document.getElementById("my_modal_1").close();

      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center text-white">
          User Details
        </h3>
        <p className="py-4 text-white">
          Name : <span className="text-yellow-500">{userDetails?.name}</span>
        </p>
        <p className="py-4 text-white">
          Email : <span className="text-yellow-500">{userDetails?.email}</span>
        </p>
        <p className="py-4 text-white">
          Type :
          <span className="text-yellow-500">
            <details className="dropdown mx-2 " id="userTypeDropdown">
              <summary className="btn text-yellow-500">
                {userDetails?.userType}
              </summary>
              <ul
                onClick={handleUserChange}
                name="userType"
                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 border border-primary text-white rounded-box w-52"
              >
                <li className="text-yellow-500">
                  <a>Customer</a>
                </li>
                <li className="text-yellow-500">
                  <a>Engineer</a>
                </li>
                <li className="text-yellow-500">
                  <a>Admin</a>
                </li>
              </ul>
            </details>{" "}
          </span>
        </p>
        <p className="py-4 text-white">
          Status :
          <span className="text-yellow-500">
            <details className="dropdown mx-2" id="userStatusDropdown">
              <summary className="btn text-yellow-500">
                {userDetails?.userStatus}
              </summary>
              <ul
                onClick={handleUserChange}
                name="userStatus"
                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 border border-primary  text-white rounded-box w-52"
              >
                <li className="text-yellow-500">
                  <a>Approved</a>
                </li>
                <li className="text-yellow-500">
                  <a>Rejected</a>
                </li>
                <li className="text-yellow-500">
                  <a>Suspended</a>
                </li>
              </ul>
            </details>{" "}
          </span>
        </p>
        <p className="py-4 text-white">
          Client Name :{" "}
          <span className="text-yellow-500">{userDetails?.clientName}</span>
        </p>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleUpdateUser}>Update</button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default UserDetailsModal;
