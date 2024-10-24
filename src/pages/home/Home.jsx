import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import HomeLayout from "../../Layout/HomeLayout";
import Card from "../../component/Card";
import useTickets from "../../hooks/useTickets";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function Home() {
  const [ticketState] = useTickets();

  const pieChartData = {
    labels: ["Open", "In Progress", "Resolved", "On Hold", "Closed"],
    fontColor: "white",
    datasets: [
      {
        data: [
          ticketState.ticketDistribution.open,
          ticketState.ticketDistribution.inProgress,
          ticketState.ticketDistribution.resolved,
          ticketState.ticketDistribution.onHold,
          ticketState.ticketDistribution.cancelled,
        ],
        backgroundColor: [
          "rgb(253 224 71 / 1)",
          "rgb(253 186 116 / 1)",
          "rgb(216 180 254 / 1)",
          "rgb(209 213 219 / 1)",
          "rgb(147 197 253 / 1)",
        ],
        borderColor: [
          "rgb(253 224 71 / 1)",
          "rgb(253 186 116 / 1)",
          "rgb(216 180 254 / 1)",
          "rgb(209 213 219 / 1)",
          "rgb(147 197 253 / 1)",
        ],
      },
    ],
  };
  
  return (
    <HomeLayout>
      {ticketState && ticketState.ticketList.length > 0 && (
        <>
          <div className="mt-10 flex flex-row justify-center items-center gap-5 flex-wrap">
            <Card
              titleText="Open"
              status={
                (ticketState.ticketDistribution.open /
                  ticketState.ticketList.length) *
                100
              }
              quantity={ticketState.ticketDistribution.open}
              background="bg-yellow-300"
              borderColor="border-green-300"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <BsFillPencilFill className="inline mr-2" />
            </Card>
            <Card
              titleText="In Progress"
              status={
                (ticketState.ticketDistribution.inProgress /
                  ticketState.ticketList.length) *
                100
              }
              quantity={ticketState.ticketDistribution.inProgress}
              background="bg-orange-300"
              borderColor="border-red-300"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <TbProgressBolt className="inline mr-2" />
            </Card>
            <Card
              titleText="Resolved"
              status={
                (ticketState.ticketDistribution.resolved /
                  ticketState.ticketList.length) *
                100
              }
              quantity={ticketState.ticketDistribution.resolved}
              background="bg-purple-300"
              borderColor="border-blue-700"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <MdOutlineDoneAll className="inline mr-2" />
            </Card>
            <Card
              titleText="On Hold"
              status={
                (ticketState.ticketDistribution.onHold /
                  ticketState.ticketList.length) *
                100
              }
              quantity={ticketState.ticketDistribution.onHold}
              background="bg-gray-300"
              borderColor="border-gray-800"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <MdPending className="inline mr-2" />
            </Card>
            <Card
              titleText="Cancelled"
              status={
                (ticketState.ticketDistribution.cancelled /
                  ticketState.ticketList.length) *
                100
              }
              quantity={ticketState.ticketDistribution.cancelled}
              background="bg-blue-300"
              borderColor="border-violet-300"
              fontColor="text-black"
              dividerColor="bg-black"
            >
              <MdCancel className="inline mr-2" />
            </Card>
          </div>
          <div className="h-[20rem] w-[20rem] m-auto my-10">
            <Pie data={pieChartData} />
          </div>
        </>
      )}
    </HomeLayout>
  );
}

export default Home;
