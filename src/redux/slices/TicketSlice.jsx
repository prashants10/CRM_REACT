import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

export const getAllCreatedTicketsforTheUser = createAsyncThunk(
  "tickets/getMyCreatedTickets",
  async () => {
    try {
      const response = axiosInstance.get("getMyCreatedTickets", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllTicketsforTheUser = createAsyncThunk(
  "/tickets/getMyCreatedTickets",
  async () => {
    try {
      const response = await axiosInstance.get("getMyAssignedTickets", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return await response;
    } catch (err) {
      console.log(err);
    }
  }
);

export const updateTicket = createAsyncThunk(
  "/ticket/update",
  async (ticket) => {
    try {
      const response = axiosInstance.patch(
        `ticket/${ticket._id}`,
        ticket, // req body
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      return await response;
    } catch (err) {
      console.log(err);
    }
  }
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    ticketList: [],
    downloadedTickets: [],
    ticketDistribution: {
      open: 0,
      inProgress: 0,
      resolved: 0,
      cancelled: 0,
      onHold: 0,
    },
  },
  reducers: {
    filterTickets: (state, action) => {
      let status = action.payload.status.toLowerCase();
      if (status == "in progress") status = "inProgress";
      if (status == "on hold") status = "onHold";
      state.ticketList = state.downloadedTickets.filter(
        (ticket) => ticket.status === status
      );
    },
    resetTicketList: (state) => {
      state.ticketList = state.downloadedTickets;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTicketsforTheUser.fulfilled, (state, action) => {
        state.ticketDistribution = {
          open: 0,
          inProgress: 0,
          resolved: 0,
          cancelled: 0,
          onHold: 0,
        };
        state.downloadedTickets = action?.payload?.data?.result;
        state.ticketList = action?.payload?.data?.result;
        state.downloadedTickets.forEach((ticket) => {
          state.ticketDistribution[ticket.status] = state.ticketDistribution[
            ticket.status
          ]
            ? state.ticketDistribution[ticket.status] + 1
            : 1;
        });
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        if (action?.payload?.data) {
          const updatedTicket = action.payload.data.result;
          state.ticketList = state.ticketList.map((ticket) => {
            if (ticket._id == updatedTicket._id) return updatedTicket;
            return ticket;
          });
          state.downloadedTickets = state.downloadedTickets.map((ticket) => {
            if (ticket._id == updatedTicket._id) return updatedTicket;
            return ticket;
          });

          state.ticketDistribution = {
            open: 0,
            inProgress: 0,
            resolved: 0,
            cancelled: 0,
            onHold: 0,
          };
          state.downloadedTickets.forEach((ticket) => {
            state.ticketDistribution[ticket.status] =
              state.ticketDistribution[ticket.status] + 1;
          });
        }
      });
  },
});

export const { filterTickets, resetTicketList } = ticketSlice.actions;
export default ticketSlice.reducer;
