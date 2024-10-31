import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serchValue, setSerchValue] = useState("");
  const [invites, setInvites] = useState([]);
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.log(err);
        alert("Error");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (e) => {
    setSerchValue(e.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSucces(true);
  };

  return (
    <div className="App">
      {succes ? (
        <Success count={invites.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={serchValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onChangeSearchValue={onChangeSearchValue}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
