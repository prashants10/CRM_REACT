import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useTickets from "../../hooks/useTickets";

import DataTable from "react-data-table-component";
import HomeLayout from "../../Layout/HomeLayout";
import TicketDetailsModal from "../../component/TicketDetailsModal";
import { filterTickets } from "../../redux/slices/TicketSlice";

function Dashboard() {
  const [ticketState] = useTickets();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [selectedTicket, setSelectedTicket] = useState();

  const columns = [
    {
      name: "Ticket Id",
      selector: (row) => row._id,
      reorder: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      reorder: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      reorder: true,
    },
    {
      name: "Reporter",
      selector: (row) => row.assignedTo,
      reorder: true,
    },
    {
      name: "Priority",
      selector: (row) => row.ticketPriority,
      reorder: true,
      sortable: true,
    },
    {
      name: "Assignee",
      selector: (row) => row.assignee,
      reorder: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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

  function handleLoadTickets() {
    if (searchParams.get("status")) {
      dispatch(filterTickets({ status: searchParams.get("status") }));
    }
  }

  return (
    <HomeLayout>
      <div className="bg-yellow-500 w-full text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
        Tickets Records{" "}
      </div>{" "}
      {ticketState && (
        <DataTable
          onRowClicked={(row) => {
            setSelectedTicket(row);
            document.getElementById("my_modal_2").showModal();
          }}
          columns={columns}
          data={ticketState.ticketList}
          customStyles={customStyles}
        />
      )}
      <TicketDetailsModal
        ticket={selectedTicket}
        key={selectedTicket?._id}
        resetTable={handleLoadTickets}
      />
    </HomeLayout>
  );
}

export default Dashboard;
