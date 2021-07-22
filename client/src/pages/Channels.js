import channels from "../fakeData/channels.json";
import { Table } from "reactstrap";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import Headers from "./Headers";

const Channels = () => {

  return (
    <main role="main">
		<div className="container">
		<Headers size="small" />

      <Table responsive className="table table-color table-bordered">
        <thead className="text-center">
          <TableHead />
        </thead>
        <tbody className="text-center">
          {channels.map((channel, index) => (
            <TableRow channel={channel} key={index} />
          ))}
        </tbody>
      </Table>
	  </div>
    </main>
  );
};

export default Channels;
