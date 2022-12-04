import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Outlet,} from "react-router-dom";
import SettingsForm from "../../components/PersonnalDataForm";
const IS_DEBUG = process.env.REACT_APP_IS_DEBUG == 'true';

function Settings() {
  return (
    <>
      <Helmet>
        <title>ACE-ft | Settings</title>
      </Helmet>
      <div className="flex my-16 mx-8">
        <div className="flex w-full rounded-2xl shadow-xl bg-white text-black px-4 py-4">
          <nav className="flex flex-col border-r border-gray-400 pr-8 pl-2 py-2">
            <Link
              className="text-black border-b border-gray-400 pb-2"
              activeclassname="is-active"
              to="personnal-data"
            >
              Personnal Data
            </Link>
            <Link
              className="text-black pt-2"
              activeclassname="is-active"
              to="params"
            >
              Settings
            </Link>
          </nav>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Settings;
