// app/group-buy/[id]/page.js
import GroupBuyDetailsScreen from '../../components/GroupBuyDetailsScreen';

const GroupBuyPage = ({ params }) => {
  const { id } = params;

  return <GroupBuyDetailsScreen id={id} />;
};

export default GroupBuyPage;
