import { useRouter } from "../hooks/useRouter";

export const Root = () => {
  const { push } = useRouter();
  return (
    <>
      <h1>Main</h1>
      <button onClick={() => push("/about")}>about</button>
    </>
  );
};
