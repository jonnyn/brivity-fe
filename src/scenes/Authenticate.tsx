import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { signIn, createUser } from "utils/api";
import { UserContext } from "contexts/UserContext";
import { Button } from "components";

const Authenticate = () => {
  const [state, dispatch] = useContext(UserContext);
  const [credentials, setCredentials] = useState<User>({});
  const [errors, setErrors] = useState<string>();

  // Mutations
  const signInMutation = useMutation(
    (credentials: { user: User }) => signIn(credentials),
    {
      onSuccess: (data) => {
        if (data.error) {
          setErrors(data.error);
        } else {
          dispatch({
            type: "SET_USER",
            payload: {
              ...data,
              email: credentials.email,
            },
          });
        }
      },
    }
  );

  const createUserMutation = useMutation(
    (info: { user: User }) => createUser(info),
    {
      onSuccess: (data) => {
        if (data.errors) {
          setErrors(JSON.stringify(data.errors));
        } else {
          dispatch({
            type: "SET_USER",
            payload: {
              ...data,
              email: credentials.email,
            },
          });
        }
      },
    }
  );

  const onInputChange = (name: string, value: string | number | boolean) => {
    setCredentials((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = () => {
    const params = { user: credentials };
    signInMutation.mutate(params);
  };

  const handleSignUp = () => {
    const params = { user: credentials };
    createUserMutation.mutate(params);
  };

  return (
    <div className="h-full">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="email"
            type="text"
            placeholder="Email"
            onChange={(x) => onInputChange("email", x.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(x) => onInputChange("password", x.target.value)}
          />
          <p className="text-red text-xs italic">Please enter a password.</p>
        </div>
        <div className="mb-6">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Display Name
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="display_name"
            type="text"
            placeholder="Display name"
            onChange={(x) => onInputChange("display_name", x.target.value)}
          />
        </div>
        <div
          style={{ display: errors ? "" : "none" }}
          className="py-4 text-red-600"
        >
          {errors}
        </div>
        <div className="flex items-center justify-between">
          <Button text="Sign In" onClick={handleSignIn} />
          <Button
            className="bg-orange-300 hover:bg-orange-600"
            text="Sign Up"
            onClick={handleSignUp}
          />
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
