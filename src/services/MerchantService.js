import { Manager } from '@twilio/flex-ui';
import axios from 'axios';

class MerchantService {
  manager = Manager.getInstance();
  baseUrl = process.env.REACT_APP_GET_MERCHANT_CONTACT_ENDPOINT;

  findMerchantByPhoneNumber = async (phoneNumber) => {
    return await axios
      .post(this.baseUrl, {
        Token: this.manager.store.getState().flex.session.ssoTokenPayload.token,
        phoneNumber: `whatsapp:+55${phoneNumber}`,
      })
      .then((response) => {
        return response.data.list;
      });
  };
}

const merchantService = new MerchantService();

export default merchantService;
