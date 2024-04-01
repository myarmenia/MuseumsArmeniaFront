import MyAccount from '../../images/MyAccount.svg';
import Chat from '../../images/Chat.svg';
import OrderHistory from '../../images/OrderHistory.svg';
import QrCode from '../../images/QrCode.svg';
import Card from '../../images/Card.svg';
import Notificationn from '../../images/Notificationn.svg';

export const ProfileSidebarArrll = () => {
  // const { t } = useTranslation();

  return [
    {
      icon: MyAccount,
      name: 'My_Account',
      slug: 'myaccount',
    },
    {
      icon: Chat,
      name: 'Chat',
      slug: 'chat',
    },
    {
      icon: OrderHistory,
      name: 'Order_History',
      slug: 'orderhistory',
    },
    {
      icon: QrCode,
      name: 'Qr_code',
      slug: 'qrCode',
    },
    {
      icon: Card,
      name: 'Card',
      slug: 'card',
    },
    {
      icon: Notificationn,
      name: 'Notificationn',
      slug: 'notification',
    },
  ];
};
