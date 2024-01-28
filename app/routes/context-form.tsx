import { Link } from "@remix-run/react";
import { FormEvent, useContext, useState } from "react";
import { AppContext, useUserConext as useUserContext } from "~/lib/AppContext";

export type ContextUser = {
  givenName: string | null;
  familyName: string | null;
};

export default function DavidsForm() {
  let { user, setUser } = useUserContext();
  let handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    console.log("ev", ev);
    console.log("user", user);
  };
  return (
    <div className="p-4">
      <h1>Davids Form</h1>
      <form method="post" onSubmit={handleSubmit}>
        <Input
          name="givenName"
          label="Given Name"
          value={user.givenName || ""}
          onChange={(value: string) => setUser({ ...user, givenName: value })}
        />
        <Input
          name="familyName"
          label="Family Name"
          value={user.familyName || ""}
          onChange={(value: string) => setUser({ ...user, familyName: value })}
        />
        <button>Submit</button>
      </form>
      <Link to={"/game"}>game</Link>
    </div>
  );
}

let Input = (props: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  let { name, label, value, onChange } = props;
  return (
    <label htmlFor={name} className="flex flex-col gap-3 justify-start">
      <span>{label}</span>
      <input
        type="text"
        name={name}
        className="border-black rounded-md border w-32"
        value={value}
        onChange={(ev) => {
          onChange(ev.target.value);
        }}
      />
    </label>
  );
};
