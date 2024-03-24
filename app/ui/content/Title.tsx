type TitleProp = {
  title: string;
};

export default function Title({ title }: TitleProp) {
  return (
    <div className="">
      <h1 className="uppercase font-bold text-3xl text-gray-600 mx-auto w-fit">
        {title}
        <span className="block mx-auto w-1/2 border mt-4 mb-5 border-gray-600" />
      </h1>
    </div>
  );
}
