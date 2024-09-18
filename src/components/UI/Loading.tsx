import { Spinner } from "@nextui-org/spinner";

const Loading = () => {
  return (
    <div className="min-h-screen bg-black/10 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
