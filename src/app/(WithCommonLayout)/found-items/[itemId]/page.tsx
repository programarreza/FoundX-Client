import Container from "@/src/components/UI/Container";
import Post from "@/src/components/UI/Post";
import { getPosts } from "@/src/services/Post";

interface IProps {
  params: {
    itemId: string;
  };
}

const ItemDetailsPage = async ({ params: { itemId } }: IProps) => {
  const { data: post } = await getPosts(itemId);

  return (
    <Container>
      <div className="mx-auto my-3 max-w-[720px]">
        <Post key={post?._id} post={post} />
      </div>
    </Container>
  );
};

export default ItemDetailsPage;
