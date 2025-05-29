import { useLoaderData, useRouteLoaderData } from "react-router";
//import type { LoaderData } from "../+types/home"; // Assuming this is where the type is defined

// import RoomList from "./RoomList";
//import type { LoaderData } from "../+types/home";
import { Await } from "react-router";
const GroupedBookings = () =>{ 

const { bigB, smallA } = useLoaderData() as {
    bigB: any[];
    smallA: any[];
  };
  return (
    <div  className='w-1/2  p-4 border-r last:border-r-0  border-chasBlue'>
      <ul>
        done
        {/* {[...bigB, ...smallA].map((layer, index) => (
          <Suspense key={index} fallback={<p>Loading layer...</p>}>
            <div>
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
        ))} */}
      </ul>
    </div>
  );
};

export default GroupedBookings;
