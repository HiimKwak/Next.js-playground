import Animation from "./animation";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          안녕하세요
          <br className="hidden lg:inline-block" />
          오늘도 빡코딩!
        </h1>
        <p className="mb-8 leading-relaxed">
          사랑의 열락의 앞이 것이 인생에 힘차게 때에, 것이다. 이 있음으로써
          붙잡아 그들은 현저하게 곳으로 노년에게서 듣는다. 구하지 피가 하는
          현저하게 것이다. 품으며, 같지 이것이야말로 싹이 불어 때문이다.
          현저하게 그림자는 이것을 두손을 품으며, 황금시대의 듣는다.
          것이다.보라, 청춘 힘차게 위하여서, 동산에는 피어나는 심장의 두기
          무엇을 있다. 것이 얼마나 이상 피고 천지는 듣는다. 천지는 그것은 청춘
          청춘의 얼마나 말이다. 공자는 얼음에 우리는 물방아 대한 천고에 말이다.
          때에, 천하를 쓸쓸한 피가 있으랴?
        </p>
        <div className="flex justify-center">
          <Link href="/projects" className="btn-project">
            프로젝트 보러가기
          </Link>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <Animation />
      </div>
    </>
  );
};
export default Hero;
