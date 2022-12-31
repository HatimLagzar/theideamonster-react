import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from "../../pages/login";
import Index from "../../pages";
import Register from "../../pages/register";
import Delegator from "../../pages/delegator";
import Start from "../../pages/start";
import Subscribe from "../../pages/subscribe";
import SubscribeSuccess from "../../pages/subscription-success";
import Recover from "../../pages/recover";
import Meditation from "../../pages/meditation";
import Map from "../../pages/map";
import CalendarIndex from "../../pages/calendar";
import CalendarCreate from "../../pages/calendar/create";
import CalendarEdit from "../../pages/calendar/[id]";
import ResetPassword from "../../pages/reset-password/[token]";

export default function Router() {
  return (
    <Routes>
      <Route path='login' exact element={<Login />} />
      <Route path='register' exact element={<Register />} />
      <Route path='/' exact element={<Index />} />
      <Route path='delegator' exact element={<Delegator />} />
      <Route path='start' exact element={<Start />} />
      <Route path='subscribe' exact element={<Subscribe />} />
      <Route path='subscription-success' exact element={<SubscribeSuccess />} />
      <Route path='recover' exact element={<Recover />} />
      <Route path='reset-password/:token' exact element={<ResetPassword />} />
      <Route path='meditation' exact element={<Meditation />} />
      <Route path='map' exact element={<Map />} />
      <Route path='calendar' exact element={<CalendarIndex />} />
      <Route path='calendar/create' exact element={<CalendarCreate />} />
      <Route path='calendar/:id' exact element={<CalendarEdit />} />
    </Routes>
  );
}
