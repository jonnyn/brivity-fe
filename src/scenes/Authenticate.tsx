import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { signInSignUp } from "utils/api";
import { UserContext } from "contexts";
import { Button } from "components";

const Authenticate = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useContext(UserContext);
  const [credentials, setCredentials] = useState<User>({});
  const [errors, setErrors] = useState<string>();

  // Mutations
  const signInSignUpMutation = useMutation(
    ({ newUser, userInfo }: { newUser: boolean; userInfo: User }) =>
      signInSignUp(newUser, userInfo),
    {
      onSuccess: (data) => {
        if (data.errors) {
          setErrors(JSON.stringify(data.errors));
        } else if (data.error) {
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

  const onInputChange = (name: string, value: string | number | boolean) => {
    setCredentials((prev: User) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-full">
      <div className="py-8 text-2xl font-bold text-sky-500">
        Welcome to Brivity!
      </div>
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
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
          <Button
            text="Sign In"
            onClick={() => {
              signInSignUpMutation.mutate({
                newUser: false,
                userInfo: credentials,
              });
            }}
          />
          <Button
            className="bg-orange-300 hover:bg-orange-600"
            text="Sign Up"
            onClick={() => {
              signInSignUpMutation.mutate({
                newUser: true,
                userInfo: credentials,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
