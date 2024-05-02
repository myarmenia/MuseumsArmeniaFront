import MyAccount from '../../images/MyAccount.svg';
import Chat from '../../images/Chat.svg';
import OrderHistory from '../../images/OrderHistory.svg';
import QrCode from '../../images/QrCode.svg';
import Card from '../../images/Card.svg';
import Notificationn from '../../images/Notificationn.svg';
import { chatIcon, myAccountIcon, notficationIcon, orderHistoryIcon, qrCodeIcon } from '../../iconFolder/icon';
import { useTranslation } from 'react-i18next';

export const ProfileSidebarArrll = () => {
  const { t } = useTranslation();

  return [
    {
      icon: myAccountIcon,
      name: t('profil_side_bar.0'),
      slug: 'myaccount',
    },
    {
      icon: chatIcon,
      name: t('profil_side_bar.1'),
      slug: 'chat',
    },
    {
      icon: orderHistoryIcon,
      name: t('profil_side_bar.2'),
      slug: 'orderhistory',
    },
    {
      icon: qrCodeIcon,
      name: t('profil_side_bar.3'),
      slug: 'qrcode',
    },
    // {
    //   icon: Card,
    //   name: 'Card',
    //   slug: 'card',
    // },
    {
      icon: notficationIcon,
      name: t('profil_side_bar.4'),
      slug: 'notification',
    },
  ];
};



export const downloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
  
      if (!response.ok) {
        throw new Error('Failed to download image');
      }

      const imageBlob = await response.blob();
  
      const imageURL = URL.createObjectURL(imageBlob);
  
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'image.jpg';
  
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };