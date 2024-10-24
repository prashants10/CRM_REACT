import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../redux/slices/TicketSlice";

function TicketDetailsModal({ ticket,resetTable}) {
  const [currentTicket, setCurrentTicket] = useState(ticket);
  const dispatch = useDispatch();

  function handleTicketChange(e) {
    const { name, value } = e.target;
    setCurrentTicket({
      ...currentTicket,
      [name]: value,
    });
  }

  async function handleFormSubmit() {
    const response = await dispatch(updateTicket(currentTicket));
    const modal = document.getElementById("my_modal_2");
    if (response?.payload?.data) {
      modal.close();
      resetTable();
    }
  }
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{currentTicket?.title}</h3>
          <textarea
            className="bg-white text-black my-2 rounded-lg resize-none p-2 w-full"
            name="description"
            onChange={handleTicketChange}
            cols="50"
            rows="7"
            value={currentTicket?.description}
          ></textarea>
          <h1 className="text-lg mb-4 text-white">
            Priority:
            <select
              className="select select-info mx-2"
              name="priority"
              onChange={handleTicketChange}
            >
              <option selected={currentTicket?.priority == 1}>1</option>
              <option selected={currentTicket?.priority == 1}>2</option>
              <option selected={currentTicket?.priority == 1}>3</option>
              <option selected={currentTicket?.priority == 1}>4</option>
            </select>
          </h1>
          <h1 className="text-lg text-white">
            Status:
            <select
              className="select select-info mx-2"
              name="status"
              onChange={handleTicketChange}
            >
              <option selected={currentTicket?.status == "open"}>open</option>
              <option selected={currentTicket?.status == "inProgress"}>
                inProgress
              </option>
              <option selected={currentTicket?.status == "resolved"}>
                resolved
              </option>
              <option selected={currentTicket?.status == "cancelled"}>
                cancelled
              </option>
              <option selected={currentTicket?.status == "onHold"}>
                onHold
              </option>
            </select>
          </h1>
          <div className="flex justify-end">
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Update
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default TicketDetailsModal;
