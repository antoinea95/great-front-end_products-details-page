import { useEffect, useState } from "react";
import { sectionTitle } from "../../utils/tailwindClass";

export const NewsLetter = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<Record<
    string,
    string
  > | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    if (responseMessage) {
      const timeOut = setTimeout(() => setResponseMessage(null), 5000);
      return () => clearTimeout(timeOut);
    }
  }, [responseMessage]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!emailRegex.test(e.target.value) && e.target.value.length > 6) {
      setInputError("Please enter a valid email adress.");
    } else {
      setInputError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setInputError("Email adress is required.");
      return;
    }

    if (email && emailRegex.test(email)) {
      const response = await fetch(
        "https://www.greatfrontend.com/api/projects/challenges/newsletter",
        {
          method: "POST",
          body: JSON.stringify({ email: email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseMessage({ Success: `${data.message}` });
      } else {
        setResponseMessage({
          Error:
            "Failed to subscribe. Please ensure your email is correct or try again later.",
        });
      }
    } else {
      setResponseMessage({
        Error:
          "Failed to subscribe. Please ensure your email is correct or try again later.",
      });
    }
  };

  return (
    <section className="flex flex-col gap-4 justify-center mb-12 pt-24 relative lg:flex-row lg:items-center">
      {responseMessage && (
        <p
          className={`${
            responseMessage["Success"]
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          } flex items-center gap-2 px-4 py-2 rounded-full absolute top-4 left-1/2 -translate-x-1/2 w-fit`}
        >
          <span className="inline-flex bg-white rounded-full text-xs font-medium px-2 py-1 shadow-sm">
            {Object.keys(responseMessage)[0]}
          </span>
          <span className="text-xs font-medium sm:whitespace-nowrap">
            {responseMessage["Success"]
              ? responseMessage["Success"]
              : responseMessage["Error"]}
          </span>
        </p>
      )}
      <div className="space-y-4 lg:w-2/3">
        <h3 className={sectionTitle}>Join our newsletter</h3>
        <p className="text-neutral-600">
          We'll send you a nice letter once per week. No spam.
        </p>
      </div>
      <form
        className="flex flex-col sm:flex-row sm:items-start w-full gap-4 mt-8 sm:mt-0 lg:w-1/3 border"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 flex-1 relative">
          <input
            onChange={handleOnChange}
            type="text"
            id="email"
            name="email"
            className=" text-neutral-900 border-neutral-200 border py-2 bg-neutral-50 rounded-md px-4 placeholder:text-neutral-500 placeholder:text-sm"
            placeholder="Enter your email"
          />
          {inputError && (
            <small className="text-red-600 text-sm">{inputError}</small>
          )}
        </div>
        <button
          type="submit"
          className="bg-indigo-700 text-white py-2 px-4 rounded-md "
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};
