import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
  getAllTicketsforTheUser,
  getAllCreatedTicketsforTheUser,
  filterTickets,
  resetTicketList,
} from "../redux/slices/TicketSlice";

function useTickets() {
  const authState = useSelector((state) => state.auth);
  const ticketState = useSelector((store) => store.tickets);
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  async function loadTickets() {
    if (ticketState.downloadedTickets.length == 0) {
      if (authState.role === "customer") {
        await dispatch(getAllCreatedTicketsforTheUser());
      } else {
        await dispatch(getAllTicketsforTheUser());
      }
    }
    if (searchParams.get("status")) {
      // dispatch a filter action
      dispatch(filterTickets({ status: searchParams.get("status") }));
    } else {
      dispatch(resetTicketList());
    }
  }
  useEffect(() => {
    loadTickets();
  }, [authState.token, searchParams.get("status")]);

  return [ticketState];
}

export default useTickets;
