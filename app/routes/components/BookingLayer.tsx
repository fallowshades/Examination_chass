import { Suspense } from "react";
import RoomList from "./RoomList";

type BookingLayerProps = {
  layer: {
    groupId: string;
    id: string;
    rooms: any[];
  };
};

const BookingLayer = ({ layer }: BookingLayerProps) => (
    console.log(layer),
  <Suspense fallback={<p>Loading layer...</p>}>
    <div className="w-1/2  p-4 border-r last:border-r-0  border-yellow'>
       ">
      <div className="flex justify-center">
        <div>
          <h1 className="text-xl font-bold">{layer.groupId} rum</h1>
          <h1 className="text-xl font-bold">Våning {layer.id}</h1>
        </div>
      </div>
      <div className="flex">
        <div className="container">
          <RoomList rooms={layer.rooms} />
        </div>
      </div>
    </div>
  </Suspense>
);

export default BookingLayer;