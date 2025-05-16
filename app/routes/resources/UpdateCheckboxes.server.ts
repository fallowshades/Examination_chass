
import type { LoaderFunctionArgs } from "react-router";

import { getheCheckBoxesForRoom } from "~/models/queries.server"
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get("roomId");
  if (!roomId) throw new Response("roomId is required", { status: 400 });

  // e.g. grab amenities or whatever for that room
  const data = await getheCheckBoxesForRoom(Number(roomId));
  return { amenities: data };
}
