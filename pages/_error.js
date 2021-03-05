import React from "react";
import Router from "next/router";

export default function _error() {
  React.useEffect(() => {
    try{
      Router.push("/admin/dashboard");
    }catch (e) {
      console.log(e)
    }
  });

  return <div />;
}
