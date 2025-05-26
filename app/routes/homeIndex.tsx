

import type { Route } from "./+types/home";
import { redirect } from "react-router";
export async function loader({ params }: Route.LoaderArgs){
    
    return redirect('/userSelected')
}

import React from 'react'

export default function homeIndex() {
  return (
    <div>homeIndex</div>
  )
}
