import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { allData } from "../api/tasksApi";
import { useGlobalContext } from "../context"; 
import TableBody from "../components/TableBody";

function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);
  const { setTitle } = useGlobalContext();
  useEffect(() => {
    setTitle("Tasks"); 
    allData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <>
        <Link to={"/add"} className="btn btn-primary">
          Add
        </Link>
        <p className="h3 mt-5">Loading...</p>
      </>
    );
  } else {
    return (
      <>
        <Link to={"/add"} className="btn btn-primary">
          Add
        </Link>
        <div className="table-responsive">
          <table className="table table-striped mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <TableBody data={data} />
          </table>
        </div>
      </>
    );
  }
}

export default Home;
