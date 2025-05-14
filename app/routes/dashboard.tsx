import React from 'react'
import type { Route } from "./+types/dashboard";
import { Outlet } from 'react-router';
export default function  dashboard({
  loaderData,
}: Route.ComponentProps) {
  return (
    <div><Outlet/></div>
  )
}
