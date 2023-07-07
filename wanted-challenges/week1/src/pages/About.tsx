import { useRouter } from "../hooks/useRouter";

export const About = () => {
  const { push } = useRouter();
  return (
    <>
      <h1>About</h1>
      <button onClick={() => push("/")}>go main</button>
    </>
  );
};
